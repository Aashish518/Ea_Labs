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

    const backendURL = "http://localhost:7000";

    // ✅ Flatten all images into a single array of slide objects
    const slides = images.flatMap((img) => {
        const desktopImages =
            img.desktopScreenMedia
                ?.filter((m) => m.isVisible)
                .map((m) => ({
                    desktopUrl: backendURL + m.url,
                    mobileUrl: null,
                })) || [];

        const mobileImages =
            img.mobileScreenMedia
                ?.filter((m) => m.isVisible)
                .map((m) => ({
                    desktopUrl: null,
                    mobileUrl: backendURL + m.url,
                })) || [];

        // merge both desktop & mobile slides
        return [...desktopImages, ...mobileImages];
    });

    // ✅ Auto slide effect
    useEffect(() => {
        if (slides.length === 0) return;

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);

    const nextSlide = () => {
        if (slides.length === 0) return;
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        if (slides.length === 0) return;
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    };

    if (isLoading)
        return <div className="h-[500px] flex items-center justify-center">Loading...</div>;
    if (isError)
        return (
            <div className="h-[500px] flex items-center justify-center text-red-500">
                Error loading slides
            </div>
        );

    return (
        <section className="
    relative w-full overflow-hidden
    md:aspect-[32/12] 
    lg:aspect-[3940/1400]
    2xl:h-[500px]      
  ">
            <div className="relative max-w-7xl mx-auto h-full">
                {slides.map((slide, index) => (
                    <div key={index}>
                        {/* Desktop */}
                        {slide.desktopUrl && (
                            <img
                                src={slide.desktopUrl}
                                alt={`Slide ${index + 1}`}
                                className={`hidden md:block absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100" : "opacity-0"
                                    }`}
                            />
                        )}

                        {/* Mobile */}
                        {slide.mobileUrl && (
                            <img
                                src={slide.mobileUrl}
                                alt={`Slide ${index + 1}`}
                                className={`block md:hidden absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100" : "opacity-0"
                                    }`}
                            />
                        )}
                    </div>
                ))}

                {/* Prev button */}
                <Button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition duration-300 "
                    aria-label="Previous slide"
                >
                    <Icon path="M15 19l-7-7 7-7" className="w-6 h-6" />
                </Button>

                {/* Next button */}
                <Button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition duration-300"
                    aria-label="Next slide"
                >
                    <Icon path="M9 5l7 7-7 7" className="w-6 h-6" />
                </Button>
            </div>
        </section>
    );
};

export default Hero;
