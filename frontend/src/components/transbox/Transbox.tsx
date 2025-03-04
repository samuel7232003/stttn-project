import "./transbox.css";
import back_icon from "./images/chevron-right.png";
import { useAppDispatch, useAppSelector } from "../../redux/builder";
import { Input } from "antd";
import { useState } from "react";
import send_icon from "./images/Icon (2).png"
import { addTrans } from "../../redux/trans/trans.action";

export default function Transbox() {
    const listTrans = useAppSelector(state => state.trans.listTrans);
    const dispatch = useAppDispatch();

    const [content, setContent] = useState("");

    function addNewTrans() {
        const fetchData = async () =>{
            await dispatch(addTrans(content.trim()));
            setContent("");
        }
        if(content.trim() !== "") fetchData();
    }

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
            <div className="footer">
                <Input placeholder="Nhập từ bạn muốn dịch nhanh..." value={content} onChange={(e)=> setContent(e.target.value)} onPressEnter={addNewTrans}/>
                <figure><img src={send_icon} alt="" onClick={addNewTrans}/></figure>
            </div>
        </div>
    );
}
