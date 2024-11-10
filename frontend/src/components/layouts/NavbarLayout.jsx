import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Logo from "../fragments/logo/logo";
import ButtonToggle from "../fragments/buttontoggle/ButtonToggle";
import NavItems from "../fragments/navitems/NavItems";
import { motion } from "framer-motion";

const NavbarLayout = () => {
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();
  const isAdminPath = location.pathname.includes("/admin");

  return (
    <>
      {!isAdminPath && (
        <motion.nav
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="w-full px-5 md:px-24 py-6 flex justify-between items-center fixed top-0 left-0 bg-white z-10"
        >
          <div className="flex justify-between items-center w-full z-10 lg:w-auto">
            <Logo />
            <ButtonToggle navOpen={navOpen} setNavOpen={setNavOpen} />
          </div>
          <div>
            <NavItems isOpen={navOpen}></NavItems>
          </div>
        </motion.nav>
      )}
      <div className="">
        <Outlet />
      </div>
    </>
  );
};

export default NavbarLayout;
