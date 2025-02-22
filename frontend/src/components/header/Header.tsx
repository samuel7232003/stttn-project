import search_icon from "../../images/Vector.png"
import "./header.css"

export default function Header() {
    return (
        <header className="header-main">
            <figure className="logo"></figure>
            <nav>
                <ul>
                    <li><a href="/">TRANG CHỦ</a></li>
                    <li><a href="/">CAMERA TỪ VỰNG</a></li>
                    <li><a href="/">CHATBOT</a></li>
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