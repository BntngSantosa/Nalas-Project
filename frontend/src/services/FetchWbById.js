import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

const FetchWbById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/wb/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export default FetchWbById;
