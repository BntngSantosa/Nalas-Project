import { motion } from "framer-motion";

const ButtonForm = ({ children, type = "button", disabled = false, onclick}) => {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 1.01 }}
      className={`bg-orangee text-white w-full px-4 py-3 text-[14px] md:text-[16px] font-medium rounded-full lg:w-auto shadow-lg shadow-orangee/10 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      type={type}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default ButtonForm;
