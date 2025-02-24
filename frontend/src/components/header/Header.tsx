import search_icon from "../../images/Vector.png"
import logo from "../../images/LOGO (2).png"
import "./header.css"

interface Props{
    curPage :string;
}

export default function Header({curPage} :Props) {

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
                    <li className={curPage==="flashcard"?"select":""}><a href="/">FLASHCARD</a></li>
                    <li className={curPage==="readbook"?"select":""}><a href="/">ĐỌC SÁCH</a></li>
                </ul>
            </nav>
            <div className="right">
                <div className="search">
                    <fieldset><input type="text" placeholder="Tra cứu nhanh"/></fieldset>
                    <figure><img src={search_icon} alt="" /></figure>
                </div>
                <p>Đăng nhập</p>
            </div>
        </header>
    )
}