interface Props{
    flashcard: any
}

export default function CardEdit({flashcard}:Props){
    return(
        <div className="cardedit-main">
            <div className="title">Chỉnh sửa bộ flashcard {flashcard.name}</div>
        </div>
    )
}