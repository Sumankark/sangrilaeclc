import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { Slide, toast, ToastContainer } from "react-toastify";
import { FaUserEdit } from "react-icons/fa";
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
import { hitApi } from "../services/hitApi";

const Users = () => {
  const [userdata, setUserData] = useState([]);
  const token = localStorage.getItem("token");
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [data, setData] = useState({
    userName: "",
    password: "",
    role: "",
  });
  const modalRef = useRef(null);

  const headers = useMemo(() => {
    return {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${token}`,
    };
  }, [token]);

  const getAllUser = useCallback(async () => {
    try {
      const result = await hitApi.get("/users", { headers });
      setUserData(result.data.result);
    } catch (error) {
      console.log(error);
    }
  }, [headers]);

  useEffect(() => {
    getAllUser();
  }, [getAllUser]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsUserModalOpen(false);
        setIsEditing(false);
        setData({
          userName: "",
          password: "",
          role: "",
        });
        setSelectedUser(null);
      }
    };

    if (isUserModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserModalOpen]);

  const closeUserModal = () => {
    setIsUserModalOpen(false);
    setIsEditing(false);
    setSelectedUser(null);
  };

  const handleUser = async (e) => {
    e.preventDefault();

    if (data.userName === "" || data.password === "" || data.role === "") {
      toast.error("All fields are required", {
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
      return;
    }

    try {
      let response;
      if (isEditing) {
        response = await hitApi.patch(`/users/${selectedUser._id}`, data, {
          headers,
        });
      } else {
        response = await hitApi.post("/add-user", data, { headers });
      }

      if (response.data.success) {
        setData({
          userName: "",
          password: "",
          role: "",
        });

        setIsUserModalOpen(false);
        setIsEditing(false);

        toast.success(
          isEditing ? "User updated successfully." : "User added successfully.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
          }
        );

        getAllUser();
      } else {
        toast.error(response.data.message || "Something went wrong.", {
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
    } catch (error) {
      toast.error("Error: " + error.message, {
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

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditUser = (user) => {
    setIsEditing(true);
    setSelectedUser(user);
    setData({
      userName: user.userName,
      password: "",
      role: user.role,
    });
    setIsUserModalOpen(true);
  };

  const handleDelete = async (user) => {
    setSelectedUser(user);

    try {
      const response = await hitApi.delete(`/users/${user._id}`, {
        headers,
      });
      if (response.data.success) {
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

        getAllUser();
      } else {
        toast.error(response.data.message || "Something went wrong.", {
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
    } catch (error) {
      toast.error("Error: " + error.message, {
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

      <div>
        <div className="mt-5">
          <strong className="text-gray-700 font-bold text-xl">Users</strong>
        </div>

        <div className="bg-white px-4 pt-3 pb-4 rounded-md border border-gray-200 shadow-md flex-1 mt-5">
          <div className="flex justify-end">
            <button
              className="border p-2 font-medium flex gap-2 rounded-md hover:bg-gray-200 bg-gray-100 shadow-sm transition-all ease-in-out duration-300"
              onClick={() => setIsUserModalOpen(true)}
            >
              <AiOutlineUserAdd className="mt-1" />
              Add Users
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
                    User Name
                  </th>
                  <th className="border border-slate-300 px-4 py-2 text-left text-sm text-gray-600">
                    Role
                  </th>
                  <th className="border border-slate-300 px-4 py-2 text-center text-sm  text-gray-600">
                    Actions
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
                        className="p-2 text-blue-600 hover:text-blue-800 transition-colors ease-in-out duration-300"
                        title="Edit User"
                        onClick={() => handleEditUser(item)}
                      >
                        <FaUserEdit />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:text-red-800 transition-colors ease-in-out duration-300"
                        title="Delete User"
                        onClick={() => handleDelete(item)}
                      >
                        <AiOutlineUserDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isUserModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div
            className="bg-white p-6 rounded shadow-lg w-[400px]"
            ref={modalRef}
          >
            <h2 className="text-2xl font-bold mb-4">
              {isEditing ? "Edit User" : "Add User"}
            </h2>
            <div className="flex flex-col gap-5">
              {/* Input for User Name */}
              <div className="relative w-full max-w-sm flex items-center">
                <input
                  type="text"
                  name="userName"
                  required
                  value={data.userName}
                  onChange={handleChange}
                  className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md p-3 h-10 outline-none focus:outline-none focus:ring-1 focus:ring-slate-400 shadow-sm"
                />
                <label
                  className={`absolute cursor-text bg-white px-1 left-2.5 transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90 
               ${
                 data.userName
                   ? "-top-2 scale-90 text-xs text-slate-400"
                   : "text-sm rounded-md text-slate-400"
               } 
                `}
                >
                  User Name
                </label>
              </div>

              {/* Input for Password */}
              <div className="relative w-full max-w-sm flex items-center">
                <input
                  type="password"
                  name="password"
                  required={!isEditing}
                  value={data.password}
                  onChange={handleChange}
                  className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md p-3 h-10 outline-none focus:outline-none focus:ring-1 focus:ring-slate-400 shadow-sm"
                />
                <label
                  className={`absolute cursor-text bg-white px-1 left-2.5 transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90 
                   ${
                     data.password
                       ? "-top-2 scale-90 text-xs text-slate-400"
                       : "text-sm rounded-md text-slate-400"
                   } 
                     `}
                >
                  Password
                </label>
              </div>

              {/* Input for Role */}
              <div className="relative w-full max-w-sm flex items-center">
                <input
                  type="text"
                  name="role"
                  required
                  value={data.role}
                  onChange={handleChange}
                  className="peer w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md p-3 h-10 outline-none focus:outline-none focus:ring-1 focus:ring-slate-400 shadow-sm"
                />
                <label
                  className={`absolute cursor-text bg-white px-1 left-2.5 transition-all transform origin-left peer-focus:-top-2 peer-focus:left-2.5 peer-focus:text-xs peer-focus:text-slate-400 peer-focus:scale-90 
               ${
                 data.role
                   ? "-top-2 scale-90 text-xs text-slate-400"
                   : "text-sm rounded-md text-slate-400"
               } 
                `}
                >
                  Role
                </label>
              </div>
              {/* Modal buttons */}
              <div className="flex gap-4 justify-end mt-4">
                <button
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold px-4 py-2 rounded"
                  onClick={closeUserModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
                  onClick={handleUser}
                >
                  {isEditing ? "Update User" : "Add User"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
