import { useEffect, useRef, useState } from 'react';
import './camera.css';
import cam_icon from "./images/camera-02.png";
import detec_icon from "./images/image-focus.png";
import { Tooltip } from 'antd';
import { useOutletContext } from 'react-router-dom';

export default function Camera() {
    const {setCurPage}:any = useOutletContext();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const wsRef = useRef<WebSocket | null>(null);
    
    const [processedImage, setProcessedImage] = useState<string | null>(null);
    const [detections, setDetections] = useState<any[]>([]);
    const [mode, setMode] = useState<boolean>(true);
    const streamRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        setCurPage("camera");
        wsRef.current = new WebSocket("ws://localhost:8000/ws");

        wsRef.current.onopen = () => console.log("✅ WebSocket đã kết nối!");
        wsRef.current.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.image) {
                    const newImage = `data:image/jpeg;base64,${data.image}`;
                    setProcessedImage(newImage); // Cập nhật ảnh ngay khi có dữ liệu mới
                }
                if (data.detections) {
                    setDetections(data.detections);
                }
            } catch (error) {
                console.error("❌ Lỗi xử lý dữ liệu từ server:", error);
            }
        };
        wsRef.current.onerror = (error) => console.error("❌ WebSocket lỗi:", error);
        wsRef.current.onclose = () => console.log("❌ WebSocket đóng!");

        return () => {
            wsRef.current?.close();
        };
    }, []);

    const sendFrameToServer = async () => {
        if (!canvasRef.current || !videoRef.current || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(videoRef.current, 0, 0, 320, 240);
        
        canvasRef.current.toBlob((blob) => {
            if (blob) {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    const result = reader.result as string;
                    if (result) {
                        const base64data = result.split(",")[1] || "";
                        if (base64data) {
                            wsRef.current?.send(base64data);
                        }
                    }
                };
            }
        }, "image/jpeg", 0.7);
    };

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current?.play().catch(error => console.error("❌ Lỗi play video:", error));
                };
            }
            sendFrameToServer();
        } catch (error) {
            console.error("❌ Lỗi mở camera:", error);
        }
    };

    useEffect(() => {
        startCamera();
    }, []);

    function toggleMode() {
        setMode(prevMode => {
            const newMode = !prevMode;

            if (newMode) {
                // Khi chuyển về chế độ camera, mở lại camera nếu cần
                if (!streamRef.current) {
                    startCamera();
                } else if (videoRef.current) {
                    videoRef.current.srcObject = streamRef.current;
                }
            } else {
                // Khi chuyển sang chế độ detection, dừng stream để tối ưu tài nguyên
                if (streamRef.current) {
                    streamRef.current.getTracks().forEach(track => track.stop());
                    streamRef.current = null;
                }
            }

            return newMode;
        });
    }

    useEffect(() => {
        console.log(detections);
    }, [detections]);

    return (
        <div className="camera-main">
            <div className='video'>
                {mode ? <video ref={videoRef} autoPlay playsInline muted /> : processedImage ? <img src={processedImage} alt="Processed Video" key={processedImage} /> : <p>Loading...</p>}
                <canvas ref={canvasRef} style={{ display: "none" }} />
                <Tooltip placement="topLeft" title={mode ? "Chuyển sang chế độ Detection" : "Chuyển sang chế độ thường"}>
                    <div className='mode' onClick={toggleMode}>
                        <figure className='cam-mode' style={mode ? { backgroundColor: "white" } : {}}><img src={cam_icon} alt="" /></figure>
                        <figure className='detec-mode' style={!mode ? { backgroundColor: "white" } : {}}><img src={detec_icon} alt="" /></figure>
                    </div>
                </Tooltip>
            </div>
            <div className='voca'>
                <ul>
                    {detections.map((item) => <li className='item'>
                        <p className='word'>{item.label}</p>
                    </li>)}
                </ul>
            </div>
        </div>
    );
}
