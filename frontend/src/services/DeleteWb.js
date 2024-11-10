import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL;

const DeleteWb = async (id, location) => {
  try {
    const response = await axios.delete(`${API_URL}/${location}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw new Error(error.response?.data?.message || "Failed to delete data");
  }
};

export default DeleteWb;
