import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

export default function Home(){
    return (
        <div>
            <Header/>
            <div>
                <Outlet/>
            </div>
        </div>
    )
}