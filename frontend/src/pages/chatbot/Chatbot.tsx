import { JSX, useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import "./chatbot.css"
import chat_icon from "./images/message-chat-01.png"
import send1_icon from "./images/send-01.png"
import { useAppDispatch, useAppSelector } from "../../redux/builder";
import { sendMessage } from "../../redux/message/message.action";
import React from "react";
import Transbox from "../../components/transbox/Transbox";
import { addTrans } from "../../redux/trans/trans.action";
import { message } from "antd";

type FormattedElement = JSX.Element | null;

export default function Chatbot(){
    const {setCurPage}:any = useOutletContext();
    const [mode, setMode] = useState(true);
    const [yourChat, setYourChat] = useState("");

    const listMessage = useAppSelector(stage => stage.message.listMessage);
    const dispatch = useAppDispatch();

    useEffect(() =>{
        setCurPage("chatbot");
        document.getElementById("chat")?.focus();
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        if(listMessage.length %2 === 1) setMode(false);
        else setMode(true);
    }, [listMessage])

    function send(){
        if(mode){
            dispatch(sendMessage(yourChat.trim()));
            setYourChat("");
            document.getElementById("chat")?.focus();
            trans();
        }
        else message.info("Hãy đợi hệ thống phản hồi xong!");
    }

    function trans(){
        dispatch(addTrans(yourChat.trim()));
    }

    function handleEnter(e:React.KeyboardEvent<HTMLInputElement>){
        if(e.key === "Enter"){
            send();
        }
    }
    
    const formatText = (text: string): FormattedElement[] => {
      const lines: string[] = text.split("\n");
      let formattedElements: FormattedElement[] = [];
      let currentList: JSX.Element[] = [];
    
      const parseBoldText = (line: string): JSX.Element[] => {
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={index}>{part.slice(2, -2)}</strong>;
          }
          return <span key={index}>{part}</span>;
        });
      };
    
      lines.forEach((line, index) => {
        if (line.startsWith("### ")) {
          if (currentList.length) {
            formattedElements.push(<ul key={`list-${index}`}>{currentList}</ul>);
            currentList = [];
          }
          formattedElements.push(<h2 key={index}>{line.replace("### ", "")}</h2>);
        } else if (line.startsWith("- **")) {
          if (currentList.length) {
            formattedElements.push(<ul key={`list-${index}`}>{currentList}</ul>);
            currentList = [];
          }
          formattedElements.push(<h3 key={index}>{parseBoldText(line.replace(/- /, ""))}</h3>);
        } else if (line.startsWith("- ")) {
          currentList.push(<li key={index}>{parseBoldText(line.replace("- ", ""))}</li>);
        } else if (line.trim() === "") {
          if (currentList.length) {
            formattedElements.push(<ul key={`list-${index}`}>{currentList}</ul>);
            currentList = [];
          }
          formattedElements.push(<br key={index} />);
        } else {
          if (currentList.length) {
            formattedElements.push(<ul key={`list-${index}`}>{currentList}</ul>);
            currentList = [];
          }
          formattedElements.push(<p key={index}>{parseBoldText(line)}</p>);
        }
      });
    
      if (currentList.length) {
        formattedElements.push(<ul key={`list-final`}>{currentList}</ul>);
      }
    
      return formattedElements;
    };
      
    
    return(
        <div className="chatbot-main">
            <div className="main">
                <div className="chat">
                    <div className="title">
                        <figure><img src={chat_icon} alt="" /></figure>
                        <p>Trò chuyện cùng Enggram</p>
                    </div>
                    <div className="chat-list">
                        <ul>
                            {listMessage.map((item, index) => <li key={index} className={item.role==="USER"?"user":"system"}>
                                <div>{formatText(item.content)}</div>
                            </li>)}
                        </ul>
                        {!mode&&<p className="note">Hệ thống đang trả lời...</p>}
                    </div>
                    <div className="footer">
                        <fieldset><input
                            id="chat" 
                            type="text" 
                            placeholder="Nhập tin nhắn của bạn" 
                            value={yourChat} 
                            onChange={(e) => setYourChat(e.target.value)} 
                            onKeyDown={(e) => handleEnter(e)}/></fieldset>
                        <figure onClick={send}><img src={send1_icon} alt="" /></figure>
                    </div>
                </div>
                <Transbox/>
            </div>
        </div>
    )
}