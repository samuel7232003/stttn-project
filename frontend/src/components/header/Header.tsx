import search_icon from "../../images/Vector.png"
import logo from "../../images/LOGO (2).png"
import "./header.css"
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/builder";
import { getProfile, logout } from "../../redux/user/user.action";
import { useEffect } from "react";

interface Props{
    curPage :string;
}

export default function Header({curPage} :Props) {
    const navigate = useNavigate();
    const user = useAppSelector(state => state.user.user);
    const dispatch = useAppDispatch();

    useEffect(()=>{
        const token = localStorage.getItem("access_token");
        const fectchData = async () => {
            await dispatch(getProfile());
        }
        if(token) fectchData()
    }, [])

    function handleLogout(){
        localStorage.clear();
        setTimeout(() => dispatch(logout()), 1000);
    }

    return (
        <header className="header-main">
            <a href="/"><figure className="logo">
                <img src={logo} alt="" />
            </figure>
            </a>
            <nav>
                <ul>
                    <li className={curPage==="welcome"?"select":""}><a href="/">TRANG CHỦ</a></li>
                    <li className={curPage==="camera"?"select":""}><a href="/camera">CAMERA TỪ VỰNG</a><p>AI</p></li>
                    <li className={curPage==="chatbot"?"select":""}><a href="/chatbot">CHATBOT</a><p>AI</p></li>
                    <li className={curPage==="flashcard"?"select":""}><a href="/flashcard">FLASHCARD</a></li>
                    <li className={curPage==="readbook"?"select":""}><a href="/">ĐỌC SÁCH</a></li>
                </ul>
            </nav>
            <div className="right">
                <div className="search">
                    <fieldset><input type="text" placeholder="Tra cứu nhanh"/></fieldset>
                    <figure><img src={search_icon} alt="" /></figure>
                </div>
                {(curPage!=="login"&&user._id==="")&&<p className="name" onClick={()=>navigate("/login")}>Đăng nhập</p>}
                {user._id!=="" && <><p className="name">{user.last_name}</p> <p onClick={handleLogout} className="logout">Đăng xuất</p></>}
            </div>
        </header>
    )
}