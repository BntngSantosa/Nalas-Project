import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

const FetchEventById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/event/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export default FetchEventById;
