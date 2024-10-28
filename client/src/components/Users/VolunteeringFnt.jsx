import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { hitApi } from "../../services/hitApi";

const VolunteeringFnt = () => {
  const [volunteeringItems, setVolunteeringItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const language = i18n.language;
  const fetchvolunteeringItems = async () => {
    setLoading(true);
    try {
      const response = await hitApi.get("/volunteering");
      setVolunteeringItems(response.data.result);
    } catch (error) {
      console.error("Error fetching volunteering items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchvolunteeringItems();
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center py-12 pb-20 bg-white">
      <h1 className="text-4xl font-medium text-center mb-7 mt-5 uppercase">
        {t("volunteering")}
        <img
          src="./ul.png"
          alt="underline decoration"
          className="w-[450px] mx-auto mt-2"
        />
      </h1>
      <div className="flex flex-wrap justify-center gap-8">
        {volunteeringItems.map((item, i) => (
          <div
            key={i}
            className="relative w-[250px] h-[250px] perspective-1000 text-center"
          >
            <div className="flip-card-inner relative w-full h-full transition-transform duration-500 ease-in-out transform-style-3d hover:rotate-y-180">
              {/* Front side of the card */}
              <div className="flip-card-front absolute w-full h-full backface-hidden bg-red-200 rounded-full ">
                <img
                  src={`http://localhost:8080/${item.image}`}
                  alt={language === "en" ? item.title.en : item.title.np}
                  className="h-full w-full object-cover rounded-full shadow-lg"
                />
                <h2 className="absolute rounded-full top-0 left-0 w-full h-full bg-black/25 flex flex-col justify-center items-center text-center text-white font-bold text-[14px] px-4">
                  {language === "en" ? item.title.en : item.title.np}
                </h2>
              </div>
              {/* Back side of the card */}
              <div className="flip-card-back absolute w-full h-full bg-black/25  backface-hidden rotate-y-180 flex flex-col items-center justify-center rounded-full">
                <p className="text-[14px] text-center  p-2">
                  {language === "en"
                    ? item.description.en
                    : item.description.np}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VolunteeringFnt;
