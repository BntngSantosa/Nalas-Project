import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faFilm,
  faFolderOpen,
  faSquarePollHorizontal,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Sidebar() {
  const [activeLink, setActiveLink] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    Cookies.remove("access_Token");
    Cookies.remove("user_Role");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const links = [
    { id: "dashboard", icon: faSquarePollHorizontal, to: "/admin/dashboard" },
    { id: "users", icon: faUsers, to: "/admin/dashboard/user" },
    { id: "wb", icon: faFolderOpen, to: "/admin/dashboard/wb" },
    { id: "event", icon: faFilm, to: "/admin/dashboard/event" },
  ];

  return (
    <div className="fixed left-0 h-screen px-3 py-10 bg-white shadow-md shadow-black/50 grid grid-cols-1 place-content-between place-items-center z-10">
      <div className="grid grid-cols-1 gap-5 place-content-between place-items-center">
        {links.map((link) => (
          <Link
            key={link.id}
            to={link.to}
            className={`px-3 py-2 rounded-md text-lg transition-all ease-in-out duration-150 ${
              activeLink === link.id
                ? "bg-orangee text-white"
                : "hover:bg-orangee hover:text-white"
            }`}
            onClick={() => setActiveLink(link.id)}
          >
            <FontAwesomeIcon icon={link.icon} />
          </Link>
        ))}
      </div>

      <button
        className={`px-3 py-2 rounded-md text-lg transition-all ease-in-out duration-150 ${
          activeLink === "logout"
            ? "bg-orangee text-white"
            : "hover:bg-orangee hover:text-white"
        }`}
        onClick={handleLogout}
      >
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </button>
    </div>
  );
}
