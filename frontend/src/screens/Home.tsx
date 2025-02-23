import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

export default function Home(){
    return (
        <div>
            <Header/>
            <div style={{paddingTop: "70px"}}>
                <Outlet/>
            </div>
        </div>
    )
}