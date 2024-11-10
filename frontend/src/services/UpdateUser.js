import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL;

const UpdateUserService = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL}/user/${id}`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Error updating user");
  }
};

export default UpdateUserService;
