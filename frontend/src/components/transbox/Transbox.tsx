import "./transbox.css";
import back_icon from "./images/chevron-right.png";
import { useAppSelector } from "../../redux/builder";

export default function Transbox() {
    const listTrans = useAppSelector(state => state.trans.listTrans);


    return (
        <div className="transbox-main">
            <div className="title">
                <p>Thẻ dịch</p>
                <figure><img src={back_icon} alt="" /></figure>
            </div>
            <div className="trans-list">
                <ul>
                    {listTrans.map((item, index) => (
                        <li key={index}>
                            <p>{item.content}</p>
                            <p>{item.trans}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="footer"></div>
        </div>
    );
}
