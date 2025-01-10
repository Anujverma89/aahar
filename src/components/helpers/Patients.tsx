import { useEffect, useState } from "react";
import Input from "./Input";
import PatientCard from "./PatientCard";
import { Selectinput } from "./Input";
import axios from "axios";
import base from "../../url";


const Patients: React.FC<any> = () => {
    const [gender] = useState(["Male", "Female", "Other"]);
    const inputclass: string = "h-10 bg-transparent border rounded-sm shadow-sm focus:outline-none focus:ring-2 ring-blue-300 px-3 text-black"
    const textareaclass: string = "bg-transparent border rounded-sm shadow-sm focus:outline-none focus:ring-2 ring-blue-300 px-3 text-black"
    const [isViewPatients, setViewPatients] = useState(false);
    const [isPatientSaved, setIsPatientSaved] = useState(false);
    const [patientDetail, setPatientDetail] = useState([]);
    const [isViewClick, setViewClick] = useState(false);
    const [isEditPatientDetail, setIsEditPatientDetail] = useState(false);
    const [dietdata, setDietData] = useState({
        "breakfast": "",
        "lunch": "",
        "dinner": "",
        "patientId": "",
    })
    const [patientsData, SetPatientsData] = useState({
        "pname": "",
        "dname": "",
        "allergies": "",
        "room": "",
        "bedno": "",
        "floor": "",
        "age": "",
        "select": "",
        "contact": "",
        "emrcontact": "",
    })

    function changeTextare(e: any) {
        const { name, value } = e.target;
        setDietData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    function handleChange(e: any) {
        const { name, value } = e.target;
        SetPatientsData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    function editPatientDetail(e: any) {
        const patientid = e.target.id;
        const arrayindex = parseInt(patientid);
        for (let x in patientDetail[arrayindex]) {
            SetPatientsData((prev) => ({
                ...prev,
                [x]: patientDetail[arrayindex][x],
            }))
        }
        setIsEditPatientDetail(true);
    }




    function viewPatentDetail(e: any) {
        const patientid = e.target.id;
        const arrayindex = parseInt(patientid);
        const id:string = patientDetail[arrayindex].id;
        for (let x in patientDetail[arrayindex]) {
            SetPatientsData((prev) => ({
                ...prev,
                [x]: patientDetail[arrayindex][x],
            }))
        }
        axios({
            url:`${base}admin/getdiet/${id}`,
            method:"GET"
        })
        .then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
        setIsEditPatientDetail(false);
        setViewClick(true);
    }








    function deletePatient(e: any) {
        const stringid: any = e.target.id;
        const indextodelte: number = parseInt(stringid);
        const id: string = patientDetail[indextodelte].id;
        console.log(id);
        const conf = confirm("Do you really want to delte ?")
        if (conf === true) {
            axios({
                url: `${base}admin/deletePatient/${id}`,
                method: "DELETE",
            }).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    function savedata(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        axios({
            url: `${base}admin/addpatients`,
            method: "POST",
            data: patientsData,
        }).then((res) => {
            setIsPatientSaved(true);
            setDietData((prev) => ({
                ...prev,
                "patientId": res.data.result.id,
            }))
            console.log(res.data.result.id);
        }).catch((err) => {
            console.log(err)
        })
    }

    function savediet(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        axios({
            url: `${base}admin/adddiet`,
            method: "POST",
            data: dietdata,
        }).then((res) => {
            setIsPatientSaved(true);
            alert("Your Patient has been added");
            window.location.reload();
            console.log(res);
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        axios({
            url: `${base}admin/getpatient`,
            method: "GET",
        }).then((res) => {
            setPatientDetail(res.data.result);
        }).catch((e) => {
            console.log(e);
        })
    }, [patientDetail])

    return (
        <>
            <div className="relative w-full flex flex-col min-h-dvh  items-center">
                <div className="relative w-[80%] md:w-fit mb-2 items-center justify-center rounded-sm mt-2 md:absolute bg-white text-black gap-2 p-2 left-0 font-bold flex">
                    <div className="p-2 border-2 bg-[#Fead00] cursor-pointer" onClick={() => { setViewPatients(false) }}>Add Patients</div>
                    <div className="p-2 border-2 bg-[#Fead00] cursor-pointer" onClick={() => { setViewPatients(true) }}>View Patients</div>
                </div>
                {!isViewPatients &&
                    <div className="flex flex-col md:flex-row items-center justify-center flex-wrap gap-10">

                        <form className="bg-white rounded-sm mb-2 p-5 mt-0 md:mt-20 w-[80%] md:w-fit static" onSubmit={savedata}>
                            <div className="text-black text-center pb-2 font-bold">
                                <h2>Enter patients Detail here</h2>
                                <hr className="mt-2"></hr>
                            </div>
                            <div className="grid md:grid-cols-2 place-items-center place-content-center">
                                <Input type="text" Representation="Patients Name" value={patientsData.pname} name="pname" id="patientsname" datadiv="inputname" classes={inputclass} changeHandler={handleChange} />
                                <Input type="text" Representation="Disease" name="dname" value={patientsData.dname} id="diseasename" datadiv="diseasename" classes={inputclass} changeHandler={handleChange} />
                                <Input type="text" Representation="Allergies" name="allergies" id="allergies" value={patientsData.allergies} datadiv="allergies" classes={inputclass} changeHandler={handleChange} />
                                <Input type="text" Representation="Room No" name="room" id="roomno" datadiv="roomno" value={patientsData.room} classes={inputclass} changeHandler={handleChange} />
                                <Input type="text" Representation="Bed No" name="bedno" id="bedno" datadiv="bedno" value={patientsData.bedno} classes={inputclass} changeHandler={handleChange} />
                                <Input type="text" Representation="Floor No" name="floor" id="flourno" datadiv="flourno" value={patientsData.floor} classes={inputclass} changeHandler={handleChange} />
                                <Input type="number" Representation="Patient's Age" name="age" id="age" datadiv="age" value={patientsData.age} classes={inputclass} changeHandler={handleChange} />
                                <Selectinput name="select" id="select" selectclass={inputclass} optionsred={gender} value={patientsData.select} labelRep="Select Gender" changeHandler={handleChange} />
                                <Input type="text" Representation="Contact No" name="contact" value={patientsData.contact} id="contactno" datadiv="contactno" classes={inputclass} changeHandler={handleChange} />
                                <Input type="text" Representation="Emergency Contact No" name="emrcontact" value={patientsData.emrcontact} id="emrcontactno" datadiv="emrcontactno" classes={inputclass} changeHandler={handleChange} />
                            </div>
                            <div className="mt-2 flex items-center gap-2 justify-center">
                                <button className="bg-green-400 rounded-md" type="submit">Save Patient</button>
                            </div>
                        </form>
                        {isPatientSaved &&
                            <form className="bg-white h-full rounded-sm mb-2 flex flex-col justify-center items-center gap-2 p-5 mt-0 md:mt-20 w-[80%] md:w-fit static" onSubmit={savediet}>
                                <textarea name="breakfast" rows={4} className={textareaclass} value={dietdata.breakfast} onChange={changeTextare}></textarea>
                                <textarea name="lunch" rows={4} className={textareaclass} value={dietdata.lunch} onChange={changeTextare}></textarea>
                                <textarea name="dinner" rows={4} className={textareaclass} value={dietdata.dinner} onChange={changeTextare}></textarea>
                                <button className="bg-gray-400 rounded-md">Generate Diet</button>
                            </form>
                        }
                    </div>
                }
                {
                    isViewPatients &&

                    <div className="w-[80%] text-black font-bold flex flex-col justify-center items-center  mb-2 mt-0 md:mt-20 gap-2 static">
                        {
                            patientDetail.map((data: any, index: number) =>
                                <PatientCard name={data.pname} roomno={data.room} key={data.length} id={index.toString()} edit={editPatientDetail} view={viewPatentDetail} deletepatient={deletePatient} />
                            )
                        }

                        {
                            patientDetail.length == 0 &&

                            <div className="bg-white rounded-sm mb-2 p-5 mt-0 md:mt-20 w-[80%] md:w-fit static">
                                <h2 className="text-4xl">No Patient's Data is Available</h2>
                                <h3 className="text-2xl">Please Add Few to get Started</h3>
                            </div>

                        }

                        {
                            isEditPatientDetail &&
                            <form className="bg-white rounded-sm mb-2 p-5 mt-0 md:mt-20 w-[80%] md:w-fit static" onSubmit={savedata}>
                                <div className="text-black text-center pb-2 font-bold">
                                    <h2>Edit patients Detail here</h2>
                                    <hr className="mt-2"></hr>
                                </div>
                                <div className="grid md:grid-cols-2 place-items-center place-content-center">
                                    <Input type="text" Representation="Patients Name" value={patientsData.pname} name="pname" id="patientsname" datadiv="inputname" classes={inputclass} changeHandler={handleChange} />
                                    <Input type="text" Representation="Disease" name="dname" value={patientsData.dname} id="diseasename" datadiv="diseasename" classes={inputclass} changeHandler={handleChange} />
                                    <Input type="text" Representation="Allergies" name="allergies" id="allergies" value={patientsData.allergies} datadiv="allergies" classes={inputclass} changeHandler={handleChange} />
                                    <Input type="text" Representation="Room No" name="room" id="roomno" datadiv="roomno" value={patientsData.room} classes={inputclass} changeHandler={handleChange} />
                                    <Input type="text" Representation="Bed No" name="bedno" id="bedno" datadiv="bedno" value={patientsData.bedno} classes={inputclass} changeHandler={handleChange} />
                                    <Input type="text" Representation="Floor No" name="floor" id="flourno" datadiv="flourno" value={patientsData.floor} classes={inputclass} changeHandler={handleChange} />
                                    <Input type="number" Representation="Patient's Age" name="age" id="age" datadiv="age" value={patientsData.age} classes={inputclass} changeHandler={handleChange} />
                                    <Selectinput name="select" id="select" selectclass={inputclass} optionsred={gender} value={patientsData.select} labelRep="Select Gender" changeHandler={handleChange} />
                                    <Input type="text" Representation="Contact No" name="contact" value={patientsData.contact} id="contactno" datadiv="contactno" classes={inputclass} changeHandler={handleChange} />
                                    <Input type="text" Representation="Emergency Contact No" name="emrcontact" value={patientsData.emrcontact} id="emrcontactno" datadiv="emrcontactno" classes={inputclass} changeHandler={handleChange} />
                                </div>
                                <div className="mt-2 flex items-center gap-2 justify-center">
                                    <button className="bg-green-400 rounded-md" type="submit">Save Patient</button>
                                </div>
                            </form>
                        }

                        {
                            isViewClick &&

                            <div className="bg-white rounded-sm mb-2 flex flex-wrap p-5 mt-0 md:mt-20 w-[80%] md:w-fit static">

                                <div className="flex gap-3 flex-col items-start">
                                    <div className="border-b w-full pb-2">Name : {patientsData.pname}</div>
                                    <div className="border-b w-full pb-2">Gender : {patientsData.select}</div>
                                    <div className="border-b w-full pb-2">Allergeis : {patientsData.allergies}</div>
                                    <div className="border-b w-full pb-2">Room No : {patientsData.room}</div>
                                    <div className="border-b w-full pb-2">Bed No : {patientsData.bedno}</div>
                                    <div className="border-b w-full pb-2">Age : {patientsData.age}</div>
                                    <div className="border-b w-full pb-2">Floor : {patientsData.floor}</div>
                                    <div className="border-b w-full pb-2">Contact : {patientsData.contact}</div>
                                    <div className="border-b w-full pb-2">Energency Contact : {patientsData.emrcontact}</div>
                                </div>

                                <div className="flex gap-3 flex-col items-start">
                                    <div className="border-b w-full pb-2">Name : {patientsData.pname}</div>
                                    <div className="border-b w-full pb-2">Name : {patientsData.pname}</div>
                                    <div className="border-b w-full pb-2">Name : {patientsData.pname}</div>
                                </div>
                            </div>
                        }

                    </div>
                }
            </div>
        </>
    )
}

export default Patients;