import { useRef } from "react";
import CTA from "../components/ui/home/CAT";
import Certifications from "../components/ui/home/Certifications";
import CheckupSection from "../components/ui/home/checkup/CheckupSection";
import Features from "../components/ui/home/Features";
import HealthPackages from "../components/ui/home/HealthPackages";
import Hero from "../components/ui/home/Hero";
import OurNetworks from "../components/ui/home/OurNetworks";
import QualityControlBanner from "../components/ui/home/QualityControlBanner";
import Stats from "../components/ui/home/Stats";
import WhyUs from "../components/ui/home/WhyUs";
import { useNavigate } from "react-router-dom";
import { useLocation as useSelectedLocation } from "../Context/LocationContext";
import { useLocation as useRouterLocation } from "react-router-dom";
import { useEffect } from "react";


const Home=()=> {
    const location = useRouterLocation();
    const navigate = useNavigate();
    const healthPackagesRef = useRef(null);

    useEffect(() => {
        if (location.state?.scrollToHealthPackages) {
            scrollToHealthPackages();
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const handletestdetail = (id) => {
        navigate(`/test-detail/${id}`);
    };

    const scrollToHealthPackages = () => {
        healthPackagesRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="bg-white">
            <main>
                <Hero />
                <Certifications />
                <Features />
                <div ref={healthPackagesRef}>
                    <HealthPackages handletestdetail={handletestdetail} />
                </div>
                <QualityControlBanner />
                <div className="from-[#f0fef7] to-white w-full font-sans p-4 sm:p-8 mb-6">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
                        <CheckupSection title="Routine health checkups"/>
                    </div>
                </div>
                <Stats />
                <OurNetworks/>
                <WhyUs />
                <CTA />
            </main>
        </div>
    );
}

export default Home;
