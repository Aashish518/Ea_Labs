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
import { useLocation } from "react-router-dom";
import { useEffect } from "react";



const mensCheckups = [
    {
        id: 1,
        title: 'Starter Wellness',
        ageRange: 'Under 30 yrs',
        imageUrl: 'https://placehold.co/400x400/f87171/ffffff?text=Man+1',
        gradient: 'from-orange-500 to-red-600',
    },
    {
        id: 2,
        title: 'Active Life Check',
        ageRange: '30-45 yrs',
        imageUrl: 'https://placehold.co/400x400/c084fc/ffffff?text=Man+2',
        gradient: 'from-fuchsia-500 to-purple-600',
    },
    {
        id: 3,
        title: 'Advanced Risk Screen',
        ageRange: '45-60 yrs',
        imageUrl: 'https://placehold.co/400x400/67e8f9/ffffff?text=Man+3',
        gradient: 'from-cyan-400 to-teal-500',
    },
];

const womensCheckups = [
    {
        id: 1,
        title: 'Energy & Immunity',
        ageRange: 'Under 30 yrs',
        imageUrl: 'https://placehold.co/400x400/a3e635/ffffff?text=Woman+1',
        gradient: 'from-lime-400 to-green-500',
    },
    {
        id: 2,
        title: 'Hormone & Metabolic Balance',
        ageRange: '30-45 yrs',
        imageUrl: 'https://placehold.co/400x400/a78bfa/ffffff?text=Woman+2',
        gradient: 'from-violet-400 to-indigo-500',
    },
    {
        id: 3,
        title: 'Midlife Health Check',
        ageRange: '45-60 yrs',
        imageUrl: 'https://placehold.co/400x400/fcd34d/ffffff?text=Woman+3',
        gradient: 'from-amber-400 to-orange-500',
    },
];
export default function Home() {
    const location = useLocation();
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

    // Add an optional scroll function
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
                        <CheckupSection title="Routine health checkups for men" checkups={mensCheckups} />
                        <CheckupSection title="Routine health checkups for women" checkups={womensCheckups} />
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
