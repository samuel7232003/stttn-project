import { useEffect, useRef, useState } from 'react';
import './camera.css';
import cam_icon from "./images/camera-02.png";
import detec_icon from "./images/image-focus.png";
import { Tooltip } from 'antd';
import { useOutletContext } from 'react-router-dom';
import word from "../../data/word.json"
import save_icon from "./images/Icon (3).png"
import saved_icon from "./images/Icon (4).png"
import list_icon from "./images/file-02.png"
import { useAppDispatch, useAppSelector } from '../../redux/builder';
import exit_icon from "./images/x-01.png"
import { Word } from '../../redux/word/word.state';
import { addWord, deleteWord, setListWord } from '../../redux/word/word.action';
import delete_icon from './images/trash-01 (1).png'
import { stringify } from 'querystring';

export default function Camera() {
    const {setCurPage}:any = useOutletContext();
    const listWord = useAppSelector(state => state.word.listWord);
    const dispatch = useAppDispatch();

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const wsRef = useRef<WebSocket | null>(null);
    
    const [processedImage, setProcessedImage] = useState<string | null>(null);
    const [detections, setDetections] = useState<any[]>([]);
    const [mode, setMode] = useState<boolean>(true);
    const streamRef = useRef<MediaStream | null>(null);
    const [isShowList, setIsShowList] = useState(false);
    

    function findWord(s: string){
        const w:any = word.words.find((item)=> item.word===s);
        if(w){
            return w;
        }
    }

    useEffect(() => {
        setCurPage("camera");
        wsRef.current = new WebSocket(`wss://${process.env.REACT_APP_BASE_PYTHON}/ws`);

        wsRef.current.onopen = () => console.log("✅ WebSocket đã kết nối!!!!!!!");
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

        startCamera();

        const strHis = localStorage.getItem("listWord");
        if(strHis) dispatch(setListWord(JSON.parse(strHis))); 

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

    function toggleMode() {
        setMode(prevMode => {
            const newMode = !prevMode;
            return newMode;
        });
    }

    const listDetec = (detections:any[]) :any => {
        const map = new Map();
        detections.forEach(obj => {
            const w = findWord(obj.label);
            if (!map.has(w.id)) {
                map.set(w.id, w);
            }
        });
        return Array.from(map.values());
    }

    function handleAddWord(word:string){
        const newWord = findWord(word);
        const addNewWord: Word = {_id: newWord.id, word: newWord.word, mean: newWord.means, sym: newWord.sym};
        dispatch(addWord(addNewWord));
        const newList:Word[] = [...listWord, newWord];
        localStorage.setItem("listWord", JSON.stringify(newList));
    }

    function handleDeleteWord(id: string){
        dispatch(deleteWord(id));
        const newList:Word[] = listWord.filter(item => item._id!==id);
        localStorage.setItem("listWord", JSON.stringify(newList));
    }

    const checkSavelist = (word:string)=>{
        const check = listWord.find(item => item.word === word);
        if(check) return false;
        else return true;
    }

    return (
        <div className="camera-main">
            <div className='video'>
                <div className='video-main'>
                    <video ref={videoRef} autoPlay playsInline muted style={{height: !mode? "0":"100%"}}/>
                    {processedImage ? <img src={processedImage} alt="Processed Video" key={processedImage} /> : <p>Loading...</p>}
                    <canvas ref={canvasRef} style={{ display: "none" }} />
                    <Tooltip placement="topLeft" title={mode ? "Chuyển sang chế độ Detection" : "Chuyển sang chế độ thường"}>
                        <div className={'mode'+isShowList?" hide":""} onClick={toggleMode}>
                            <figure className='cam-mode' style={mode ? { backgroundColor: "white" } : {}}><img src={cam_icon} alt="" /></figure>
                            <figure className='detec-mode' style={!mode ? { backgroundColor: "white" } : {}}><img src={detec_icon} alt="" /></figure>
                        </div>
                    </Tooltip>
                </div>
                {isShowList&&<div className='list-word'>
                    <div className='title'>
                        <figure><img src={list_icon} alt="" /></figure>
                        <p>Danh sách từ đã lưu:</p>
                    </div>
                    <ul className='list'>
                        {listWord.map((item:Word, index:number) => <li key={index} className='item'>
                            <figure onClick={() => handleDeleteWord(item._id)}><img src={delete_icon} alt="" /></figure>
                            <p className='word'>{item.word}</p>
                            <p className='sym'>{item.sym}</p>
                            <p className='mean'>{item.mean}</p>
                        </li>)}
                    </ul>
                    <figure className='exit' onClick={() => setIsShowList(false)}><img src={exit_icon} alt=""/></figure>
                </div>}
            </div>
            <div className='voca'>
                <ul>
                    {listDetec(detections).map((item:any, index:number) => <li key={index} className='item'>
                        {checkSavelist(item.word)?<figure onClick={() => handleAddWord(item.word)}><img src={save_icon} alt="" /></figure>
                        :<figure><img src={saved_icon} alt=""/></figure>}
                        <p className='word'>{item.word}</p>
                        <p className='sym'>{item.sym}</p>
                        <p className='mean'>{item.means}</p>
                    </li>)}
                </ul>
                {!isShowList&&<Tooltip title="Xem danh sách từ đã lưu">
                    <figure onClick={() => setIsShowList(true)} className='show-list'><img src={list_icon} alt="" />{listWord.length>0&&<p>{listWord.length}</p>}</figure>
                </Tooltip>}
            </div>
        </div>
    );
}
