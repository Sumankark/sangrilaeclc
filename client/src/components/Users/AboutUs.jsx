import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { hitApi } from "../../services/hitApi";
import NavBar from "../NavBar";

const AboutUs = () => {
  const [aboutItems, setAboutItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const language = i18n.language;

  const fetchaboutItems = async () => {
    setLoading(true);
    try {
      const response = await hitApi.get("/about");
      setAboutItems(response.data.result);
    } catch (error) {
      console.error("Error fetching about items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchaboutItems();
  }, []);

  return (
    <div className="mt-[100px]">
      <NavBar />
      <div>
        <h1 className="text-4xl text-[#000000] mt-4 mb-4 text-center font-bold">
          {t("navbar.about")}
        </h1>

        {/* Container for all sections */}
        <div className="flex flex-wrap mx-[50px] md:mx-[100px] lg:mx-[200px] mb-[100px]">
          {aboutItems.map((item, index) => (
            <div
              key={index}
              className={`flex rounded-lg shadow-lg bg-gray-100 my-1 p-6 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <div className="w-[30%] ">
                <img
                  src={`http://localhost:8080/${item.image}`}
                  alt={language === "en" ? item.title.en : item.title.np}
                  className="w-full h-[250px] object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4 w-[70%]">
                <h2 className="text-xl font-bold text-center mb-4">
                  {language === "en" ? item.title.en : item.title.np}
                </h2>
                <p className="text-[14px] text-left">
                  {language === "en"
                    ? item.description.en
                    : item.description.np}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
