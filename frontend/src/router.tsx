import { createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home"
import Welcome from "./pages/welcome/Welcome";
import Camera from "./pages/camera/Camera";
import Chatbot from "./pages/chatbot/Chatbot";
import Login from "./pages/login/Login";
import Flashcard from "./pages/flashcard/Flashcard";

export const router = createBrowserRouter(
    [{
        path: "/",
        element: <Home/>,
        children:[
            {
                path:"",
                element: <Welcome/>
            },
            {
                path:"camera",
                element: <Camera/>
            },
            {
                path:"chatbot",
                element: <Chatbot/>
            },
            {
                path:"login",
                element: <Login/>
            },
            {
                path:"flashcard",
                element: <Flashcard/>
            }
        ]
    }]
)