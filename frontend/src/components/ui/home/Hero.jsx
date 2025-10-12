import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Icon from "../../Icon";
import Button from "../common/Button";
import { getImages } from "../../../api/apis/sliderimageapi";

const Hero = () => {
    const [current, setCurrent] = useState(0);

    const { data: images = [], isLoading, isError } = useQuery({
        queryKey: ["slides"],
        queryFn: getImages,
    });

    // Prepend backend URL to relative paths
    const backendURL = "http://localhost:7000";

    const slides = images.map((img) => {
        const desktop = img.desktopScreenMedia
            ?.filter(m => m.isVisible)
            .map(m => ({ ...m, url: backendURL + m.url })) || [];
        const mobile = img.mobileScreenMedia
            ?.filter(m => m.isVisible)
            .map(m => ({ ...m, url: backendURL + m.url })) || [];
        return { desktop, mobile };
    }).filter(slide => slide.desktop.length > 0 || slide.mobile.length > 0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const nextSlide = () => setCurrent(prev => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent(prev => (prev - 1 + slides.length) % slides.length);

    if (isLoading) return <div className="h-[500px] flex items-center justify-center">Loading...</div>;
    if (isError) return <div className="h-[500px] flex items-center justify-center text-red-500">Error loading slides</div>;

    return (
        <section className="relative h-[500px] sm:h-[450px] md:h-[500px] overflow-hidden">
            <div className="relative max-w-7xl mx-auto h-full">
                {slides.map((slide, index) => (
                    <div key={index}>
                        {slide.desktop.length > 0 && (
                            <img
                                src={slide.desktop[0].url}
                                alt={`Background ${index + 1}`}
                                className={`hidden md:block absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100" : "opacity-0"}`}
                            />
                        )}
                        {slide.mobile.length > 0 && (
                            <img
                                src={slide.mobile[0].url}
                                alt={`Background Mobile ${index + 1}`}
                                className={`block md:hidden absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100" : "opacity-0"}`}
                            />
                        )}
                    </div>
                ))}

                <Button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition duration-300 backdrop-blur-sm"
                    aria-label="Previous slide"
                >
                    <Icon path="M15 19l-7-7 7-7" className="w-6 h-6" />
                </Button>

                <Button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition duration-300 backdrop-blur-sm"
                    aria-label="Next slide"
                >
                    <Icon path="M9 5l7 7-7 7" className="w-6 h-6" />
                </Button>
            </div>
        </section>
    );
};

export default Hero;
