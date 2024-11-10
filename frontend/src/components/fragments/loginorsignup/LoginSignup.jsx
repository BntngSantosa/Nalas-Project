import { Link } from "react-router-dom";

const LoginSignup = ({linkTo, toForm, children}) => {
    return (
      <p className="font-poppins text-navyy text-sm">
        {children}
        <Link
          to={linkTo}
          className="font-poppins font-semibold text-orangee text-sm"
        >
          {toForm}
        </Link>
      </p>
    );
}

export default LoginSignup;