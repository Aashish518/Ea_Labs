import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Icon from "../../Icon";
import Button from "../common/Button";
import { getImages } from "../../../api/apis/sliderimageapi";

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const { data: images = [], isLoading, isError } = useQuery({
    queryKey: ["slides"],
    queryFn: getImages,
  });

  const backendURL = import.meta.env.VITE_BACK_URL;

  // ✅ Separate desktop and mobile slides
  const desktopSlides = images.flatMap((img) => 
    img.desktopScreenMedia
      ?.filter((m) => m.isVisible)
      .map((m) => backendURL + m.url) || []
  );

  const mobileSlides = images.flatMap((img) => 
    img.mobileScreenMedia
      ?.filter((m) => m.isVisible)
      .map((m) => backendURL + m.url) || []
  );

  // ✅ Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ✅ Get current slides based on screen size
  const currentSlides = isMobile ? mobileSlides : desktopSlides;

  // ✅ Reset current index when switching between mobile/desktop
  useEffect(() => {
    setCurrent(0);
  }, [isMobile]);

  // ✅ Single Auto Slide Effect
  useEffect(() => {
    if (currentSlides.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % currentSlides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentSlides.length]);

  const nextSlide = () => {
    if (currentSlides.length === 0) return;
    setCurrent((prev) => (prev + 1) % currentSlides.length);
  };

  const prevSlide = () => {
    if (currentSlides.length === 0) return;
    setCurrent((prev) => (prev - 1 + currentSlides.length) % currentSlides.length);
  };

  if (isLoading)
    return (
      <div className="h-[500px] flex items-center justify-center">
        Loading...
      </div>
    );

  if (isError)
    return (
      <div className="h-[500px] flex items-center justify-center text-red-500">
        Error loading slides
      </div>
    );


  return (
    <section
      className="
      relative w-full overflow-hidden
      h-[400px]
      md:h-auto
      md:aspect-[32/12]
      lg:aspect-[3940/1400]
    "
    >
      <div className="relative w-full mx-auto h-full overflow-hidden">
        {/* ✅ Render current and next slides for smooth transition */}
        {currentSlides.length > 0 && currentSlides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt={`Slide ${index + 1}`}
            className="absolute inset-0 w-full h-full transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(${(index - current) * 100}%)`
            }}
          />
        ))}

        {/* Prev button */}
        {currentSlides.length > 1 && (
          <Button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 md:p-3 rounded-full transition duration-300 z-10"
            aria-label="Previous slide"
          >
            <Icon path="M15 19l-7-7 7-7" className="w-4 h-4 md:w-6 md:h-6" />
          </Button>
        )}

        {/* Next button */}
        {currentSlides.length > 1 && (
          <Button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 md:p-3 rounded-full transition duration-300 z-10"
            aria-label="Next slide"
          >
            <Icon path="M9 5l7 7-7 7" className="w-4 h-4 md:w-6 md:h-6" />
          </Button>
        )}

        {/* Slide indicators */}
        {currentSlides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {currentSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  current === index ? 'bg-white w-6' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;