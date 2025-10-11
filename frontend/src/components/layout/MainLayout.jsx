// MainLayout.jsx
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

const MainLayout = () => {
    return (
        <>
            {/* Navbar */}
            <Header />

            {/* Main content */}
            <Outlet />

            {/* Footer */}
            <Footer />
        </>
    );
};

export default MainLayout;
