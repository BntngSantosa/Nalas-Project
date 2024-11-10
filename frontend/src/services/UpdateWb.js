import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL;

const UpdateWbService = async (id, wbData) => {
  try {
    const response = await axios.put(`${API_URL}/wb/${id}`, wbData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Error updating warisan budaya"
    );
  }
};

export default UpdateWbService;
