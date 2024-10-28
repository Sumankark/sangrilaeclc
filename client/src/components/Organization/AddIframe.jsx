import React, { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { toast, Slide } from "react-toastify";
import { hitApi } from "../../services/hitApi";

const AddIframe = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;
  const [loading, setLoading] = useState(false);
  const [iframeData, setIframeData] = useState({
    url: "",
  });
  const [iframeList, setIframeList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    fetchIframe();
  }, []);

  const fetchIframe = async () => {
    setLoading(true);
    try {
      const response = await hitApi.get("/iframe");
      setIframeList(response.data.result);
    } catch (error) {
      toast.error("Error fetching data.", toastConfig);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setIframeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      iframe: iframeData.url,
    };

    try {
      if (isEditing) {
        const response = await hitApi.patch(
          `/iframe/${editingItemId}`,
          payload
        );
        toast.success(response.data.message, toastConfig);
        setIframeList((prev) =>
          prev.map((item) =>
            item._id === editingItemId ? response.data.data : item
          )
        );
      } else {
        const response = await hitApi.post("/iframe", payload);
        toast.success(response.data.message, toastConfig);
        setIframeList([...iframeList, response.data.data]);
      }
      setIframeData({ url: "" }); // Reset form after successful submission
      setIsEditing(false);
      setEditingItemId(null);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error submitting data.",
        toastConfig
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (index, id) => {
    const itemToEdit = iframeList[index];
    setIframeData({
      url: itemToEdit.url,
    });
    setEditingItemId(id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this iframe?")) {
      try {
        const response = await hitApi.delete(`/iframe/${id}`);
        toast.success(response.data.message, toastConfig);
        setIframeList((prev) => prev.filter((item) => item._id !== id));
      } catch (error) {
        toast.error("Error deleting data.", toastConfig);
      }
    }
  };

  const toastConfig = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    transition: Slide,
  };

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          disabled={loading} // Disable the button while loading
          className={`border p-2 font-medium flex gap-2 rounded-md ${
            loading ? "bg-gray-300 cursor-not-allowed" : "hover:bg-gray-200"
          } bg-gray-100 shadow-sm transition-all ease-in-out duration-300`}
        >
          <IoIosAddCircle className="mt-1" />
          {isEditing ? "Update Contact" : "Add Contact"}
        </button>

        <div className="mt-5 gap-4">
          <div>
            <label htmlFor="iframeUrl" className="block mb-1 font-medium">
              Iframe Url
            </label>
            <input
              id="iframeUrl" // Added ID for accessibility
              type="text"
              name="url" // Changed the name to match the state
              placeholder="https://www.google.com/maps/embed?....."
              value={iframeData.url}
              onChange={handleInputChange}
              className="border p-2 rounded-md w-full"
            />
          </div>
        </div>
      </form>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full text-gray-700 border-collapse border border-slate-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-slate-300 px-4 py-2 text-left text-sm text-gray-600">
                S.N.
              </th>
              <th className="border border-slate-300 px-4 py-2 text-left text-sm text-gray-600">
                Iframe
              </th>
              <th className="border border-slate-300 px-4 py-2 text-left text-sm text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {iframeList.map((item, index) => (
              <tr key={item._id}>
                <td className="border border-slate-300 px-4 py-2 text-left text-sm text-gray-600">
                  {index + 1}
                </td>
                <td className="border border-slate-300 px-4 py-2 text-left text-sm text-gray-600">
                  {item.url.length > 80
                    ? item.url.slice(0, 80) + "..."
                    : item.url}
                </td>
                <td className="flex gap-3 border-slate-300 px-4 py-2 text-left text-sm text-gray-600">
                  <button
                    onClick={() => handleEdit(index, item._id)}
                    className="text-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500"
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
  );
};

export default AddIframe;
