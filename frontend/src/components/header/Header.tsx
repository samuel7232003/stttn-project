import search_icon from "../../images/Vector.png"
import logo from "../../images/LOGO (2).png"
import "./header.css"

export default function Header() {
    return (
        <header className="header-main">
            <a href="/"><figure className="logo">
                <img src={logo} alt="" />
            </figure>
            </a>
            <nav>
                <ul>
                    <li className="select"><a href="/">TRANG CHỦ</a></li>
                    <li><a href="/camera">CAMERA TỪ VỰNG</a><p>AI</p></li>
                    <li><a href="/">CHATBOT</a><p>AI</p></li>
                    <li><a href="/">FLASHCARD</a></li>
                    <li><a href="/">ĐỌC SÁCH</a></li>
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