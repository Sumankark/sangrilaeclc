import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Organization = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="mt-5">
        <strong className="text-gray-700 font-bold text-xl">
          Organization Details
        </strong>
      </div>

      <div className="bg-white p-4 rounded-md border border-gray-200 shadow-md flex-1 mt-5">
        <div className="flex gap-10">
          <button
            className="border p-2 font-medium flex-1 gap-2 rounded-md hover:bg-gray-200 bg-gray-100 shadow-sm transition-all ease-in-out duration-300"
            onClick={() => navigate("/admin/dashboard/organization")}
          >
            About
          </button>
          <button
            className="border p-2 font-medium flex-1 gap-2 rounded-md hover:bg-gray-200 bg-gray-100 shadow-sm transition-all ease-in-out duration-300"
            onClick={() =>
              navigate("/admin/dashboard/organization/add-address")
            }
          >
            Adddress
          </button>
          <button
            className="border p-2 font-medium flex-1 gap-2 rounded-md hover:bg-gray-200 bg-gray-100 shadow-sm transition-all ease-in-out duration-300"
            onClick={() =>
              navigate("/admin/dashboard/organization/add-contact")
            }
          >
            Contact
          </button>
          <button
            className="border p-2 font-medium flex-1 gap-2 rounded-md hover:bg-gray-200 bg-gray-100 shadow-sm transition-all ease-in-out duration-300"
            onClick={() => navigate("/admin/dashboard/organization/add-iframe")}
          >
            Iframe
          </button>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Organization;
