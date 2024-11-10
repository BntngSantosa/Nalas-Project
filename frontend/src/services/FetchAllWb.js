import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

const FetchAllWb = async (type) => {
  try {
    const response = await axios.get(`${API_URL}/wb`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export default FetchAllWb;
