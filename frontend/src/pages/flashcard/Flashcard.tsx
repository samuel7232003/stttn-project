import add_icon from "./images/plus-01.png"
import back_icon from "./images/Icon (1).png"
import next_icon from "./images/Icon.png"
import check_icon from "./images/check-contained.png"
import setting_icon from "./images/Group 20.png"
import "./flashcard.css"
import { useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react"
import { useAppSelector } from "../../redux/builder"
import { createNewFlashcard, getListFlashCard } from "../../service/flashcardService"
import Card from "../../components/card/Card"
import CardEdit from "../../components/cardedit/CardEdit"
import { doneOneCard } from "../../service/cardService"

export default function Flashcard(){
    const {setCurPage}:any = useOutletContext();
    const user = useAppSelector(state => state.user.user);
    const [listCardCur, setListCardCur] = useState<any>([]);
    const [flashcardCur, setFlashcardCur] = useState<any>();
    const [cardCur, setCardCur] = useState<any>();
    const [listMyFlashcard, setListMyFlashcard] = useState<any>([]);
    const [newName, setNewName] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);
    const [flashcardEdit, setFlashcardEdit] = useState("");
    const [modeCard, setModeCard] = useState(true); //true : front, false: back

    useEffect(() => {
        setCurPage("flashcard");
        // eslint-disable-next-line
    },[])

    useEffect(() => {
        async function fetchDataMyFlashcard() {
            const listFlashcard = await getListFlashCard(user._id);
            setListMyFlashcard(listFlashcard);
        }
        try {
            if(user._id!=="") fetchDataMyFlashcard();
        } catch (error) {
            console.log(error);
        }
    },[user])

    function addFlashcard(){
        async function addFlash() {
            await createNewFlashcard(newName.trim(), user._id);
        }
        if(newName.trim()!==""){
            try {
                addFlash();
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        if(listCardCur.length>0) setCardCur(listCardCur[0]);
    }, [listCardCur]);

    function handleNext(){
        if(listCardCur[cardCur.no]) setCardCur(listCardCur[cardCur.no]);
    }

    function handleBack(){
        if(listCardCur[cardCur.no-2]) setCardCur(listCardCur[cardCur.no-2]);
    }

    function handleDone(e:React.MouseEvent){
        e.stopPropagation();
        const updateData = async ()=>{
            try {
                await doneOneCard(cardCur);
            } catch (error) {
                console.log(error)
            }
        }
        updateData();
        const newListCard = listCardCur.map((item:any) => (item.no === cardCur.no)?({...item, status: true}):({...item}));
        const newListFlashcard = listMyFlashcard.map((item: any) =>(item._id === flashcardCur._id)?({...item, done: item.done+1}):({...item}));
        setListCardCur(newListCard);
        setListMyFlashcard(newListFlashcard);
        setCardCur(listCardCur[cardCur.no-1]);
    }
    
    return(
        <div className="flashcard-main">
            <div className="sub" style={user._id===""?{flexDirection:"column-reverse"}:{}}>
                <div className="your">
                    <p className="title">Các bộ flashcard của bạn:</p>
                    {user._id!==""?<ul>
                        {listMyFlashcard.map((item:any) => <Card 
                            key={item._id} 
                            item={item} 
                            setIsEditMode={setIsEditMode} 
                            setFlashcardEdit={setFlashcardEdit}
                            setListCardCur={setListCardCur}
                            setFlashcardCur = {setFlashcardCur}
                        />)}
                        <li className="last">
                            <figure><img src={add_icon} alt="" /></figure>
                            <p className="add">Thêm bộ flashcard</p>
                            <div className="edit">
                                <fieldset><input type="text" placeholder="Nhập tên flashcard" value={newName} onChange={(e)=>setNewName(e.target.value)}/></fieldset>
                                <p onClick={addFlashcard}>Tạo</p>
                            </div>
                        </li>
                    </ul>:<p className="note">Đăng nhập thể tạo bộ flashcard của riêng mình.</p>}
                </div>
                {(listCardCur.length>0&&flashcardCur)&&<div className="main">
                    <p className="title">{flashcardCur.name}</p>
                    <div className="learn">
                        <figure className="back" onClick={handleBack}><img src={back_icon} alt="" /></figure>
                        {cardCur&&<div className="card"  onClick={() => setModeCard(!modeCard)}>
                            <p className="hand" >{modeCard?"Mặt trước":"Mặt sau"}<img src={next_icon} alt="" /></p>
                            <p className="num">{cardCur.no}/{flashcardCur.sum}</p>
                            <p className="content">{modeCard?cardCur.front:cardCur.back}</p>
                            <p className="takenote">{modeCard?cardCur.front_note:cardCur.back_note}</p>
                            {!cardCur.status?<div className="btn" onClick={(e) => handleDone(e)}>
                                <figure><img src={check_icon} alt="" /></figure>
                                <p>Đánh dấu là đã thuộc</p>
                            </div>:<div className="btn done">
                                <figure><img src={check_icon} alt="" /></figure>
                                <p>Đã thuộc</p>
                            </div>}
                        </div>}
                        <figure className="next" onClick={handleNext}><img src={next_icon} alt="" /></figure>
                    </div>
                    <figure className="setting"><img src={setting_icon} alt="" /></figure>
                </div>}
                <div className="orther">
                    <p className="title">Các bộ flashcard tham khảo:</p>
                    <ul>
                        <li>
                            <p className="name">Động vật</p>
                            <p className="num">Số từ: 10</p>
                            <p className="see">Xem ngay!</p>
                        </li>
                        <li>
                            <p className="name">Động vật</p>
                            <p className="num">Số từ: 10</p>
                            <p className="see">Xem ngay!</p>
                        </li>
                    </ul>
                </div>
            </div>
            {isEditMode&&<div className="editmode">
                <CardEdit flashcard={flashcardEdit} setIsEditMode={setIsEditMode}/>
            </div>}
        </div>
    )
}