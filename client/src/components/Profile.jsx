import React, { useEffect, useState, useCallback, useMemo } from "react";
import { CgProfile } from "react-icons/cg";
import { hitApi } from "../services/hitApi";
import { Slide, toast, ToastContainer } from "react-toastify";

const Profile = () => {
  const token = localStorage.getItem("token");
  const [profile, setProfile] = useState(null);
  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [newUserName, setNewUserName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const headers = useMemo(() => {
    return {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${token}`,
    };
  }, [token]);

  const getProfile = useCallback(async () => {
    try {
      const result = await hitApi.get("/profile", { headers });
      setProfile(result.data.result);
    } catch (error) {
      setError("Failed to fetch profile data.");
    }
  }, [headers]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const closeUsernameModal = () => setIsUsernameModalOpen(false);
  const closePasswordModal = () => setIsPasswordModalOpen(false);

  const handleUserName = async (e) => {
    e.preventDefault();
    try {
      const response = await hitApi.patch(
        "/update-username",
        { userName: newUserName },
        { headers }
      );
      console.log(response);
      closeUsernameModal();
      toast.success("User Name update Successfully.", {
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
      getProfile();
    } catch (error) {
      console.error("Update username error:", error);
      toast.error(error, {
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

  const handlePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await hitApi.patch(
        "/update-password",
        { oldPassword, newPassword },
        { headers }
      );
      console.log(response);
      toast.success("Password update Successfully.", {
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
      closePasswordModal();
    } catch (error) {
      console.error("Update password error:", error);
      toast.error(error, {
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
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold mb-10 mt-5">Profile</h1>

        {error && <p className="text-red-500">{error}</p>}
        {profile ? (
          <div className="flex w-full">
            <div className="flex flex-col w-[50%]">
              <div>
                <CgProfile size={200} />
              </div>
              <div className="flex flex-col gap-3 mt-3 ml-4">
                <h1 className="flex gap-2">
                  User Name: <p className="font-normal">{profile.userName}</p>
                </h1>
                <h1 className="flex gap-2">
                  Role: <p className="font-normal">{profile.role}</p>
                </h1>
              </div>
            </div>
            <div className="w-[50%] flex flex-col gap-6 text-center justify-center">
              <button
                className="bg-gray-900 text-gray-100 font-normal py-2 rounded hover:bg-gray-600  max-w-52"
                onClick={() => setIsUsernameModalOpen(true)}
              >
                Update Username
              </button>
              <button
                className="bg-gray-900 text-gray-100 font-normal py-2 px-4 rounded hover:bg-gray-600 w-auto max-w-52"
                onClick={() => setIsPasswordModalOpen(true)}
              >
                Update Password
              </button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {isUsernameModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h2 className="text-2xl font-bold mb-4">Update Username</h2>
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="Enter new username"
              className="border p-2 w-full mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700"
                onClick={closeUsernameModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                onClick={handleUserName}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h2 className="text-2xl font-bold mb-4">Update Password</h2>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter old password"
              className="border p-2 w-full mb-4 font-normal"
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="border p-2 w-full mb-4 font-normal"
            />
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700 font-medium"
                onClick={closePasswordModal}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 font-medium"
                onClick={handlePassword}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
