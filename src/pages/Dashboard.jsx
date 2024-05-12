import React, { useState } from "react";

import Sidebar from "../components/Sidebar/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa6";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex gap-2  bg-white">
      <div
        className={`absolute bg-black/30 h-screen w-full z-40 ${
          isSidebarOpen ? "" : "max-sm:hidden"
        } sm:hidden`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
      <div
        className={`w-[150px] bg-primary h-screen fixed left-0 z-50 ${
          isSidebarOpen ? "" : "max-sm:hidden"
        } `}
      >
        <Sidebar close={() => setIsSidebarOpen(false)} />
      </div>
      <div className="flex-1 w-full pt-2 ml-[150px] p-6  max-sm:ml-0">
        <header className="mb-[60px] h-[60px] ml-[-150px] top-0 fixed w-full bg-white shadow-md z-30 flex items-center justify-center   max-sm:ml-0 max-sm:justify-start max-sm:gap-6">
          <button className="sm:hidden" onClick={() => setIsSidebarOpen(true)}>
            <FaBars />
          </button>
          <h1 className=" font-extrabold font-inter text-center  ">
            SMASS SYSTEM
          </h1>
        </header>
        <main className="pt-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
