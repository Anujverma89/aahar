import { useState } from "react";
import Input, { Selectinput } from "../helpers/Input";
import axios from "axios";
import base from "../../url";

const Pantry: React.FC<any> = () => {
    const mealtype: string[] = ["Breakfast", "Lunch", "Dinner"];
    const pantryid:string = window.localStorage.getItem("Uid");
    const uname:string[] = [window.localStorage.getItem("User")];
    const [mealDelivery, setMealDelivery] = useState(false);
    const [addPartner, setAddPartner] = useState(false);
    const [viewMeal, setViewMeal] = useState(true);
    const [ispasswordMatch, setPasswordMatch] = useState(true);
    const [loader, setLoader] = useState(false);
    const inputclass: string = "h-10 bg-transparent border rounded-sm shadow-sm focus:outline-none focus:ring-2 ring-blue-300 px-3";
    const [partnetDetail, setPartnetDetail] = useState({
        "name": "",
        "contact": "",
        "email": "",
        "password": "",
        "cpassword": ""
    })

    const [mealDetail, setMealDetail] = useState({
        "type": "Breakfast",
        "pantryId": "",
        "patientId": "",
        "vahakId": "",
    })


    function checkPassword() {
        if (partnetDetail.cpassword != partnetDetail.password) {
            setPasswordMatch(false);
        } else {
            setPasswordMatch(true);
        }
    }

    function handleChange(e: any) {
        const { name, value } = e.target;
        setPartnetDetail((preve) => ({
            ...preve,
            [name]: value,
        }))
    }

    function savePartner(e: React.FormEvent<HTMLFormElement>) {
        setLoader(true);
        e.preventDefault();
        if (partnetDetail.password != partnetDetail.cpassword) {
            alert("Password didn't match");
            return
        }

        axios({
            url: `${base}pantry/addpartner`,
            method: "POST",
            data: partnetDetail,
        }).then((res) => {
            console.log(res);
            alert("Partner has been added");
            setLoader(false);
        }).catch((e) => {
            console.log(e);
            setLoader(false)
        })
    }

    function handleMealChange() {

    }


    function saveMeal(e: React.FormEvent<HTMLFormElement>) {
        setLoader(true);
        e.preventDefault();
        if (partnetDetail.password != partnetDetail.cpassword) {
            alert("Password didn't match");
            return
        }

        axios({
            url: `${base}pantry/savemeal`,
            method: "POST",
            data: partnetDetail,
        }).then((res) => {
            console.log(res);
            alert("Partner has been added");
            setLoader(false)
        }).catch((e) => {
            console.log(e);
            setLoader(false)
        })
    }




    return (
        <>
            <div className="w-full gap-10 max-w-full flex  justify-between items-center bg-[#Fead00]  text-black py-2 px-10">
                <div className="flex gap-10 overflow-x-auto  text-black">
                    <div className="w-fit cursor-pointer p-2 border-2 border-black shadow-md rounded-md text-center " onClick={() => { setMealDelivery(false); setAddPartner(false); setViewMeal(true) }}>Assigned Meals</div>
                    <div className="w-fit cursor-pointer p-2 border-2 border-black shadow-md rounded-md text-center " onClick={() => { setMealDelivery(true); setAddPartner(false); setViewMeal(false) }}>Meal Delivery</div>
                    <div className="w-fit cursor-pointer p-2 border-2 border-black shadow-md rounded-md text-center  " onClick={() => { setAddPartner(true); setMealDelivery(false); setViewMeal(false) }}>Add Delivery Partner</div>
                </div>
            </div>




            {
                viewMeal &&

                <div className="w-full gap-10 max-w-full flex flex-col  justify-between items-center  h-dvh  text-black py-2 px-10">
                    <div className="bg-white rounded-sm   mb-2 p-5 mt-0 md:mt-20 w-[100%] md:w-fit static">
                        <div className="text-black text-center pb-2 font-bold">
                            <h2>Assigned meals</h2>
                            <hr className="mt-2"></hr>
                        </div>

                        <div className="lg:grid place-items-center flex flex-col items-start gap-3 grid-cols-2">
                            <div>
                                Patient name
                            </div>
                            <div>
                                Meal detail
                            </div>
                            <div>
                                Ship Meal
                            </div>
                        </div>
                    </div>
                </div>
            }



            {
                mealDelivery &&

                <div className="w-full gap-10 max-w-full flex flex-col  justify-between items-center  h-dvh  text-black py-2 px-10">
                    <form className="bg-white rounded-sm mb-2 p-5 flex flex-col items-center mt-0 md:mt-20 w-[100%] md:w-fit static" onSubmit={saveMeal}>
                        <div className="text-black text-center pb-2 font-bold">
                            <h2>Create a Meal</h2>
                            <hr className="mt-2"></hr>
                        </div>
                        <Selectinput id="mealtype" name="mealtype" optionsred={mealtype} selectclass={inputclass} value={mealDetail.type} labelRep="Select Meal type" changeHandler={handleMealChange} ></Selectinput>
                        <Selectinput id="Pantryid" name="pantryid" optionsred={uname} selectclass={inputclass} value={pantryid} labelRep="Pantry" changeHandler={()=>{}} ></Selectinput>
                        <Selectinput id="mealtype" name="mealtype" optionsred={mealtype} selectclass={inputclass} value={mealDetail.pantryId} labelRep="Select Patient" changeHandler={handleMealChange} ></Selectinput>
                        <Selectinput id="mealtype" name="mealtype" optionsred={mealtype} selectclass={inputclass} value={mealDetail.vahakId} labelRep="Select Delivery Partner" changeHandler={handleMealChange} ></Selectinput>
                        <button className="bg-green-400 rounded-md">Save Meal</button>
                    </form>

                    {
                        loader &&
                        <div className="bg-white animate-bounce absolute w-full h-[400px] text-black font-bold text-4xl items-center justify-center flex text-center rounded-md ">
                            Hold on getting you back to work
                        </div>
                    }
                </div>


            }





            {
                addPartner &&
                <div className="w-full gap-10 max-w-full flex flex-col relative  justify-between items-center  h-dvh  text-black py-2 px-10">
                    <form className="bg-white rounded-sm mb-2 p-5 mt-0 md:mt-20 w-[80%] md:w-fit static" onSubmit={savePartner}>
                        <div className="text-black text-center pb-2 font-bold">
                            <h2>Add Partner Detail here</h2>
                            <hr className="mt-2"></hr>
                        </div>
                        <div className="grid md:grid-cols-2 place-items-center place-content-center">
                            <Input type="text" Representation="Vahak Name" value={partnetDetail.name} name="name" id="name" datadiv="inputname" classes={inputclass} changeHandler={handleChange} />
                            <Input type="text" Representation="Contact No" value={partnetDetail.contact} name="contact" id="contactno" datadiv="contactno" classes={inputclass} changeHandler={handleChange} />
                            <Input type="email" Representation="email" value={partnetDetail.email} name="email" id="email" datadiv="email" classes={inputclass} changeHandler={handleChange} />
                            <Input type="password" Representation="Passwrod" value={partnetDetail.password} name="password" id="password" datadiv="password" classes={inputclass} changeHandler={handleChange} />
                            <div className="text-black w-full h-fit px-5 py-1 flex flex-col">
                                <label htmlFor="cpassword">Confirm Password</label>
                                <input type="password" id="cpassword" name="cpassword" className={inputclass} value={partnetDetail.cpassword} data-input="email" onChange={handleChange} required onFocus={checkPassword} onBlur={checkPassword} autoComplete="true" ></input>
                            </div>
                            {!ispasswordMatch && <p className="text-red-500">password didn't match</p>}
                        </div>
                        <div className="mt-2 flex items-center gap-2 justify-center">
                            <button className="bg-green-400 rounded-md">Save Pantry</button>
                        </div>

                        {
                            loader &&
                            <div className="bg-white animate-bounce absolute w-full h-[400px] text-black font-bold text-4xl items-center justify-center flex text-center rounded-md ">
                                Hold on getting you back to work
                            </div>
                        }
                    </form >
                </div>
            }
        </>
    )
}

export default Pantry;