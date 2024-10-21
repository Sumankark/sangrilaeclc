import React, { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { Slide, toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import { hitApi } from "../services/hitApi";

const Gallery = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [galleryData, setGalleryData] = useState({
    image: null,
    titleEn: "",
    titleNp: "",
  });
  const [galleryImage, setGalleryImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setGalleryData({
      image: null,
      titleEn: "",
      titleNp: "",
    });
  };

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
        setGalleryData((prevData) => ({
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
    formData.append("image", galleryData.image);
    formData.append("titleEn", galleryData.titleEn);
    formData.append("titleNp", galleryData.titleNp);
    try {
      const response = await hitApi.post("/gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setGalleryImage([...galleryImage, response.data.data]);

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

      closeModal();
    } catch (error) {
      toast.error(error.message || "Error submitting gallery data:", error, {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGalleryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleView = (imageUrl) => {
    window.open(imageUrl, "_blank");
  };

  const handleDelete = async (imageId) => {
    try {
      const response = await hitApi.delete(`/gallery/${imageId}`);
      setGalleryImage(galleryImage.filter((item) => item._id !== imageId));
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
    } catch (error) {
      toast.error("Error deleting image", {
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

  useEffect(() => {
    fetchGalleryImage();
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="mt-5">
        <strong className="text-gray-700 font-bold text-xl">Gallery</strong>
      </div>
      <div className="bg-white p-4 rounded-md border border-gray-200 shadow-md flex-1 mt-5">
        <div className="flex">
          <button
            className="border p-2 font-medium flex gap-2 rounded-md hover:bg-gray-200 bg-gray-100 shadow-sm transition-all ease-in-out duration-300"
            onClick={openModal}
          >
            <IoIosAddCircle className="mt-1" />
            Add Image
          </button>
        </div>
      </div>

      {/* Gallery display */}
      <div className="mt-5 grid grid-cols-3 gap-4">
        {galleryImage.map((image) => (
          <div key={image._id} className="bg-white p-4 rounded-md shadow-md">
            <img
              src={`http://localhost:8080/${image.image}`} // Adjust this URL based on your backend
              alt="Gallery"
              className="w-full h-40 object-cover rounded-md"
            />
            <div className="flex justify-between mt-2">
              <button
                onClick={() =>
                  handleView(`http://localhost:8080/${image.image}`)
                }
                className="text-blue-500 hover:underline"
              >
                View
              </button>
              <button
                onClick={() => handleDelete(image._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-gray-600 bg-opacity-50"
            onClick={closeModal}
          ></div>
          <div className="bg-white p-6 rounded-md shadow-md z-10 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 flex justify-center">
              Add Image
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
                      ? galleryData.titleEn
                      : galleryData.titleNp
                  }
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-md font-normal"
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
              {galleryData.image && (
                <img
                  src={
                    typeof galleryData.image === "string"
                      ? `http://localhost:8080/${galleryData.image}`
                      : URL.createObjectURL(galleryData.image)
                  }
                  alt="Preview"
                  className="w-20 h-20 mb-3"
                />
              )}
              <div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
