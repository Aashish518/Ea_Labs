import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import FloatingMenu from "../FloatingMenu"; 
import WhatsAppButton from "../WhatsAppButton";

const MainLayout = () => {
    const [showFloating, setShowFloating] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const footer = document.querySelector('footer');
            if (footer) {
                const footerRect = footer.getBoundingClientRect();
                const isFooterVisible = footerRect.top < window.innerHeight;
                setShowFloating(!isFooterVisible);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initially
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-50">
                <Header />
            </div>

            <div className="pt-[120px] min-h-screen">
                <Outlet />
            </div>

            {showFloating && (
                <>
                    <FloatingMenu />
                    <WhatsAppButton />
                </>
            )}

            <Footer />
        </>
    );
};

export default MainLayout;