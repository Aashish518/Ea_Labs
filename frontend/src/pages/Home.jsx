import { useRef, useState, useEffect } from "react";
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
import { useLocation as useRouterLocation } from "react-router-dom";

const Home = () => {
    const [hasHealthMatch, setHasHealthMatch] = useState(false);
    const [hasCheckupMatch, setHasCheckupMatch] = useState(false);

    const location = useRouterLocation();
    const navigate = useNavigate();

    const healthPackagesRef = useRef(null);
    const checkupRef = useRef(null);

    useEffect(() => {
        // ✅ Scroll when coming from another page with state
        if (location.state?.scrollToHealthPackages) {
            healthPackagesRef.current?.scrollIntoView({ behavior: "smooth" });
            window.history.replaceState({}, document.title);
        }
        if (location.state?.scrollToCheckupSection) {
            checkupRef.current?.scrollIntoView({ behavior: "smooth" });
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    useEffect(() => {
        // ✅ Scroll to HealthPackages only when a search match is found
        if (hasHealthMatch) {
            healthPackagesRef.current?.scrollIntoView({ behavior: "smooth" });
            setHasHealthMatch(false);
        }
    }, [hasHealthMatch]);

    useEffect(() => {
        // ✅ Scroll to CheckupSection only when a search match is found
        if (hasCheckupMatch) {
            checkupRef.current?.scrollIntoView({ behavior: "smooth" });
            setHasCheckupMatch(false);
        }
    }, [hasCheckupMatch]);

    const handletestdetail = (id) => {
        navigate(`/test-detail/${id}`);
    };

    return (
        <div className="bg-white">
            <Hero />
            <Certifications />
            <Features />

            {/* ✅ Health Packages Section */}
            <div ref={healthPackagesRef}>
                <HealthPackages
                    handletestdetail={handletestdetail}
                    matchdata={setHasHealthMatch}
                />
            </div>

            <QualityControlBanner />

            {/* ✅ Checkup Section */}
            <div className="from-[#f0fef7] to-white w-full font-sans p-4 sm:p-8 mb-6">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
                    <div ref={checkupRef}>
                        <CheckupSection
                            title="Routine health checkups"
                            matchdata={setHasCheckupMatch}
                        />
                    </div>
                </div>
            </div>

            <Stats />
            <OurNetworks />
            <WhyUs />
            <CTA />
        </div>
    );
};

export default Home;
