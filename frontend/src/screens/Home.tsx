import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import { useState } from "react";

export default function Home(){
    const [curPage, setCurPage] = useState("home");
    
    return (
        <div>
            <Header curPage={curPage}/>
            <div style={{paddingTop: "70px"}}>
                <Outlet context={{setCurPage}}/>
            </div>
        </div>
    )
}