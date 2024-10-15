import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

const Goals = () => {
  const [userdata, setUserdata] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [volunteeringData, setVolunteeringData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setVolunteeringData({
      title: "",
      description: "",
      image: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVolunteeringData({ ...volunteeringData, [name]: value });
  };

  const handleFileChange = (e) => {
    setVolunteeringData({ ...volunteeringData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add new carousel item to the userdata state
    setUserdata([...userdata, volunteeringData]);
    closeModal();
  };

  return (
    <div>
      <div>
        <div className="mt-5">
          <strong className="text-gray-700 font-bold text-xl">
            Volunteering
          </strong>
        </div>

        <div className="bg-white px-4 pt-3 pb-4 rounded-md border border-gray-200 shadow-md flex-1 mt-5">
          <div className="flex ">
            <button
              className="border p-2 font-medium flex gap-2 rounded-md hover:bg-gray-200 bg-gray-100 shadow-sm transition-all ease-in-out duration-300"
              onClick={openModal}
            >
              <IoIosAddCircle className="mt-1" />
              Add Volunteering
            </button>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-gray-700 border-collapse border border-slate-300">
              <thead className="bg-gray-100">
                <tr className="flex">
                  <th className="border border-slate-300 px-4 py-2 text-left text-sm text-gray-600 flex-none">
                    S.N
                  </th>
                  <th className="border border-slate-300 px-4 py-2 text-left text-sm text-gray-600 flex-1">
                    Image
                  </th>
                  <th className="border border-slate-300 px-4 py-2 text-left text-sm text-gray-600 flex-1">
                    Title
                  </th>
                  <th className="border border-slate-300 px-4 py-2 text-center text-sm  text-gray-600 flex-1">
                    Description
                  </th>
                  <th className="border border-slate-300 px-4 py-2 text-center text-sm  text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {userdata.map((item, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-50 transition-colors ease-in-out duration-300"
                  >
                    <td className="border border-slate-300 px-4 py-2 text-sm font-medium">
                      {i + 1}
                    </td>
                    <td className="border border-slate-300 px-4 py-2 text-sm font-medium">
                      {item.userName}
                    </td>
                    <td className="border border-slate-300 px-4 py-2 text-sm font-medium">
                      {item.role}
                    </td>
                    <td className="border border-slate-300 px-4 py-2 text-sm flex justify-center gap-4">
                      <button
                        className="p-2 text-red-600 hover:text-red-800 transition-colors ease-in-out duration-300"
                        title="Delete User"
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
            <div className="bg-white p-6 rounded-md shadow-md z-10 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4 flex justify-center">
                Add Volunteering
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={volunteeringData.title}
                    onChange={handleInputChange}
                    className="w-full border px-3 py-2 rounded-md font-normal"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={volunteeringData.description}
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
                    className="w-full border px-3 py-2 rounded-md font-normal"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2 mt-5">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Goals;
