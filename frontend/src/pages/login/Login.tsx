import { useNavigate, useOutletContext } from "react-router-dom";
import title_img from "./images/STTTN (1).png"
import "./login.css"
import { useEffect, useState } from "react";
import { initialUserState } from "../../redux/user/user.slice";
import { login, signup } from "../../service/accountService";
import { message } from "antd";
import { getProfile } from "../../redux/user/user.action";
import { useAppDispatch } from "../../redux/builder";

export default function Login(){
    const {setCurPage}:any = useOutletContext();
    const [user, setUser] = useState(initialUserState.user);
    const [error, setError] = useState("");
    const [mode, setMode] = useState(true); //true: login, false: signup
    const [repassword, setRepassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    function onChange(value: string, type: string){
        setUser({...user, [type]: value});
    }

    useEffect(() => {
        setCurPage("login");
        document.querySelectorAll("input").forEach(input => {
            input.setAttribute("autocomplete", "new-password");
        });
        // eslint-disable-next-line
    }, []);

    function handleLogin(){
        const email = user.email.trim();
        const password = user.password.trim();
        async function checkLogin(){
            const response:any = await login(email, password);
            if(response.EC===1) setError("Tên đăng nhập hoặc mật khẩu sai!");
            else {
                localStorage.setItem('access_token', response.access_token);
                localStorage.setItem('email', response.user.email);
                const fectchData = async () => {
                    await dispatch(getProfile());
                }
                fectchData()
                message.success("Đăng nhập thành công!");
                setTimeout(() => navigate('/'), 1000);
            }
            
        }
        if(email===""||password==="") setError("Vui lòng không để trống các trường!");
        else{
            checkLogin();
        }
    }

    function handleSignup(){
        const email = user.email.trim();
        const first_name = user.first_name.trim();
        const last_name = user.last_name.trim();
        const password = user.password.trim();
        async function checkSignup() {
            try {
                const response = await signup(user);
                if(response.data===null)setError("Email đăng nhập đã tồn tại!");
                else handleLogin();
            } catch (error) {
                console.log(error);
            }
        }
        if(password !== repassword.trim()) setError("Xác nhận mật khẩu thất bại!");
        else if(email===""||first_name===""||last_name===""||password==="") setError("Vui lòng không để trống các trường!");
        else {
            checkSignup();
        }
    }

    function changeMode(){
        setMode(!mode);
        setUser(initialUserState.user);
        setRepassword("");
        setError("");
    }
    
    return(
        <div className="login-main">
            <div className="main">
                <div className="title">
                    <figure><img src={title_img} alt="" /></figure>
                    <p>{mode?"ĐĂNG NHẬP":"ĐĂNG KÝ"}</p>
                </div>
                <div className="infor">
                    {!mode&&<div className="fill name">
                        <input className="firtname" type="text" placeholder="Họ và tên đệm" value={user.first_name} onChange={(e) => onChange(e.target.value, "first_name")}/>
                        <input className="lastname" type="text" placeholder="Tên" value={user.last_name} onChange={(e) => onChange(e.target.value, "last_name")}/>
                    </div>}
                    <div className="fill">
                        <input className="email" type="text" placeholder="Nhập email đăng nhập" value={user.email} onChange={(e) => onChange(e.target.value, "email")} autoFocus/>
                    </div>
                    <div className="fill">
                        <input className="password" type="password" placeholder="Nhập mật khẩu" value={user.password} onChange={(e) => onChange(e.target.value, "password")}/>
                    </div>
                    {!mode&&<div className="fill">
                        <input className="re-password" type="password" placeholder="Xác nhận mật khẩu" value={repassword} onChange={(e) => setRepassword(e.target.value)}/>
                    </div>}
                    {error!==""&&<p className="error">{error}</p>}
                    <div className="btn">
                        <p className="option" onClick={changeMode}>{mode?"Đăng ký":"Đăng nhập"}</p>
                        {mode?<p className="button" onClick={handleLogin}>Đăng nhập</p>:<p className="button" onClick={handleSignup}>Đăng kí</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}