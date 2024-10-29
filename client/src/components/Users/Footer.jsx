import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { hitApi } from "../../services/hitApi";

const Footer = () => {
  const [aboutList, setAboutList] = useState([]);
  const [addressList, setAddressList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const language = i18n.language;

  const aboutData = aboutList[0];

  useEffect(() => {
    fetchShortAbout();
    fetchAddress();
    fetchContact();
  }, []);

  const contactData = contactList[0];
  const fetchContact = async () => {
    setLoading(true);
    try {
      const response = await hitApi.get("/contact");
      setContactList(response.data.result);
    } catch (error) {
      console.error("Error fetching data.", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAddress = async () => {
    setLoading(true);
    try {
      const response = await hitApi.get("/address");
      setAddressList(response.data.result);
    } catch (error) {
      console.error("Error fetching data.", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchShortAbout = async () => {
    setLoading(true);
    try {
      const response = await hitApi.get("/short-about");
      setAboutList(response.data.result);
    } catch (error) {
      console.error("Error fetching data.", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#EEEEEE]">
      <div className="grid grid-cols-3 py-[30px] lg:p-[50px] ">
        <div className="lg:mx-[50px] px-[20px]">
          <h1 className="font-bold underline text-[20px] md:text-[25px] lg:text-[32px]">
            {t("navbar.about")}
          </h1>
          <p className="text-[10px] md:text-[12px] lg:text-[14px] ">
            {aboutData && aboutData.description
              ? language === "en"
                ? aboutData.description.en
                : aboutData.description.np
              : ""}
          </p>
        </div>
        <div className="lg:mx-[50px] px-[20px]">
          <h1 className="font-bold underline  text-[20px] md:text-[25px] lg:text-[32px]">
            {t("address")}
          </h1>
          <p className="text-[10px] md:text-[12px] lg:text-[14px]">
            {addressList.map((item, i) => (
              <div key={i}>
                {language === "en" ? item.address.en : item.address.np}
              </div>
            ))}
          </p>
        </div>
        <div className="lg:mx-[50px] px-[20px]">
          <h1 className="font-bold underline text-[20px] md:text-[25px] lg:text-[32px]">
            {t("contact-detail")}
          </h1>
          <p className="text-[10px] md:text-[12px] lg:text-[14px]">
            PhoneNumeber:{" "}
            {contactData && contactData.phoneNumber
              ? language === "en"
                ? contactData.phoneNumber.en
                : contactData.phoneNumber.np
              : ""}
            <br />
            Email: {contactData && contactData.email ? contactData.email : ""}
          </p>
        </div>
      </div>
      <img
        src="/logo.png"
        alt="logo"
        className="h-10 md:h-[13px] lg:h-16 p-2 ml-[100px]"
      />{" "}
    </div>
  );
};

export default Footer;
