import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

const daftarUser = async (username, email, password, confPassword) => {
  try {
    const response = await axios.post(API_URL + "/user/daftar", {
      username,
      email,
      password,
      confPassword,
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export default daftarUser;
