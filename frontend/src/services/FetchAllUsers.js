import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

const FetchAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export default FetchAllUsers;
