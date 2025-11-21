import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import FloatingMenu from "../FloatingMenu"; 
import WhatsAppButton from "../WhatsAppButton";

const MainLayout = () => {
    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50">
                <Header />
            </div>

            <div className="pt-[120px]">
                <Outlet />
            </div>

            <FloatingMenu />
            <WhatsAppButton />

            <Footer />
        </>
    );
};

export default MainLayout;
