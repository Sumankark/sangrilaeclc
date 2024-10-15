import React, { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { hitApi } from "../services/hitApi";
import { Slide, toast, ToastContainer } from "react-toastify";

const Carousel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [carouselData, setCarouselData] = useState({
    image: null,
    titleEn: "",
    titleNp: "",
    descriptionEn: "",
    descriptionNp: "",
  });
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItemId, setEditingItemId] = useState("");
  const { i18n } = useTranslation();
  const language = i18n.language;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCarouselData({
      image: null,
      titleEn: "",
      titleNp: "",
      descriptionEn: "",
      descriptionNp: "",
    });
    setIsEditing(false);
    setEditingItemId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarouselData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      const file = files[0];
      if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
        setCarouselData((prevData) => ({
          ...prevData,
          image: file,
        }));
      } else {
        alert("Only JPEG or PNG images are allowed.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("image", carouselData.image);
    formData.append("titleEn", carouselData.titleEn);
    formData.append("titleNp", carouselData.titleNp);
    formData.append("descriptionEn", carouselData.descriptionEn);
    formData.append("descriptionNp", carouselData.descriptionNp);

    try {
      if (isEditing) {
        // Update carousel item
        const response = await hitApi.patch(
          `/carousel/${editingItemId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });

        setCarouselItems((prevItems) =>
          prevItems.map((item) =>
            item._id === editingItemId ? response.data.data : item
          )
        );
      } else {
        // Add new carousel item
        const response = await hitApi.post("/carousel", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setCarouselItems([...carouselItems, response.data.data]);
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Slide,
        });
      }
      fetchCarouselItems();

      closeModal();
    } catch (error) {
      toast.error(error.message || "Error submitting carousel data:", error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCarouselItems = async () => {
    setLoading(true);
    try {
      const response = await hitApi.get("/carousel");
      setCarouselItems(response.data.result);
    } catch (error) {
      console.error("Error fetching carousel items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarouselItems();
  }, []);

  const handleEditCarousel = (item) => {
    setIsEditing(true);
    setEditingItemId(item._id);
    setCarouselData({
      image: item.image,
      titleEn: item.title.en,
      titleNp: item.title.np,
      descriptionEn: item.description.en,
      descriptionNp: item.description.np,
    });
    openModal();
  };

  const handleDeleteCarousel = async (item) => {
    try {
      const response = await hitApi.delete(`carousel/${item._id}`);
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
      fetchCarouselItems();
    } catch (error) {
      toast.error(error.message || "Something went wrong.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
      });
    }
  };

  return (
    <div>
      <ToastContainer />

      <div className="mt-5">
        <strong className="text-gray-700 font-bold text-xl">Carousel</strong>
      </div>

      <div className="bg-white p-4 rounded-md border border-gray-200 shadow-md flex-1 mt-5">
        <div className="flex">
          <button
            className="border p-2 font-medium flex gap-2 rounded-md hover:bg-gray-200 bg-gray-100 shadow-sm transition-all ease-in-out duration-300"
            onClick={openModal}
          >
            <IoIosAddCircle className="mt-1" />
            Add Carousel
          </button>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full text-gray-700 border-collapse border border-slate-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-slate-300 px-4 py-2 text-left text-sm text-gray-600">
                  S.N.
                </th>
                <th className="border border-slate-300 px-4 py-2 text-left text-sm text-gray-600">
                  Image
                </th>
                <th className="border border-slate-300 px-4 py-2 text-left text-sm text-gray-600">
                  Title
                </th>
                <th className="border border-slate-300 px-4 py-2 text-left text-sm text-gray-600">
                  Description
                </th>
                <th className="border border-slate-300 px-4 py-2 text-left text-sm text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {carouselItems.map((item, index) => (
                <tr key={item._id || index}>
                  <td className="border border-slate-300 px-4 py-2 text-left text-sm text-gray-600">
                    {index + 1}
                  </td>
                  <td className="border border-slate-300 px-4 py-2 text-left text-sm text-gray-600">
                    <img
                      src={`http://localhost:8080/${item.image}`}
                      alt="Carousel"
                      className="w-20 h-20 object-cover"
                    />
                  </td>
                  <td className="border border-slate-300 px-4 py-2 text-left text-sm text-gray-600">
                    {language === "en" ? item.title.en : item.title.np}
                  </td>
                  <td className="border border-slate-300 px-4 py-2 text-left text-sm text-gray-600">
                    {language === "en"
                      ? item.description.en
                      : item.description.np}
                  </td>
                  <td className="flex flex-col mt-3 gap-3 border-slate-300 px-4 py-2 text-left text-sm text-gray-600">
                    <button
                      className="text-blue-500"
                      onClick={() => handleEditCarousel(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => handleDeleteCarousel(item)}
                    >
                      Delete
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
          <div className="bg-white p-6 rounded-md shadow-md z-10 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 flex justify-center">
              {isEditing ? "Edit Carousel" : "Add Carousel"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1 font-medium">
                  {language === "en" ? "Title (English)" : "Title (Nepali)"}
                </label>
                <input
                  type="text"
                  name={language === "en" ? "titleEn" : "titleNp"}
                  value={
                    language === "en"
                      ? carouselData.titleEn
                      : carouselData.titleNp
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
                <textarea
                  name={language === "en" ? "descriptionEn" : "descriptionNp"}
                  value={
                    language === "en"
                      ? carouselData.descriptionEn
                      : carouselData.descriptionNp
                  }
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-md font-normal"
                  required
                />
              </div>
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
              {carouselData.image && (
                <img
                  src={
                    typeof carouselData.image === "string"
                      ? `http://localhost:8080/${carouselData.image}`
                      : URL.createObjectURL(carouselData.image)
                  }
                  alt="Preview"
                  className="w-20 h-20 mb-3"
                />
              )}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? "Saving..." : isEditing ? "Update" : "Save"}
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all duration-300 ml-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
