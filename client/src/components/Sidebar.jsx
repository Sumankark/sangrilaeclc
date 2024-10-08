import React, { useState } from "react";
import { GoGoal, GoOrganization } from "react-icons/go";
import { BiSolidCarousel } from "react-icons/bi";
import { TbLayoutDashboard } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { FaImages, FaServicestack } from "react-icons/fa";
import { MdVolunteerActivism } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const menus = [
    {
      name: "dashboard",
      link: "/admin/dashboard",
      icon: TbLayoutDashboard,
    },
    {
      name: "profile",
      link: "/admin/dashboard/profile",
      icon: CgProfile,
      margin: true,
    },
    {
      name: "user",
      link: "/admin/dashboard/user",
      icon: AiOutlineUser,
    },
    {
      name: "carousel",
      link: "/admin/dashboard/carousel",
      icon: BiSolidCarousel,
    },
    {
      name: "images",
      link: "/admin/dashboard/images",
      icon: FaImages,
      margin: true,
    },
    {
      name: "goals",
      link: "/admin/dashboard/goals",
      icon: GoGoal,
    },
    {
      name: "services",
      link: "/admin/dashboard/services",
      icon: FaServicestack,
    },
    {
      name: "volunteering",
      link: "/admin/dashboard/volunteering",
      icon: MdVolunteerActivism,
      margin: true,
    },
    {
      name: "about",
      link: "/admin/dashboard/about",
      icon: FcAbout,
    },
    {
      name: "organization",
      link: "/admin/dashboard/organization",
      icon: GoOrganization,
    },
  ];
  const handleLogout = async () => {
    localStorage.clear();
    navigate("/admin/login");
  };

  return (
    <div>
      <div
        className={`bg-[#0e0e0e] min-h-screen text-gray-100 px-4 flex flex-col justify-between ${
          open ? "w-72" : "w-16"
        } duration-500`}
      >
        <div>
          <div className="py-3 flex justify-end">
            <HiMenuAlt3
              size={24}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="mt-4 flex flex-col gap-4 relative">
            {menus?.map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className={`${
                  item.margin && "mb-5"
                } group flex items-center  text-sm gap-4 font-medium p-2 hover:bg-gray-800 rounded-md`}
              >
                <div>{React.createElement(item.icon, { size: "20" })}</div>
                <h2
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                >
                  {item.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md  drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                >
                  {item?.name}
                </h2>
              </Link>
            ))}
          </div>
        </div>
        {/* Logout button at the bottom */}
        <div className="mb-4">
          <button
            className="text-sm font-medium flex bg-gray-800 rounded-md p-2 gap-4 w-full cursor-pointer text-gray-100"
            onClick={handleLogout}
          >
            <CiLogout size={20} />
            <span className={`${!open && "hidden"}`}>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
