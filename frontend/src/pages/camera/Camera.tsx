import { useEffect, useRef, useState } from 'react';
import './camera.css';
import cam_icon from "./images/camera-02.png";
import detec_icon from "./images/image-focus.png";
import { Tooltip } from 'antd';
import { useOutletContext } from 'react-router-dom';
import word from "../../data/word.json"

export default function Camera() {
    const {setCurPage}:any = useOutletContext();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const wsRef = useRef<WebSocket | null>(null);
    
    const [processedImage, setProcessedImage] = useState<string | null>(null);
    const [detections, setDetections] = useState<any[]>([]);
    const [mode, setMode] = useState<boolean>(true);
    const streamRef = useRef<MediaStream | null>(null);

    function findWord(s: string){
        const w:any = word.words.find((item)=> item.word===s);
        if(w){
            return w;
        }
    }

    useEffect(() => {
        setCurPage("camera");
        wsRef.current = new WebSocket(`wss://103.121.91.217:10000/ws`);

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
        // eslint-disable-next-line
    }, []);

    const sendFrameToServer = async () => {
        if (!canvasRef.current || !videoRef.current || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        // Lấy kích thước thực tế của video
        const videoWidth = videoRef.current.videoWidth;
        const videoHeight = videoRef.current.videoHeight;

        // Cập nhật kích thước canvas để khớp với video
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        // Vẽ ảnh mà không làm mất góc
        ctx.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);
        
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
        }, "image/jpeg", 0.9);
    };

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current?.play().catch(error => console.error("❌ Lỗi play video:", error));
                };
            }
            const interval = setInterval(() => {
                sendFrameToServer();
            }, 800); // Gửi ảnh mỗi 500ms
        
            return () => clearInterval(interval);
        } catch (error) {
            console.error("❌ Lỗi mở camera:", error);
        }
    };

    useEffect(() => {
        startCamera();
        // eslint-disable-next-line
    }, []);

    function toggleMode() {
        setMode(prevMode => {
            const newMode = !prevMode;
            return newMode;
        });
    }

    return (
        <div className="camera-main">
            <div className='video'>
                <video ref={videoRef} autoPlay playsInline muted style={{height: !mode? "0":"100%"}}/>
                {processedImage ? <img src={processedImage} alt="Processed Video" key={processedImage} /> : <p>Loading...</p>}
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
                    {detections.map((item, index) => <li key={index} className='item'>
                        <p className='word'>{item.label}</p>
                        <p className='sym'>{findWord(item.label).sym}</p>
                        <p className='mean'>{findWord(item.label).means}</p>
                    </li>)}
                </ul>
            </div>
        </div>
    );
}
