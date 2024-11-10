import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo/logo.svg";

const Logo = () => {
  return (
    <Link to="/">
      <img
        src={logo}
        alt="logo pemerintahan kabupaten bandung"
        className="h-6 md:h-7 lg:h-8"
      />
    </Link>
  );
};

export default Logo;
