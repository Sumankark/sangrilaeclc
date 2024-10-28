import React, { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { toast, Slide } from "react-toastify";
import { hitApi } from "../../services/hitApi";

const AddContact = () => {
  const { i18n } = useTranslation();
  const language = i18n.language;
  const [loading, setLoading] = useState(false);
  const [contactData, setContactData] = useState({
    phoneNumberEn: "",
    phoneNumberNp: "",
    email: "",
  });
  const [contactList, setContactList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    setLoading(true);
    try {
      const response = await hitApi.get("/contact");
      setContactList(response.data.result);
    } catch (error) {
      toast.error("Error fetching data.", toastConfig);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setContactData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      phoneNumberEn: contactData.phoneNumberEn,
      phoneNumberNp: contactData.phoneNumberNp,
      email: contactData.email,
    };

    try {
      if (isEditing) {
        const response = await hitApi.patch(
          `/contact/${editingItemId}`,
          payload
        );
        toast.success(response.data.message, toastConfig);
        setContactList((prev) =>
          prev.map((item) =>
            item._id === editingItemId ? response.data.data : item
          )
        );
        setIsEditing(false);
        setEditingItemId(null);
      } else {
        const response = await hitApi.post("/contact", payload);
        toast.success(response.data.message, toastConfig);
        setContactList([...contactList, response.data.data]);
      }
      setContactData({ phoneNumberEn: "", phoneNumberNp: "", email: "" });
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
    const itemToEdit = contactList[index];
    setContactData({
      phoneNumberEn: itemToEdit.phoneNumber.en,
      phoneNumberNp: itemToEdit.phoneNumber.np,
      email: itemToEdit.email,
    });
    setEditingItemId(id);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await hitApi.delete(`/contact/${id}`);
      toast.success(response.data.message, toastConfig);
      setContactList((prev) => prev.filter((item) => item._id !== id));
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
          {isEditing ? "Update Contact" : "Add Contact"}
        </button>

        <div className="mt-5 flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium">
              PhoneNumber (English)
            </label>
            <input
              type="number"
              name="phoneNumberEn"
              placeholder="98********"
              value={contactData.phoneNumberEn}
              onChange={handleInputChange}
              className="border p-2 rounded-md w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">
              PhoneNumber (Nepali)
            </label>
            <input
              type="number"
              name="phoneNumberNp"
              placeholder="98********"
              value={contactData.phoneNumberNp}
              onChange={handleInputChange}
              className="border p-2 rounded-md w-full"
            />
          </div>
        </div>
        <div className="mt-5">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="****@gmail.com"
            value={contactData.email}
            onChange={handleInputChange}
            className="border p-2 rounded-md w-full"
          />
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
                PhoneNumber
              </th>
              <th className="border border-slate-300 px-4 py-2 text-left text-sm text-gray-600">
                Email
              </th>
              <th className="border border-slate-300 px-4 py-2 text-left text-sm text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {contactList.map((item, index) => (
              <tr key={item._id}>
                <td className="border border-slate-300 px-4 py-2 text-left text-sm text-gray-600">
                  {index + 1}
                </td>
                <td className="border border-slate-300 px-4 py-2 text-left text-sm text-gray-600">
                  {language === "en"
                    ? item.phoneNumber.en
                    : item.phoneNumber.np}
                </td>
                <td className="border border-slate-300 px-4 py-2 text-left text-sm text-gray-600">
                  {item.email}
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

export default AddContact;
