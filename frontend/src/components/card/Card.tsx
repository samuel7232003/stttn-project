import learn_icon from "./images/flame-01.png"
import edit_icon from "./images/edit-contained.png"
import delete_icon from "./images/trash-01.png"
import "./card.css"

export default function Card({item, setIsEditMode, setFlashcardEdit}:any){
    return(
        <li key={item._id} className="card-main">
            <p className="name">{item.name}</p>
            <p className="num">{item.done}/{item.sum}</p>
            <div className="menu">
                <div className="learn">
                    <figure><img src={learn_icon} alt="" /></figure>
                    <p>Học ngay</p>
                </div>
                <div className="edit" onClick={() => {setIsEditMode(true); setFlashcardEdit(item)}}>
                    <figure><img src={edit_icon} alt="" /></figure>
                    <p>Chỉnh sửa</p>
                </div>
                <div className="delete">
                    <figure><img src={delete_icon} alt="" /></figure>
                    <p>Xóa</p>
                </div>
            </div>
        </li>
    )
}