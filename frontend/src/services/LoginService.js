import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_APP_API_URL;

const MasukUser = async (email, password) => {
  try {
    const response = await axios.post(API_URL + "/user/masuk", {
      email,
      password,
    });
    Cookies.set("access_Token", response.data.token)
    Cookies.set("user_Role", response.data.role)
    return response.data;
  } catch (error) {
    throw new Error("Login gagal, periksa kembali email dan password Anda");
  }
};

export default MasukUser;