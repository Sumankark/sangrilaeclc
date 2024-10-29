import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { hitApi } from "../../services/hitApi";

const OurGoals = () => {
  const { t } = useTranslation();
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

  return (
    <div className="w-full h-auto px-4 md:px-8 lg:px-12 py-8">
      <h1 className="relative text-4xl font-medium text-center mb-7 mt-5 uppercase">
        {t("navbar.goals")}
        <img
          src="./ul.png"
          alt="underline decoration"
          className="w-[200px] mx-auto mt-2"
        />
      </h1>

      <p className="text-[10px] md:text-[12] lg:text-[14px] font-medium text-center mb-8">
        {t("goals.description")}
      </p>

      <h3 className="text-[15px] md:text-[20px] lg:text-[28px] font-medium text-center mb-6">
        {t("goals.title")}
      </h3>

      <div className="flex flex-wrap items-center justify-center px-[40px] lg:px-[150px] gap-3 mb-10">
        {goalData.map((item, i) => (
          <div key={i}>
            <div className="flex flex-col items-center bg-[#DFDFDF] h-[200px] w-[200px] lg:h-[250px] lg:w-[250px] p-6">
              <img
                src={`http://localhost:8080/${item.image}`}
                alt={language === "en" ? item.title.en : item.title.np}
                className="w-20 h-20 object-cover mt-10"
              />
              <h1 className="text-[10px] md:text-[12px] lg:text-[14px] font-semibold mt-5 text-center">
                {language === "en" ? item.title.en : item.title.np}
              </h1>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center">
        <Link
          to={`/goals`}
          className=" pl-3 p-2 text-[14px] w-[130px] flex items-center justify-center mt-2 bg-blue-500 hover:bg-blue-700 text-white rounded"
        >
          {t("more")} <IoIosArrowForward className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default OurGoals;
