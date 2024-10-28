import React, { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { toast, Slide } from "react-toastify";
import { hitApi } from "../../services/hitApi";

const AddAddress = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;
  const [loading, setLoading] = useState(false);
  const [addressData, setAddressData] = useState({ en: "", np: "" });
  const [AddressList, setAddressList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    setLoading(true);
    try {
      const response = await hitApi.get("/address");
      setAddressList(response.data.result);
    } catch (error) {
      toast.error("Error fetching data.", toastConfig);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      en: addressData.en,
      np: addressData.np,
    };

    try {
      if (isEditing) {
        const response = await hitApi.patch(
          `/address/${editingItemId}`,
          payload
        );
        toast.success(response.data.message, toastConfig);
        setAddressList((prev) =>
          prev.map((item) =>
            item._id === editingItemId ? response.data.data : item
          )
        );
        setIsEditing(false);
        setEditingItemId(null);
      } else {
        const response = await hitApi.post("/address", payload);
        toast.success(response.data.message, toastConfig);
        setAddressList([...AddressList, response.data.data]);
      }
      setAddressData({ en: "", np: "" });
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
    const itemToEdit = AddressList[index];
    setAddressData({
      en: itemToEdit.address.en,
      np: itemToEdit.address.np,
    });
    setEditingItemId(id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await hitApi.delete(`/address/${id}`);
      toast.success(response.data.message, toastConfig);
      setAddressList((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      toast.error("Error deleting data.", toastConfig);
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
          className="border p-2 font-medium flex gap-2 rounded-md hover:bg-gray-200 bg-gray-100 shadow-sm transition-all ease-in-out duration-300"
        >
          <IoIosAddCircle className="mt-1" />
          {isEditing ? "Update Address" : "Add Address"}
        </button>

        <div className="mt-5 flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Address (English)</label>
            <input
              type="text"
              name="en"
              placeholder="English short About"
              value={addressData.en}
              onChange={handleInputChange}
              className="border p-2 rounded-md w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">Address (Nepali)</label>
            <input
              type="text"
              name="np"
              placeholder="Nepali short About"
              value={addressData.np}
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
                Description
              </th>
              <th className="border border-slate-300 px-4 py-2 text-left text-sm text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {AddressList.map((item, index) => (
              <tr key={item._id}>
                <td className="border border-slate-300 px-4 py-2 text-left text-sm text-gray-600">
                  {index + 1}
                </td>
                <td className="border border-slate-300 px-4 py-2 text-left text-sm text-gray-600">
                  {language === "en" ? item.address.en : item.address.np}
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

export default AddAddress;
