import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { hitApi } from "../../services/hitApi";
import Splide from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const OurGallery = () => {
  const [loading, setLoading] = useState(false);
  const [galleryImage, setGalleryImage] = useState([]);
  const splideRef = useRef(null);
  const { t } = useTranslation();

  const fetchGalleryImage = async () => {
    setLoading(true);
    try {
      const response = await hitApi.get("/gallery");
      setGalleryImage(response.data.result);
    } catch (error) {
      console.error("Error fetching gallery items: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryImage();
  }, []);

  useEffect(() => {
    if (galleryImage.length > 0) {
      const splide = new Splide(".splide", {
        type: "loop",
        perPage: 4, // Display 4 images at a time
        perMove: 1, // Move 1 slide at a time
        gap: "1rem", // Space between images
        pagination: false, // Disable pagination
        arrows: false, // Disable arrows
        autoScroll: {
          speed: 1, // Auto-scroll speed (adjust as needed)
          pauseOnHover: true, // Pause auto-scroll on hover
          pauseOnFocus: false, // Don't pause when focused
          rewind: true, // Rewind to start when at the end
        },
        breakpoints: {
          1024: {
            perPage: 3, // Show 3 images on tablet
          },
          600: {
            perPage: 1, // Show 1 image on mobile screens
          },
        },
      });

      splide.mount({ AutoScroll });
      splideRef.current = splide; // Store splide instance in ref

      return () => splide.destroy(); // Cleanup Splide instance on unmount
    }
  }, [galleryImage]);

  return (
    <div className="py-12 mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-medium text-center mt-5 uppercase">
          {t("gallery")}
        </h1>
        <img
          src="./ul.png"
          alt="underline decoration"
          className="w-[250px] mx-auto mt-2"
        />
      </div>

      <div className={`px-10 ${loading ? "hidden" : ""}`}>
        <div className="relative overflow-hidden px-4 sm:px-20">
          <div className="splide">
            <button
              onClick={() => splideRef.current.go("<")}
              className="absolute left-0 z-10 bg-gray-700 opacity-75 text-white p-3 rounded-full transform -translate-y-1/2 top-1/2 hover:bg-gray-800 transition duration-300 ease-in-out"
            >
              <FaAngleLeft />
            </button>

            <div className="splide__track">
              <ul className="splide__list flex">
                {galleryImage.map((resource, index) => (
                  <li
                    key={index}
                    className="splide__slide"
                    style={{ minWidth: "250px" }}
                  >
                    <a
                      href={`http://localhost:8080/${resource.image}`}
                      className="block w-full h-full bg-cover bg-center transition-transform duration-300 ease-in-out transform hover:scale-105"
                      style={{
                        backgroundImage: `url(http://localhost:8080/${resource.image})`,
                        height: "300px",
                        borderRadius: "12px",
                      }}
                    >
                      <img
                        src={`http://localhost:8080/${resource.image}`}
                        alt={resource.title}
                        className="hidden"
                        loading="lazy"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => splideRef.current.go(">")}
              className="absolute right-0 z-10 bg-gray-700 opacity-75 text-white p-3 rounded-full transform -translate-y-1/2 top-1/2 hover:bg-gray-800 transition duration-300 ease-in-out"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurGallery;
