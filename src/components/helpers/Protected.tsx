import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, useLocation } from "react-router-dom";

const Protected: React.FC<{ element: JSX.Element }> = ({ element }) => {
    const location = useLocation();
    const [cookies,,RemoveCookie] = useCookies(["jwt"]);
    

    if (!cookies.jwt) {
        console.log("No JWT cookie found, redirecting...");
        return <Navigate to="/login" replace />;
    } else {
        const user = window.localStorage.getItem("User");
        const pathname = location.pathname;
        
        if(pathname.split("/")[1] === "admin" && user === "Admin"){
            return element;
        }else if(pathname.split("/")[1] === "delivery" && user === "Delivery"){
            return element;
        }else if(pathname.split("/")[1] === "pantry" && user === "Pantry"){
            return element;
        }else{
            RemoveCookie("jwt", { path: "/" })
            return <Navigate to="/login" replace></Navigate>
        }
    }
};

export default Protected;
