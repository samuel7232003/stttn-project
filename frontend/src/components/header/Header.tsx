import search_icon from "../../images/Vector.png"
import logo from "../../images/LOGO (2).png"
import "./header.css"
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/builder";
import { getProfile, logout } from "../../redux/user/user.action";
import { useEffect, useState } from "react";
import { message } from "antd";
import Searchbox from "../searchbox/Searchbox";
import { explainServer, transMessageServer } from "../../service/messageService";

interface Props{
    curPage :string;
}

interface Search{
    en: string;
    vi: string;
    explain: string;
}

export default function Header({curPage} :Props) {
    const navigate = useNavigate();
    const user = useAppSelector(state => state.user.user);
    const dispatch = useAppDispatch();

    const [isSearchbox, setIsSearchbox] = useState(false);
    const [contentSearch, setContentSearch] = useState("");
    const [search, setSearch] = useState<Search>({en: "", vi: "", explain:""});

    useEffect(()=>{
        const token = localStorage.getItem("access_token");
        const fectchData = async () => {
            await dispatch(getProfile());
        }
        if(token) fectchData()
        // eslint-disable-next-line
    }, [])

    function handleLogout(){
        localStorage.clear();
        setTimeout(() => dispatch(logout()), 1000);
    }

    function quickSearch(){
        const fetchAPI = async(content:string)=>{
            const en:string = await transMessageServer(content, "en");
            const vi:string = await transMessageServer(en, "vi");
            const explain:string = await explainServer(content);
            setSearch({en:en, vi:vi, explain:explain});
            setIsSearchbox(true);
            setContentSearch("");
        }
        if(contentSearch.trim() !== "") fetchAPI(contentSearch.trim());
    }

    function handleEnter(e:React.KeyboardEvent<HTMLInputElement>){
        if(e.key === "Enter"){
            quickSearch();
        }
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
                    <li className={curPage==="camera"?"select":""}><a href="./camera">CAMERA TỪ VỰNG</a><p>AI</p></li>
                    <li className={curPage==="chatbot"?"select":""}><a href="./chatbot">CHATBOT</a><p>AI</p></li>
                    <li className={curPage==="flashcard"?"select":""}><a href="./flashcard">FLASHCARD</a></li>
                    {/* eslint-disable-next-line */}
                    <li className={curPage==="readbook"?"select":""}><a onClick={() => message.info("Tính năng đang trong quá trình phát triển...")}>ĐỌC SÁCH</a></li>
                </ul>
            </nav>
            <div className="right">
                <div className="search">
                    <fieldset><input 
                        type="text" 
                        placeholder="Tra cứu nhanh" 
                        value={contentSearch} 
                        onChange={(e) => setContentSearch(e.target.value)}
                        onKeyDown={(e) => handleEnter(e)}
                    /></fieldset>
                    <figure onClick={quickSearch}><img src={search_icon} alt="" /></figure>
                </div>
                {(curPage!=="login"&&user._id==="")&&<p className="name" onClick={()=>navigate("/login")}>Đăng nhập</p>}
                {user._id!=="" && <><p className="name">{user.last_name}</p> <p onClick={handleLogout} className="logout">Đăng xuất</p></>}
            </div>

            {isSearchbox&&<Searchbox search={search} setIsSearchbox={setIsSearchbox}/>}
        </header>
    )
}