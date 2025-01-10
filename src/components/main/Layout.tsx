import { Outlet } from "react-router-dom";
import Header from "../helpers/Header";
import Footer from "../helpers/Footer";
const Layout: React.FC<any> = () => {
    return (
        <>
            <section className="sticky top-0 left-0 bg-[#242424] z-10 customshadow">
                <Header></Header>
            </section>
            <section className="flex w-full flex-col items-center justify-center bg-slate-900">
                <Outlet></Outlet>
            </section>
            <section>
                <Footer></Footer>
            </section>
        </>
    )
}

export default Layout;