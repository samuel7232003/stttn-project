import { useEffect, useRef, useState } from 'react';
import './camera.css'

export default function Camera(){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wsRef = useRef<WebSocket | null>(null);
    const [processedImage, setProcessedImage] = useState<string | null>(null);

    useEffect(() => {
        // Tạo WebSocket kết nối với server Python
        wsRef.current = new WebSocket("ws://localhost:8000/ws");

        wsRef.current.onopen = () => console.log("✅ WebSocket đã kết nối!");
        wsRef.current.onmessage = (event) => {
            setProcessedImage(`data:image/jpeg;base64,${event.data}`);
        };
        wsRef.current.onerror = (error) => console.error("❌ WebSocket lỗi:", error);
        wsRef.current.onclose = () => console.log("❌ WebSocket đóng!");

        return () => wsRef.current?.close();
    }, []);

    const sendFrameToServer = async (video: HTMLVideoElement) => {
        if (!canvasRef.current || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;
    
        // 🔽 Giảm kích thước ảnh xuống 320x240
        ctx.drawImage(video, 0, 0, 320, 240);
        
        canvasRef.current.toBlob((blob) => {
            if (blob) {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    const base64data = reader.result?.toString().split(",")[1];
                    if (base64data) {
                        wsRef.current?.send(base64data);
                    }
                };
            }
        }, "image/jpeg", 0.7);  // 🔽 Giảm chất lượng JPEG xuống 70% để giảm kích thước file
    };
    

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                const video = document.createElement("video");
                video.srcObject = stream;
                video.play();

                setInterval(() => sendFrameToServer(video), 100);
            } catch (error) {
                console.error("❌ Lỗi mở camera:", error);
            }
        };

        startCamera();
    }, []);
    
    return(
        <div className="camera-main">
            <div className='video'>
                {processedImage && <img src={processedImage} alt="Processed Video" />}
                <canvas ref={canvasRef} style={{ display: "none" }} />
            </div>
            <div className='voca'></div>
        </div>
    )
}