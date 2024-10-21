import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { hitApi } from "../../services/hitApi";

const GoalsDetails = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const { i18n } = useTranslation();
  const language = i18n.language;
  const [goalData, setGoalData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGoalsData = async () => {
    setLoading(true);
    try {
      const response = await hitApi.get("/goal");
      setGoalData(response.data.result);
    } catch (error) {
      console.error("Error fetching carousel items: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoalsData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const toggleDetail = (index) => {
    setActiveIndex(index === activeIndex ? null : index); // Toggle active index
  };

  return (
    <div>
      <div className="w-full h-auto px-4 md:px-8 lg:px-12 py-8">
        <Link
          to="/"
          className="text-blue-500 flex items-center mb-4 hover:underline ml-[120px]"
        >
          <IoIosArrowBack className="mr-1" /> {t("back")}
        </Link>

        <div className="flex flex-row-reverse w-full mt-10 ml-[80px] ">
          <div className="w-[40%]">
            <div className="">
              {goalData.map((item, i) => (
                <div key={i} className="mb-4 ml-6 border-l pl-3">
                  <div>
                    <Link onClick={() => toggleDetail(i)} className="">
                      <h1 className="cursor-pointer text-sm md:text-lg font-medium ">
                        {language === "en" ? item.title.en : item.title.np}{" "}
                      </h1>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {activeIndex !== null && (
            <div className="w-[60%] mr-[50px] flex flex-col">
              <div>
                <h2 className="font-bold text-xl ml-[170px]">
                  {language === "en"
                    ? goalData[activeIndex].title.en
                    : goalData[activeIndex].title.np}
                </h2>
              </div>
              <div className="flex">
                <img
                  src={`http://localhost:8080/${goalData[activeIndex].image}`}
                  alt={
                    language === "en"
                      ? goalData[activeIndex].title.en
                      : goalData[activeIndex].title.np
                  }
                  className="mb-4 w-[20%]"
                />
                <p className="mt-3 w-[60%] ml-5">
                  {language === "en"
                    ? goalData[activeIndex].description.en
                    : goalData[activeIndex].description.np}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalsDetails;
