import "./welcome.css"
import hello_img from "./images/STTTN (1).png"
import left_img from "./images/image 1.png"
import middle_img from "./images/image 2.png"
import right1_img from "./images/image 3.png"
import right2_img from "./images/image 4.png"
import left_icon from "./images/STTTN (2).png"
import middle_icon from "./images/STTTN (3).png"
import right1_icon from "./images/STTTN (4).png"
import right2_icon from "./images/STTTN (5).png"
import { useNavigate, useOutletContext } from "react-router-dom"
import { useEffect } from "react"
import idiom from "../../data/idiom.json"


export default function Welcome(){
    const {setCurPage}:any = useOutletContext();
    const navigate = useNavigate();

    const getRandomIdiom = () =>{
        const i:number = Math.floor(Math.random() * 50) + 1;
        const idi:any = idiom.idioms.find(item => item.id === i);
        return '"'+ idi.content +'" - '+idi.means;
    } 

    useEffect(() => {
        setCurPage("welcome");
        // eslint-disable-next-line
    },[])
    
    return (
        <div className="welcome-main">
            <div className="hello-block">
                <figure className="back"></figure>
                <div className="idiom">
                    <p className="title">Idiom of the day</p>
                    <p className="content">{getRandomIdiom()}</p>
                </div>
                <div className="hello">
                    <figure className="image">
                        <img src={hello_img} alt="" />
                    </figure>
                    <div className="text">
                        <p>Xin chào!</p>
                        <p>Chào mừng bạn đến với ENGGRAM, <br/>Tiếng Anh dễ dàng hơn với sức mạnh AI!</p>
                    </div>
                </div>
            </div>
            <div className="bottom-block">
                <div className="left-block" onClick={() => navigate("/camera")}>
                    <figure className="back"></figure>
                    <figure className="image"><img src={left_img} alt="" /></figure>
                    <div className="title">
                        <figure><img src={left_icon} alt="" /></figure>
                        <p className="lap">Học Tiếng Anh bất kì nơi đâu với Camera từ vựng</p>
                        <p className="mobile">Camera Từ vựng</p>
                    </div>
                    <p className="try">Dùng ngay!</p>
                </div>
                <div className="middle-block" onClick={() => navigate("/chatbot")}>
                    <figure className="back"></figure>
                    <div className="title">
                        <figure><img src={middle_icon} alt="" /></figure>
                        <p className="lap">Trò chuyện bằng Tiếng Anh mỗi ngày với Enggram Chatbot</p>
                        <p className="mobile">Chatbot Enggram</p>
                    </div>
                    <figure className="image"><img src={middle_img} alt="" /></figure>
                    <p className="try">Dùng ngay!</p>
                </div>
                <div className="right-block">
                    <div className="right1-block" onClick={() => navigate("/flashcard")}>
                        <figure className="back"></figure>
                        <figure className="image"><img src={right1_img} alt="" /></figure>
                        <div className="title">
                            <figure><img src={right1_icon} alt="" /></figure>
                            <p className="lap">Tạo Flashcard theo cách của riêng bạn</p>
                            <p className="mobile">Flashcard</p>
                        </div>
                        <p className="try">Dùng ngay!</p>
                    </div>
                    <div className="right2-block">
                        <figure className="back"></figure>
                        <figure className="image"><img src={right2_img} alt="" /></figure>
                        <div className="title">
                            <figure><img src={right2_icon} alt="" /></figure>
                            <p className="lap">Đọc sách Tiếng Anh mỗi ngày với Enggram</p>
                            <p className="mobile">Đọc sách</p>
                        </div>
                        <p className="try">Dùng ngay!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}