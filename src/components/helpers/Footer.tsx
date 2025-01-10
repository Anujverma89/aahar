import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg"
import { useCookies } from "react-cookie";

const Footer: React.FC = () => {
    const [cookie,, RemoveCookie] = useCookies(['jwt']);
    function logout(){
        RemoveCookie("jwt", { path: "/" })
        window.location.reload();
    }
    return (
        <>
            <div className="flex bg-black py-4 w-full justify-evenly items-center flex-wrap flex-row">
                <div>
                    <Link to="/"><img src={logo} alt="Aahar Logo"></img></Link>
                </div>
                <div className="grid grid-cols-2 gap-5">
                    {
                        !cookie.jwt &&
                        <Link to="login">Login</Link>
                    }
                    {
                        cookie.jwt &&
                        <div onClick={logout} className="text-white text-md font-bold cursor-pointer">Logout</div>
                    }
                    <Link to="admin">Admin</Link>
                    <Link to="delivery">Vaahak</Link>
                    <Link to="pantry">Pantry</Link>
                    <Link to="adminonetwothreefour">-------</Link>
                </div>
            </div>
        </>
    )
}

export default Footer;