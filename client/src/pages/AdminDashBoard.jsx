import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const AdminDashBoard = () => {
  const [open, setOpen] = useState(true);
  return (
    <section className="flex">
      <Sidebar isOpen={open} setIsOpen={setOpen} />
      <div
        className={`flex-1 p-4 h-screen duration-500 ${
          open ? "ml-72" : "ml-16"
        }`}
      >
        <Outlet />
      </div>
    </section>
  );
};

export default AdminDashBoard;
