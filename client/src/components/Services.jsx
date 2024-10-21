import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { hitApi } from "../services/hitApi";

const Services = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;

  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serviceData, setServiceData] = useState({
    image: null,
    titleEn: "",
    titleNp: "",
    descriptionEn: "",
    descriptionNp: "",
    detailEn: "",
    detailNp: "",
  });

  const editorConfig = {
    toolbar: [
      "undo",
      "redo",
      "|",
      "heading",
      "|",
      "bold",
      "italic",
      "|",
      "link",
      "insertImage",
      "|",
      "bulletedList",
      "numberedList",
    ],
    image: {
      toolbar: [
        "toggleImageCaption",
        "imageTextAlternative",
        "|",
        "resizeImage",
      ],
    },
  };

  // Modal Control
  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    resetServiceData();
  };

  // Reset service data state
  const resetServiceData = () => {
    setServiceData({
      image: null,
      titleEn: "",
      titleNp: "",
      descriptionEn: "",
      descriptionNp: "",
      detailEn: "",
      detailNp: "",
    });
  };

  // File Change Handler
  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      if (
        file &&
        (file.type === "image/jpg" ||
          file.type === "image/jpeg" ||
          file.type === "image/png")
      ) {
        setServiceData((prevData) => ({
          ...prevData,
          image: file,
        }));
      } else {
        alert("Only JPEG or PNG images are allowed.");
      }
    }
  };

  // Input Change Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceData({ ...serviceData, [name]: value });
  };

  // CKEditor Change Handler
  const handleCKEditorChange = (event, editor) => {
    const data = editor.getData();
    setServiceData((prevData) => ({
      ...prevData,
      [language === "en" ? "detailEn" : "detailNp"]: data,
    }));
  };

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", serviceData.image);
      formData.append("titleEn", serviceData.titleEn);
      formData.append("titleNp", serviceData.titleNp);
      formData.append("descriptionEn", serviceData.descriptionEn);
      formData.append("descriptionNp", serviceData.descriptionNp);
      formData.append("detailEn", serviceData.detailEn);
      formData.append("detailNp", serviceData.detailNp);

      console.log(serviceData);

      await hitApi.post("/service", formData);

      // Update services state with the new service
      setServices((prevServices) => [
        ...prevServices,
        {
          ...serviceData,
          image: URL.createObjectURL(serviceData.image), // Temporary image preview
        },
      ]);

      closeModal();
    } catch (error) {
      console.error("Error adding service:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mt-5">
        <strong className="text-gray-700 font-bold text-xl">Services</strong>
      </div>

      <div className="bg-white px-4 pt-3 pb-4 rounded-md border border-gray-200 shadow-md flex-1 mt-5">
        <div className="flex">
          <button
            className="border p-2 font-medium flex gap-2 rounded-md hover:bg-gray-200 bg-gray-100 shadow-sm transition-all ease-in-out duration-300"
            onClick={openModal}
          >
            <IoIosAddCircle className="mt-1" />
            Add Services
          </button>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-gray-700 border-collapse border border-slate-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-slate-300 px-4 py-2 text-left text-sm text-gray-600">
                  S.N
                </th>
                <th className="border border-slate-300 px-4 py-2 text-left text-sm text-gray-600">
                  Image
                </th>
                <th className="border border-slate-300 px-4 py-2 text-left text-sm text-gray-600">
                  Title
                </th>
                <th className="border border-slate-300 px-4 py-2 text-center text-sm text-gray-600">
                  Description
                </th>
                <th className="border border-slate-300 px-4 py-2 text-center text-sm text-gray-600">
                  Details
                </th>
                <th className="border border-slate-300 px-4 py-2 text-center text-sm text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {services.map((item, i) => (
                <tr
                  key={i}
                  className="hover:bg-gray-50 transition-colors ease-in-out duration-300"
                >
                  <td className="border border-slate-300 px-4 py-2 text-sm font-medium">
                    {i + 1}
                  </td>
                  <td className="border border-slate-300 px-4 py-2 text-sm font-medium">
                    <img
                      src={item.image}
                      alt="Service"
                      className="w-12 h-12 object-cover"
                    />
                  </td>
                  <td className="border border-slate-300 px-4 py-2 text-sm font-medium">
                    {language === "en" ? item.titleEn : item.titleNp}
                  </td>
                  <td className="border border-slate-300 px-4 py-2 text-sm">
                    {language === "en"
                      ? item.descriptionEn
                      : item.descriptionNp}
                  </td>
                  <td className="border border-slate-300 px-4 py-2 text-sm">
                    {language === "en" ? item.detailEn : item.detailNp}
                  </td>
                  <td className="border border-slate-300 px-4 py-2 text-sm flex justify-center gap-4">
                    <button
                      className="p-2 text-red-600 hover:text-red-800 transition-colors ease-in-out duration-300"
                      title="Delete Service"
                    >
                      <MdDeleteForever />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-gray-600 bg-opacity-50"
            onClick={closeModal}
          ></div>
          <div
            className="bg-white p-6 rounded-md shadow-md z-10 max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 flex justify-center">
              Add Service
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="w-full border px-3 py-2 rounded-md"
                  accept="image/jpeg, image/png"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium">
                  {language === "en" ? "Title (English)" : "Title (Nepali)"}
                </label>
                <input
                  type="text"
                  name={language === "en" ? "titleEn" : "titleNp"}
                  value={
                    language === "en"
                      ? serviceData.titleEn
                      : serviceData.titleNp
                  }
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-md font-normal"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium">
                  {language === "en"
                    ? "Description (English)"
                    : "Description (Nepali)"}
                </label>
                <input
                  type="text"
                  name={language === "en" ? "descriptionEn" : "descriptionNp"}
                  value={
                    language === "en"
                      ? serviceData.descriptionEn
                      : serviceData.descriptionNp
                  }
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-md font-normal"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-medium">
                  {language === "en" ? "Details (English)" : "Details (Nepali)"}
                </label>
                <div className="h-72 overflow-y-auto">
                  <CKEditor
                    editor={ClassicEditor}
                    data={
                      language === "en"
                        ? serviceData.detailEn
                        : serviceData.detailNp
                    }
                    config={editorConfig}
                    onChange={handleCKEditorChange}
                    className="border rounded-md"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="mr-2 p-2 bg-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="p-2 bg-blue-600 text-white rounded-md"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Add Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
