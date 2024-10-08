import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const AdminDashBoard = () => {
  return (
    <section className="flex gap-6">
      <Sidebar />
      <div className="text-xl font-semibold m-3 flex-1">
        <Outlet />
      </div>
    </section>
  );
};

export default AdminDashBoard;
