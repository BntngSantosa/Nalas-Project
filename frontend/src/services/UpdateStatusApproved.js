import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL;

const updateStatusApproved = async (id, location) => {
  try {
    const response = await axios.put(`${API_URL}/${location}/approved/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error updating Warisan Budaya Status"
    );
  }
};

export default updateStatusApproved;