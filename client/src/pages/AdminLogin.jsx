import React, { useEffect, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { hitApi } from "../services/hitApi";
import { authActions } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const AdminLogin = () => {
  const [data, setData] = useState({
    userName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const createdata = async () => {
      try {
        await hitApi.post("/createUser");
      } catch (error) {
        console.error("Error creating default user:", error);
      }
    };

    createdata();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await hitApi.post("/login", data);
      const token = response.data.token;

      if (response.data.result.role !== "user") {
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.result.role));
        localStorage.setItem("token", token);
        localStorage.setItem("id", response.data.result._id);
        localStorage.setItem("role", response.data.result.role);

        navigate("/admin/dashboard");
      }
    } catch (error) {
      setErrorMessage("Invalid username or password. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Log In</h2>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700">UserName</label>
            <input
              type="text"
              name="userName"
              value={data.userName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <div className="flex">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
              <button
                className="p-3 border border-gray-300 rounded mt-1"
                type="button"
                onClick={handleTogglePassword}
              >
                {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
              </button>
            </div>
          </div>

          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={isLoading} // Disable button during loading
            className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition duration-200"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
