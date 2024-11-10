import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../button/ButtonForm";

const ButtonAdd = ({ children, linkTo }) => {
  return (
    <Link to={linkTo} className="w-full lg:w-auto">
      <Button>{children}</Button>
    </Link>
  );
};

export default ButtonAdd;
