import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { MdOutlineContactMail } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { FaMapLocationDot } from "react-icons/fa6";
import NavBar from "../NavBar";
import { hitApi } from "../../services/hitApi";

const ContactUs = () => {
  const { t } = useTranslation();

  const [aboutList, setAboutList] = useState([]);
  const [addressList, setAddressList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [iframeList, setIframeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { i18n } = useTranslation();
  const language = i18n.language;
  const aboutData = aboutList[0];

  useEffect(() => {
    fetchShortAbout();
    fetchAddress();
    fetchContact();
    fetchIframe();
  }, []);

  const iframeUrl = iframeList[0];

  const fetchIframe = async () => {
    setLoading(true);
    try {
      const response = await hitApi.get("/iframe");
      setIframeList(response.data.result);
    } catch (error) {
      console.error("Error fetching data.", error);
    } finally {
      setLoading(false);
    }
  };

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

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    number: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_g01hz3c",
        "template_fgulsk2",
        {
          ...formData,
          from_email: formData.email,
        },
        "nDE9j-VKZrW-mAstR"
      )
      .then(
        (response) => {
          console.log(
            "Email sent successfully!",
            response.status,
            response.text
          );
          setFormData({
            name: "",
            address: "",
            email: "",
            number: "",
            message: "",
          });
          toast.success(t("contact.success"), {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            transition: Zoom,
          });
        },
        (error) => {
          console.error("Failed to send email. Error:", error);
          toast.error(t("contact.error"), {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            transition: Zoom,
          });
        }
      );
  };

  return (
    <div>
      <NavBar />
      <section className="mt-[40px]">
        <ToastContainer />
        <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto p-6 boarder-b ">
          <div className="flex-1 item-center mb-6 md:mb-0 md:mr-6 p-6 border-r mt-10">
            <form
              className="flex flex-col items-center gap-5"
              onSubmit={handleSubmit}
            >
              {/* Name Field */}
              <div className="relative w-full max-w-sm flex items-center">
                <div className="absolute right-0 mr-1 border-l bg-gray-100 p-2 pr-3 pl-3 py-3 rounded">
                  <FaUser />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  aria-label={t("name")}
                />
                <label
                  htmlFor="name"
                  className={`absolute cursor-text bg-white px-1  ${
                    formData.name
                      ? "-top-2 left-2.5 text-xs text-slate-400 scale-90"
                      : "left-2.5 top-2.5 text-slate-400 text-sm transition-all"
                  }  transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90`}
                >
                  {t("name")}
                </label>
              </div>

              {/* Address Field */}
              <div className="relative w-full max-w-sm flex items-center">
                <div className="absolute right-0 mr-1 border-l bg-gray-100 p-2 pr-3 pl-3 py-3 rounded">
                  <IoLocation />
                </div>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  aria-label={t("addres")}
                />
                <label
                  htmlFor="name"
                  className={`absolute cursor-text bg-white px-1  ${
                    formData.address
                      ? "-top-2 left-2.5 text-xs text-slate-400 scale-90"
                      : "left-2.5 top-2.5 text-slate-400 text-sm transition-all"
                  }  transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90`}
                >
                  {t("addres")}
                </label>
              </div>

              {/* Email Field */}
              <div className="relative w-full max-w-sm flex items-center">
                <div className="absolute right-0 mr-1 border-l bg-gray-100 p-2 pr-3 pl-3 py-3 rounded">
                  <MdEmail />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  aria-label={t("email")}
                />
                <label
                  htmlFor="email"
                  className={`absolute cursor-text bg-white px-1  ${
                    formData.email
                      ? "-top-2 left-2.5 text-xs text-slate-400 scale-90"
                      : "left-2.5 top-2.5 text-slate-400 text-sm transition-all"
                  }  transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90`}
                >
                  {t("email")}
                </label>
              </div>

              {/* Phone Number Field */}
              <div className="relative w-full max-w-sm flex items-center">
                <div className="absolute right-0 mr-1 border-l bg-gray-100 p-2 pr-3 pl-3 py-3 rounded">
                  <FaPhoneAlt />
                </div>

                <input
                  type="text"
                  name="number"
                  required
                  value={formData.number}
                  onChange={handleChange}
                  maxLength={10}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  aria-label={t("phone")}
                />
                <label
                  htmlFor="number"
                  className={`absolute cursor-text bg-white px-1  ${
                    formData.number
                      ? "-top-2 left-2.5 text-xs text-slate-400 scale-90"
                      : "left-2.5 top-2.5 text-slate-400 text-sm transition-all"
                  }  transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90`}
                >
                  {t("phone")}
                </label>
              </div>

              {/* Message Field */}
              <div className="relative w-full max-w-sm">
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  aria-label={t("message")}
                />
                <label
                  htmlFor="message"
                  className={`absolute cursor-text bg-white px-1  ${
                    formData.message
                      ? "-top-2 left-2.5 text-xs text-slate-400 scale-90"
                      : "left-2.5 top-2.5 text-slate-400 text-sm transition-all"
                  }  transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90`}
                >
                  {t("message")}
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-3 rounded-lg w-full hover:bg-blue-600 transition duration-200"
                >
                  {t("send")}
                </button>
              </div>
            </form>
          </div>

          {/* Address Section */}
          <div className="flex-1 item-center mb-6 md:mb-0 md:ml-6 p-6">
            <div className="shadow-lg flex flex-col items-center p-6 rounded mb-2">
              <div className="text-[50px] bg-white p-2 rounded-full shadow-md">
                <MdEmail />
              </div>
              <div className="mt-2">
                {" "}
                {contactData && contactData.email ? contactData.email : ""}{" "}
              </div>
            </div>

            <div className="shadow-lg flex flex-col items-center p-6 rounded mb-2">
              <div className="text-[50px] bg-white p-2 rounded-full shadow-lg">
                <MdOutlineContactMail />
              </div>
              <div className="mt-2">
                {" "}
                {contactData && contactData.phoneNumber
                  ? language === "en"
                    ? contactData.phoneNumber.en
                    : contactData.phoneNumber.np
                  : ""}{" "}
              </div>
            </div>
            <div className="shadow-lg flex flex-col items-center p-6 rounded">
              <div className="text-[50px] bg-white p-2 rounded-full shadow-lg">
                <FaMapLocationDot />
              </div>
              {addressList.map((item, i) => (
                <div key={i}>
                  {language === "en" ? item.address.en : item.address.np}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="m-6 mx-10 border-t pt-3">
          <iframe
            src={iframeUrl && iframeUrl.url ? iframeUrl.url : ""}
            className="w-full h-[300px] border-2 rounded-lg"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
