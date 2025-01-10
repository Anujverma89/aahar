import { Link, Outlet } from "react-router-dom";

const Admin: React.FC<any> = () => {

    return (
        <>
            <div className="w-full gap-10 max-w-full flex  justify-between items-center bg-[#Fead00]  text-black py-2 px-10">
                <div className="flex gap-10 overflow-x-auto  text-black">
                    <div className="w-fit "><Link to="patients" className="text-black font-bold ">Patients</Link></div>
                    <div className="w-fit "><Link to="analytics" className="text-black font-bold" >Analytics</Link></div>
                    <div className="w-fit "><Link to="pantry" className="text-black font-bold" >Pantry</Link></div>
                </div>
            </div>
            <div className="w-full">
                <Outlet></Outlet>
            </div>
        </>
    )
}
export default Admin;