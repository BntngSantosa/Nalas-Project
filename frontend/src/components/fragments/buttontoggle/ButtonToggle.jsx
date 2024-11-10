import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const NavbarButton = ({ navOpen, setNavOpen }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setNavOpen(!navOpen)}
      className="lg:hidden"
    >
      {!navOpen ? (
        <FontAwesomeIcon icon={faBars} className="text-4xl text-navyy" />
      ) : (
        <FontAwesomeIcon icon={faXmark} className="text-4xl text-navyy" />
      )}
    </motion.button>
  );
};

export default NavbarButton;
