import React, { useState } from "react";
import Input from "../helpers/Input";
import axios from "axios";
import base from "../../url";

const CreateAdmin: React.FC<any> = () => {
    const inputclass: string = "h-10 bg-transparent border rounded-sm shadow-sm focus:outline-none focus:ring-2 ring-blue-300 px-3 text-black"
    const [loginvalue, setLoginValue] = useState({
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

    function create(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoader(true);
        axios({
            url:`${base}auth/handlerequest`,
            method:"POST",
            data:loginvalue
        }).then((res)=>{
            console.log(res);
            setLoader(false);
        }).catch((e)=>{
            console.log(e);
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
                <form className="bg-white rounded-sm mb-2 p-5 flex items-center justify-center flex-col mt-0 md:mt-20 w-[80%] md:w-fit static" onSubmit={create}>
                    <Input type="email" Representation="Jadu" value={loginvalue.email} name="email" id="email" datadiv="email" classes={inputclass} changeHandler={handleChange} />
                    <Input type="password" Representation="Mantar" value={loginvalue.password} name="password" id="password" datadiv="password" classes={inputclass} changeHandler={handleChange} />
                    <button className="rounded-md">Create</button>
                </form>
            </div>

        </>
    )
}

export default CreateAdmin;