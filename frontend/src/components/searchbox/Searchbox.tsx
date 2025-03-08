import "./searchbox.css"
import exit_icon from "./images/x-01.png"

interface Search{
    en: string;
    vi: string;
    explain: string;
}

interface Props{
    search: Search
    setIsSearchbox: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Searchbox({search, setIsSearchbox}:Props){

    const formatExplain = (content:string)=>{
        const lines = content.split("\n");
        return <ul style={{listStyle:"none"}}>
            {lines.map((item, index) => <li key={index} style={{marginBottom:"5px"}}>{item}</li>)}
        </ul>
    }

    return(
        <div className="searchbox-main">
            <div className="english-box">
                <p className="title">Tiếng Anh:</p>
                <p className="content">{search.en}</p>
            </div>
            <div className="trans-box">
                <p className="title">Dịch nghĩa:</p>
                <p className="content">{search.vi}</p>
            </div>
            <div className="explain">
                <p className="title">Ví dụ:</p>
                <div className="text">{formatExplain(search.explain)}</div>
            </div>
            <figure className="exit" onClick={()=> setIsSearchbox(false)}><img src={exit_icon} alt="" /></figure>
        </div>
    )
}