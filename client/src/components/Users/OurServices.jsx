import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { hitApi } from "../../services/hitApi";

const OurServices = () => {
  const [serviceItems, setServiceItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const fetchServiceItems = async () => {
    setLoading(true);
    try {
      const response = await hitApi.get("/service");
      setServiceItems(response.data.result);
    } catch (error) {
      console.error("Error fetching service items:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(serviceItems);
  useEffect(() => {
    fetchServiceItems();
  }, []);

  return (
    <div className="w-full flex flex-col items-center bg-white py-12 border-2">
      <h1 className="text-4xl font-medium text-center mb-7 mt-5 uppercase">
        {t("navbar.services")}
        <img
          src="./ul.png"
          alt="underline decoration"
          className="w-[250px] mx-auto mt-2"
        />
      </h1>

      {loading ? (
        <p>{t("loading")}</p>
      ) : (
        <div className="flex flex-wrap mx-[20px] justify-center gap-8 my-[50px]">
          {serviceItems.map((item, index) => {
            const id = item._id;
            const title = language === "en" ? item.title.en : item.title.np;
            const description =
              language === "en" ? item.description.en : item.description.np;
            return (
              <div
                key={index}
                className="relative flex flex-col sm:flex-row w-full sm:w-[478px] gap-4 rounded-lg overflow-hidden"
              >
                <div className="h-[242px] w-[242px] relative z-10 mb-[30px]">
                  <img
                    src={`http://localhost:8080/${item.image}`}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center p-4 h-[242px] w-[371px] bg-blue-200 relative z-0 sm:ml-[-100px] mt-[30px]">
                  <h2 className="ml-[110px] text-[14px] font-semibold">
                    {title}
                  </h2>
                  <p className="ml-[110px] text-[12px] p-[5px]">
                    {description}
                  </p>
                  <Link
                    to={`/services/${id}`}
                    state={{ service: item }}
                    className="ml-[110px] text-[14px] flex items-center mt-2 text-blue-500 hover:underline"
                  >
                    {t("more")} <IoIosArrowForward className="ml-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OurServices;
