import add_icon from "./images/plus-01.png"
import back_icon from "./images/Icon (1).png"
import next_icon from "./images/Icon.png"
import check_icon from "./images/check-contained.png"
import setting_icon from "./images/Group 20.png"
import "./flashcard.css"
import { useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAppSelector } from "../../redux/builder"
import { createNewFlashcard, getListFlashCard } from "../../service/flashcardService"

export default function Flashcard(){
    const {setCurPage}:any = useOutletContext();
    const user = useAppSelector(state => state.user.user);
    const [listCardCur, setListCardCur] = useState([]); 
    const [listMyFlashcard, setListMyFlashcard] = useState([]);
    const [newName, setNewName] = useState("");

    useEffect(() => {
        setCurPage("flashcard");
    },[])

    useEffect(() => {
        async function fetchDataMyFlashcard() {
            const listFlashcard = await getListFlashCard(user._id);
            setListMyFlashcard(listFlashcard);
        }
        try {
            if(user._id!=="") fetchDataMyFlashcard();
        } catch (error) {
            console.log(error);
        }
    },[user])

    function addFlashcard(){
        async function addFlash() {
            const res = await createNewFlashcard(newName.trim(), user._id);
        }
        if(newName.trim()!==""){
            try {
                addFlash();
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        }
    }
    

    return(
        <div className="flashcard-main">
            <div className="sub" style={user._id===""?{flexDirection:"column-reverse"}:{}}>
                <div className="your">
                    <p className="title">Các bộ flashcard của bạn:</p>
                    {user._id!==""?<ul>
                        {listMyFlashcard.map((item:any) => <li key={item._id}>
                            <p className="name">{item.name}</p>
                            <p className="num">{item.done}/{item.sum}</p>
                        </li>)}
                        <li className="last">
                            <figure><img src={add_icon} alt="" /></figure>
                            <p className="add">Thêm bộ flashcard</p>
                            <div className="edit">
                                <fieldset><input type="text" placeholder="Nhập tên flashcard" value={newName} onChange={(e)=>setNewName(e.target.value)}/></fieldset>
                                <p onClick={addFlashcard}>Tạo</p>
                            </div>
                        </li>
                    </ul>:<p className="note">Đăng nhập thể tạo bộ flashcard của riêng mình.</p>}
                </div>
                {(listCardCur.length>0)&&<div className="main">
                    <p className="title">Động vật</p>
                    <div className="learn">
                        <figure className="back"><img src={back_icon} alt="" /></figure>
                        <div className="card">
                            <p className="hand">Mặt trước</p>
                            <p className="num">2/10</p>
                            <p className="content">Fish</p>
                            <p className="takenote">Từ khó</p>
                            <div className="btn">
                                <figure><img src={check_icon} alt="" /></figure>
                                <p>Đánh dấu là đã thuộc</p>
                            </div>
                        </div>
                        <figure className="next"><img src={next_icon} alt="" /></figure>
                    </div>
                    <figure className="setting"><img src={setting_icon} alt="" /></figure>
                </div>}
                <div className="orther">
                    <p className="title">Các bộ flashcard tham khảo:</p>
                    <ul>
                        <li>
                            <p className="name">Động vật</p>
                            <p className="num">Số từ: 10</p>
                            <p className="see">Xem ngay!</p>
                        </li>
                        <li>
                            <p className="name">Động vật</p>
                            <p className="num">Số từ: 10</p>
                            <p className="see">Xem ngay!</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}