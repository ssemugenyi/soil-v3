import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FaUpload } from "react-icons/fa6";
import { BsGrid1X2Fill } from "react-icons/bs";

const Sidebar = ({ close }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-between py-6 w-full h-screen ">
      <div>
        <div className="rounded h-[100px] w-[150px] bg-primary flex flex-col justify-center items-center">
          <div className="h-10  w-10 rounded-full bg-white"></div>
          <h3 className="text-lg font-bold mt-4">Hi</h3>
        </div>
        <div className="w-full">
          <ul className="w-full">
            <NavLink
              to="overview"
              className={({ isActive }) =>
                "font-medium  font-inter block px-2 py-2.5 mb-1 " +
                (isActive ? "bg-white text-primary" : "text-white")
              }
              onClick={close}
            >
              <li className="flex gap-2 items-center">
                <BsGrid1X2Fill className="inline-block" />
                Dashboard
              </li>
            </NavLink>
            <NavLink
              to="fertilizer"
              className={({ isActive }) =>
                "font-medium font-inter block px-2 py-2.5 mb-1 " +
                (isActive ? "bg-white text-primary" : " text-white ")
              }
              onClick={close}
            >
              <li className="flex gap-2 items-center">
                <FaUpload className="inline-block" />
                SD Card
              </li>
            </NavLink>
          </ul>
        </div>
      </div>
      <div>
        <button
          className="font-bold font-inter px-3 py-2 text-md flex items-center rounded-md gap-3 hover:bg-primary hover:text-white transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("phone");

            navigate("/");
          }}
        >
          Logout
          <FaArrowRightFromBracket />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
