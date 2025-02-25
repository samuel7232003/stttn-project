import "./welcome.css"
import hello_back from "./images/Rectangle 6.png"
import hello_img from "./images/STTTN (1).png"
import left_back from "./images/Rectangle 9.png"
import middle_back from "./images/Rectangle 8.png"
import right1_back from "./images/Rectangle 9 (1).png"
import right2_back from "./images/Rectangle 10.png"
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
    },[])
    
    return (
        <div className="welcome-main">
            <div className="hello-block">
                <figure className="back"><img src={hello_back} alt="" /></figure>
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
                    <figure className="back"><img src={left_back} alt="" /></figure>
                    <figure className="image"><img src={left_img} alt="" /></figure>
                    <div className="title">
                        <figure><img src={left_icon} alt="" /></figure>
                        <p>Học Tiếng Anh bất kì nơi đâu với Camera từ vựng</p>
                    </div>
                    <p className="try">Dùng ngay!</p>
                </div>
                <div className="middle-block" onClick={() => navigate("/chatbot")}>
                    <figure className="back"><img src={middle_back} alt="" /></figure>
                    <div className="title">
                        <figure><img src={middle_icon} alt="" /></figure>
                        <p>Trò chuyện bằng Tiếng Anh mỗi ngày với Enggram Chatbot</p>
                    </div>
                    <figure className="image"><img src={middle_img} alt="" /></figure>
                    <p className="try">Dùng ngay!</p>
                </div>
                <div className="right-block">
                    <div className="right1-block" onClick={() => navigate("/flashcard")}>
                        <figure className="back"><img src={right1_back} alt="" /></figure>
                        <figure className="image"><img src={right1_img} alt="" /></figure>
                        <div className="title">
                            <figure><img src={right1_icon} alt="" /></figure>
                            <p>Tạo Flashcard theo cách của riêng bạn</p>
                        </div>
                        <p className="try">Dùng ngay!</p>
                    </div>
                    <div className="right2-block">
                        <figure className="back"><img src={right2_back} alt="" /></figure>
                        <figure className="image"><img src={right2_img} alt="" /></figure>
                        <div className="title">
                            <figure><img src={right2_icon} alt="" /></figure>
                            <p>Đọc sách Tiếng Anh mỗi ngày với Enggram</p>
                        </div>
                        <p className="try">Dùng ngay!</p>
                    </div>
                </div>
            </div>
        </div>
    )
}