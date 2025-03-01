import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import { useState } from "react";
import "./home.css"

export default function Home(){
    const [curPage, setCurPage] = useState("home");
    
    return (
        <div className="home-main">
            <Header curPage={curPage}/>
            <div className="main-bottom" style={{}}>
                <Outlet context={{setCurPage}}/>
            </div>
        </div>
    )
}