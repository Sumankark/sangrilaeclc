import React, { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

const Services = () => {
  const [userdata, setUserdata] = useState([]);
  return (
    <div>
      <div>
        <div className="mt-5">
          <strong className="text-gray-700 font-bold text-xl">Services</strong>
        </div>

        <div className="bg-white px-4 pt-3 pb-4 rounded-md border border-gray-200 shadow-md flex-1 mt-5">
          <div className="flex ">
            <button className="border p-2 font-medium flex gap-2 rounded-md hover:bg-gray-200 bg-gray-100 shadow-sm transition-all ease-in-out duration-300">
              <IoIosAddCircle className="mt-1" />
              Add Services
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
      </div>
    </div>
  );
};

export default Services;
