import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL;

const UpdateEventService = async (id, eventData) => {
  try {
    const response = await axios.put(`${API_URL}/event/${id}`, eventData);
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response.data.message || "Error updating Event"
    );
  }
};

export default UpdateEventService;
