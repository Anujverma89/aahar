import React, { useState } from "react";
import { Selectinput } from "../helpers/Input";
import Input from "../helpers/Input";
import axios from "axios";
import { useCookies } from "react-cookie";
import {  useNavigate } from "react-router-dom";
import base from "../../url";

const Login: React.FC<any> = () => {
    const roles: string[] = ["Admin", "Pantry", "Delivery"]
    const [cookie,,RemoveCookie] = useCookies(["jwt"]);
    const navigate = useNavigate();

    const inputclass: string = "h-10 bg-transparent border rounded-sm shadow-sm focus:outline-none focus:ring-2 ring-blue-300 px-3 text-black"
    const [loginvalue, setLoginValue] = useState({
        "role": "Admin",
        "email": "",
        "password": "",

    })
    const [loader, setLoader] = useState(false);
    function handleChange(e: any) {
        const { name, value } = e.target;
        setLoginValue((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    
    function login(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const user = window.localStorage.getItem("User");
        if(user){
            window.localStorage.removeItem(user);
        }
        if(cookie.jwt){
            RemoveCookie("jwt")
        }
        setLoader(true);
        axios({
            url:`${base}auth/login`,
            method:"POST",
            data:loginvalue,
            withCredentials: true
        }).then((res)=>{
            window.localStorage.setItem("User",res.data.role)
            window.localStorage.setItem("Uid",res.data.user[0].id);
            window.localStorage.setItem("Uname",res.data.user[0].name);
            if(res.data.role === "Admin"){
                navigate("/admin");
            }else if(res.data.role === "Delivery"){
                navigate("/delivery");
            }else if(res.data.role === "Pantry"){
                navigate("/pantry");
            }
            setLoader(false)
        }).catch((e)=>{
            alert("User not found")
            console.log(e)
            setLoader(false);
        })
    }
    return (
        <>
            <div className="min-h-dvh relative flex justify-center items-center">
                {
                    loader &&
                    <div className="bg-white animate-bounce absolute w-full h-[400px] text-black font-bold text-4xl items-center justify-center flex text-center rounded-md ">
                        Hold on getting you back to work
                    </div>
                }
                <form className="bg-white rounded-sm mb-2 p-5 flex items-center justify-center flex-col mt-0 md:mt-20 w-[80%] md:w-fit static" onSubmit={login}>
                    <Selectinput id="selectRole" name="role" optionsred={roles} selectclass={inputclass} value={loginvalue.role} labelRep="Select your role" changeHandler={handleChange} ></Selectinput>
                    <Input type="email" Representation="Email" value={loginvalue.email} name="email" id="email" datadiv="email" classes={inputclass} changeHandler={handleChange} />
                    <Input type="password" Representation="Passwrod" value={loginvalue.password} name="password" id="password" datadiv="password" classes={inputclass} changeHandler={handleChange} />
                    <button className="rounded-md">Login</button>
                </form>
            </div>

        </>
    )
}

export default Login;