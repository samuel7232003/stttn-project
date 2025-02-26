import learn_icon from "./images/flame-01.png"
import edit_icon from "./images/edit-contained.png"
import delete_icon from "./images/trash-01.png"
import "./card.css"
import { getListCard } from "../../service/cardService"
import { message } from "antd"
import { deleteFlashcard } from "../../service/flashcardService"

export default function Card({item, setIsEditMode, setFlashcardEdit, setListCardCur, setFlashcardCur}:any){
    function hanleLearn(){
        const fetchData = async() =>{
            try {
                const listCard = await getListCard(item._id);
                listCard.sort((a:any, b:any) => a.no - b.no);
                if(listCard.length>0){setListCardCur(listCard); setFlashcardCur(item)}
                else message.error("Bộ flashcard này còn trống!");
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }

    function handleDelete(){
        const deteleData = async() =>{
            try {
                await deleteFlashcard(item._id);
                message.success("Đã xóa bộ flashcard");
                window.location.reload();
            } catch (error) {
                console.log(error)
            }
        }
        deteleData();
    }

    return(
        <li key={item._id} className="card-main">
            <p className="name">{item.name}</p>
            <p className="num">Đã thuộc: {item.done}/{item.sum}</p>
            <div className="menu">
                <div className="learn" onClick={hanleLearn}>
                    <figure><img src={learn_icon} alt="" /></figure>
                    <p>Học ngay</p>
                </div>
                <div className="edit" onClick={() => {setIsEditMode(true); setFlashcardEdit(item)}}>
                    <figure><img src={edit_icon} alt="" /></figure>
                    <p>Chỉnh sửa</p>
                </div>
                <div className="delete" onClick={handleDelete}>
                    <figure><img src={delete_icon} alt="" /></figure>
                    <p>Xóa</p>
                </div>
            </div>
        </li>
    )
}