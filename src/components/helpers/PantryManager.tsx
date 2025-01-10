import Input from "./Input";
import { useEffect, useState } from "react";
import PatientCard from "./PatientCard";
import axios from "axios";
import base from "../../url";

const Pantrymanager: React.FC<any> = () => {
    const [isViewPatients, setViewPatients] = useState(false);
    const [ispasswordMatch, setPasswordMatch] = useState(true);
    const inputclass: string = "h-10 bg-transparent border rounded-sm shadow-sm focus:outline-none focus:ring-2 ring-blue-300 px-3"
    const [pantryDetail, SetpantryDetail] = useState({
        "staffname": "",
        "contact": "",
        "location": "",
        "email": "",
        "password": "",
        "cpassword": ""
    })
    const [iseditPantry, setIsEditPantry] = useState(false);
    const [allPantries, setAllPantries] = useState([]);


    function handleChange(e: any) {
        const { name, value } = e.target;
        SetpantryDetail((prev) => ({
            ...prev,
            [name]: value,
        }))
        if (pantryDetail.cpassword != pantryDetail.password) {
            setPasswordMatch(false);
        } else {
            setPasswordMatch(true);
        }
    }

    function checkPassword() {
        if (pantryDetail.cpassword != pantryDetail.password) {
            setPasswordMatch(false);
        } else {
            setPasswordMatch(true);
        }
    }

    function editPatientDetail(e:any) {
        const pantryid = e.target.id;
        const arrayindex = parseInt(pantryid);
        for(let x in allPantries[arrayindex]){
            SetpantryDetail((prev)=>({
                ...prev,
                [x]:allPantries[arrayindex][x]
            }))
        }
        setIsEditPantry(true);
    }

    function viewPatentDetail() {
        console.log("view patient detail");
    }

    function deletePatient(e: any) {
        const id = e.target.id;
        const dataid = allPantries[parseInt(id)].id;
        console.log(dataid);
        const conf = confirm("Do you really want to delte ?")
        if (conf === true) {
            axios({
                url: `${base}admin/deltepantry/${dataid}`,
                method: "DELETE",
            }).then((res) => {
                console.log(res);

                alert("Pantry has been deleted");
                window.location.reload()
            }).catch((e) => {
                console.log(e);
            })
        }
    }

    function savepantry(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        axios({
            url: `${base}admin/addpantry`,
            method: "POST",
            data: pantryDetail,
        }).then((res) => {
            console.log(res);
            alert("Pantry has been added");
        }).catch((e) => {
            console.log(e);
        })
    }


    useEffect(() => {
        console.log(base)
        axios({
            url: `${base}admin/getpantry`,
            method: "GET",
        }).then((res) => {
            console.log(res.data)
            setAllPantries(res.data)
            console.log(res);
        }).catch((e) => {
            console.log(e);
        })
    }, [])

    return (
        <>
            <div className="relative w-full flex flex-col h-dvh  items-center">
                <div className="relative w-[80%] md:w-fit mb-2 items-center justify-center rounded-sm mt-2 md:absolute bg-white text-black gap-2 p-2 left-0 font-bold flex">
                    <div className="p-2 border-2 bg-[#Fead00] cursor-pointer" onClick={() => { setViewPatients(false) }}>Add Pantry</div>
                    <div className="p-2 border-2 bg-[#Fead00] cursor-pointer" onClick={() => { setViewPatients(true) }}>Modify Pantry</div>
                </div>
                {!isViewPatients &&
                    <form className="bg-white rounded-sm mb-2 p-5 mt-0 md:mt-20 w-[80%] md:w-fit static" onSubmit={savepantry}>
                        <div className="text-black text-center pb-2 font-bold">
                            <h2>Add Pantry Detail here</h2>
                            <hr className="mt-2"></hr>
                        </div>
                        <div className="grid md:grid-cols-2 place-items-center place-content-center">
                            <Input type="text" Representation="Staff Name" value={pantryDetail.staffname} name="staffname" id="staffsname" datadiv="inputname" classes={inputclass} changeHandler={handleChange} />
                            <Input type="text" Representation="Contact No" value={pantryDetail.contact} name="contact" id="contactno" datadiv="contactno" classes={inputclass} changeHandler={handleChange} />
                            <Input type="text" Representation="Location" value={pantryDetail.location} name="location" id="location" datadiv="location" classes={inputclass} changeHandler={handleChange} />
                            <Input type="email" Representation="Email" value={pantryDetail.email} name="email" id="email" datadiv="email" classes={inputclass} changeHandler={handleChange} />
                            <Input type="password" Representation="Passwrod" value={pantryDetail.password} name="password" id="password" datadiv="password" classes={inputclass} changeHandler={handleChange} />
                            <div className="text-black w-full h-fit px-5 py-1 flex flex-col">
                                <label htmlFor="cpassword">Confirm Password</label>
                                <input type="password" id="cpassword" name="cpassword" className={inputclass} value={pantryDetail.cpassword} data-input="email" onChange={handleChange} required onFocus={checkPassword} onBlur={checkPassword} autoComplete="true" ></input>
                            </div>
                            {!ispasswordMatch && <p className="text-red-500">password didn't match</p>}
                        </div>
                        <div className="mt-2 flex items-center gap-2 justify-center">
                            <button className="bg-green-400 rounded-md">Save Pantry</button>
                        </div>
                    </form >
                    
                }
                {
                    isViewPatients &&

                    <div className="w-[80%] text-black font-bold flex flex-col items-center justify-center  mb-2 mt-0 md:mt-20 gap-2 static">
                        {
                            allPantries && allPantries.map((data: any, index: number) => (
                                <PatientCard name={data.staffname} roomno="" key={data.length} id={index.toString()} edit={editPatientDetail} view={viewPatentDetail} deletepatient={deletePatient} />
                            ))
                        }

                        {
                            allPantries.length == 0 &&

                            <div className="bg-white rounded-sm mb-2 p-5  w-[80%] md:w-fit static">
                                <h2 className="text-4xl">No pantries are Available</h2>
                                <h3 className="text-2xl">Please Add Few to get Started</h3>
                            </div>
                        }

                        {
                            iseditPantry &&
                            <form className="bg-white rounded-sm mb-2 p-5 mt-0 md:mt-20 w-[80%] md:w-fit static" onChange={savepantry}>
                                <div className="text-black text-center pb-2 font-bold">
                                    <h2>Edit Pantry Detail here</h2>
                                    <hr className="mt-2"></hr>
                                </div>
                                <div className="grid md:grid-cols-2 place-items-center place-content-center">
                                    <Input type="text" Representation="Staff Name" value={pantryDetail.staffname} name="staffname" id="staffsname" datadiv="inputname" classes={inputclass} changeHandler={handleChange} />
                                    <Input type="text" Representation="Contact No" value={pantryDetail.contact} name="contact" id="contactno" datadiv="contactno" classes={inputclass} changeHandler={handleChange} />
                                    <Input type="text" Representation="Location" value={pantryDetail.location} name="location" id="location" datadiv="location" classes={inputclass} changeHandler={handleChange} />
                                    <Input type="email" Representation="Email" value={pantryDetail.email} name="email" id="email" datadiv="email" classes={inputclass} changeHandler={handleChange} />
                                    <Input type="password" Representation="Passwrod" value={pantryDetail.password} name="password" id="password" datadiv="password" classes={inputclass} changeHandler={handleChange} />
                                    <div className="text-black w-full h-fit px-5 py-1 flex flex-col">
                                        <label htmlFor="cpassword">Confirm Password</label>
                                        <input type="password" id="cpassword" name="cpassword" className={inputclass} value={pantryDetail.cpassword} data-input="email" onChange={handleChange} required onFocus={checkPassword} onBlur={checkPassword} autoComplete="true" ></input>
                                    </div>
                                    {!ispasswordMatch && <p className="text-red-500">password didn't match</p>}
                                </div>
                                <div className="mt-2 flex items-center gap-2 justify-center">
                                    <button className="bg-green-400 rounded-md" >Save Pantry</button>
                                </div>
                            </form>
                        }
                    </div>
                }

            </div>
        </>
    )
}

export default Pantrymanager;