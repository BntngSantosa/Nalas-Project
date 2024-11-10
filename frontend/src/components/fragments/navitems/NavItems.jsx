import { Link } from "react-router-dom";
import ButtonAdd from "../buttonadd/ButtonAdd";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import { useRef } from "react";

const NavItems = ({ isOpen }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = Cookies.get("access_Token");
    if (token) {
      setIsLoggedIn(true);
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    Cookies.remove("access_Token");
    Cookies.remove("user_Role");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const items = ["Tentang Kab", "Sejarah Kab", "Warisan Budaya", "Event"];

  const links = [
    "/tentang-pemkab",
    "/sejarah-kab-bandung",
    "/warisan-budaya",
    "/event",
    "/tambah-wb",
    "/tambah-evnt",
  ];

  const variants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 40,
      transition: {
        duration: 0.3,
      },
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
  };

  return (
    <>
      {/* Desktop Menu */}
      <ul className="hidden lg:flex lg:justify-between lg:items-center gap-5 lg:gap-8 font-openSans text-sm lg:text-[0.9rem] text-purplee font-medium">
        {items.map((item, index) => (
          <motion.li
            className="hover:text-navyy font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{
              scale: 0.95,
            }}
            key={index}
          >
            <Link to={links[index]}>{item}</Link>
          </motion.li>
        ))}

        {isLoggedIn ? (
          <div className="relative" ref={dropdownRef}>
            {/* Tampilkan icon user */}
            <motion.div
              className="cursor-pointer flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDropdown}
            >
              <FaUserCircle size={30} className="text-navyy" />
            </motion.div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <motion.div
                className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link
                      to="/tambah-wb"
                      className="text-gray-700 flex items-center gap-3"
                    >
                      <FontAwesomeIcon
                        icon={faCirclePlus}
                        className="text-navyy text-lg"
                      />{" "}
                      Warisan Budaya
                    </Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <Link
                      to="/tambah-event"
                      className="text-gray-700 flex items-center gap-3"
                    >
                      <FontAwesomeIcon
                        icon={faCirclePlus}
                        className="text-navyy text-lg"
                      />{" "}
                      Event
                    </Link>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </motion.div>
            )}
          </div>
        ) : (
          <ButtonAdd children={"Tambah warisan budaya"} linkTo={"/masuk"} />
        )}
      </ul>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            key="mobile-menu"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden flex flex-col items-start bg-white w-full absolute px-6 py-4 gap-5 -left-0 font-openSans text-xs font-medium shadow-lg sm:text-[0.8rem] md:text-sm md:px-24 lg:text-[1rem] text-purplee -z-10"
          >
            {items.map((item, index) => (
              <motion.li
                className="hover:text-navyy text-[14px]"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                key={index}
              >
                <Link to={links[index]}>{item}</Link>
              </motion.li>
            ))}
            {isLoggedIn ? (
              <>
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  className=""
                >
                  <Link
                    to="/tambah-wb"
                    className="font-openSans text-sm lg:text-[0.9rem] text-purplee"
                  >
                    Tambah Warisan Budaya
                  </Link>
                </motion.div>
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  className=""
                >
                  <Link
                    to="/tambah-event"
                    className="font-openSans text-sm lg:text-[0.9rem] text-purplee"
                  >
                    Tambah Event
                  </Link>
                </motion.div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-orangee text-white w-full px-4 py-3 text-sm font-medium rounded-full lg:w-auto shadow-lg shadow-orangee/10 lg:text-lg"
                  onClick={handleLogout}
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <ButtonAdd children={"Tambah warisan budaya"} linkTo={"/masuk"} />
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavItems;
