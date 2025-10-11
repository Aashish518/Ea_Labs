import { useState, useEffect } from "react";
import Icon from "../../Icon";

const Hero = () => {
    const [current, setCurrent] = useState(0);

    const slides = [
        { bgImage: "https://placehold.co/1600x800/0D9488/FFFFFF?text=Abstract+Background+1" },
        { bgImage: "https://placehold.co/1600x800/0F766E/FFFFFF?text=Abstract+Background+2" },
        { bgImage: "https://placehold.co/1600x800/047857/FFFFFF?text=Abstract+Background+3" },
    ];

    // Auto-slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <section className="relative h-[500px] sm:h-[450px] md:h-[500px] overflow-hidden">
            <div className="relative max-w-7xl mx-auto h-full">
                {/* Slides */}
                {slides.map((slide, index) => (
                    <img
                        key={index}
                        src={slide.bgImage}
                        alt={`Background ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100" : "opacity-0"
                            }`}
                    />
                ))}

                {/* Buttons inside container */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition duration-300 backdrop-blur-sm"
                    aria-label="Previous slide"
                >
                    <Icon path="M15 19l-7-7 7-7" className="w-6 h-6" />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full transition duration-300 backdrop-blur-sm"
                    aria-label="Next slide"
                >
                    <Icon path="M9 5l7 7-7 7" className="w-6 h-6" />
                </button>
            </div>
        </section>
    );
};

export default Hero;
