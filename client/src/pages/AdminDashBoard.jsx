import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const AdminDashBoard = () => {
  const [open, setOpen] = useState(false);
  return (
    <section className="flex">
      {/* Pass open state and toggle function to Sidebar */}
      <Sidebar isOpen={open} setIsOpen={setOpen} />
      <div
        className={`flex-1 p-4 h-screen duration-500 ${
          open ? "ml-72" : "ml-16"
        }`}
      >
        {/* Main content area will adjust margin based on sidebar state */}
        <Outlet />
      </div>
    </section>
  );
};

export default AdminDashBoard;
