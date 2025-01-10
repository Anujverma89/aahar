import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg"
import Notification from "../helpers/Notificatoin";


const Header: React.FC<any> = () => {
    const location = useLocation();
    const [isShowNotifcation, setNotifcation] = useState(false);
    const [isNotifcation, setIsNotification] = useState(true);
    return (
        <>
            <div className="flex bg-transparent justify-between px-5 py-5 sticky w-full  top-0 left-0">
                <div className="flex items-center text-2xl font-bold  gap-4">
                    <Link to="/"><img src={logo} alt="Aahar Logo"></img></Link>
                    {
                        location.pathname.split("/")[1] == "admin" &&

                        <div>| Admin</div>
                    }
                    {
                        location.pathname == "/pantry" &&

                        <div>| Pantry</div>
                    }
                    {
                        location.pathname == "/delivery" &&

                        <div>| Vaahak</div>
                    }
                </div>
                {
                    (location.pathname == "/pantry" || location.pathname=="/delivery" || location.pathname.split("/")[1] == "admin") &&

                    <div className="font-bold relative cursor-pointer text-2xl" onClick={() => { setNotifcation(!isShowNotifcation), setIsNotification(!isNotifcation) }}>
                    <div className="h-9 w-9 bg-black flex items-center justify-center rounded-sm relative">
                        <div>🔔</div>
                        {
                            isNotifcation &&
                            <div className="absolute h-4 w-4 rounded-full bg-green-500 top-[-5px] right-[-5px] animate-pulse"></div>
                        }
                    </div>
                    {isShowNotifcation &&
                        <Notification />
                    }
                </div>
                }
            </div>
        </>
    )
}
export default Header;