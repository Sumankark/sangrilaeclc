import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { hitApi } from "../services/hitApi";
import { useTranslation } from "react-i18next";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import OurGoals from "../components/Users/OurGoals";
import OurGallery from "../components/Users/OurGallery";

const Main = () => {
  const [carouselData, setCarouselData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { i18n } = useTranslation();
  const language = i18n.language;

  const fetchCarouselData = async () => {
    setLoading(true);
    try {
      const response = await hitApi.get("/carousel");
      setCarouselData(response.data.result);
    } catch (error) {
      console.error("Error fetching carousel items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarouselData();
  }, []);

  const totalSlides = carouselData.length;

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Slide changes every 7 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index % totalSlides); // Ensure index is within bounds
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar />
      <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
        {/* Parallax images */}
        <div className="static">
          {carouselData.map((item, i) => (
            <div
              key={i}
              className="absolute w-full h-full transition-transform duration-1000 ease-in-out"
              style={{
                transform: `translateX(${100 * (i - currentSlide)}%)`,
                backgroundImage: `url(${
                  typeof item.image === "string"
                    ? `http://localhost:8080/${item.image}`
                    : URL.createObjectURL(item.image)
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              aria-hidden={i !== currentSlide}
            >
              {/* Content on top of the image */}
              <div className="pt-10 absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col justify-center items-center text-center text-white px-4">
                <h2 className="text-xl md:text-3xl lg:text-5xl font-bold">
                  {language === "en" ? item.title.en : item.title.np}
                </h2>
                <p className="text-sm md:text-lg lg:text-xl mt-2">
                  {language === "en"
                    ? item.description.en
                    : item.description.np}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel controls */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-gray-500/25 p-2 rounded-full"
        >
          <IoIosArrowBack />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-gray-500/25 p-2 rounded-full"
        >
          <IoIosArrowForward />
        </button>

        {/* Slider Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {carouselData.map((_, index) => (
            <div
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full cursor-pointer ${
                index === currentSlide ? "bg-white" : "bg-gray-400"
              }`}
              aria-label={`Slide ${index + 1}`}
            ></div>
          ))}
        </div>
      </div>

      <div id="our-goals" className="shadow">
        <OurGoals />
      </div>

      <div className="bg-gray-100">
        <OurGallery />
      </div>
    </div>
  );
};

export default Main;
