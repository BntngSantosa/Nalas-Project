import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

const FetchEventWb = async () => {
  try {
    const response = await axios.get(`${API_URL}/event`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export default FetchEventWb;
