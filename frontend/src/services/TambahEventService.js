import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_APP_API_URL;

const tambahEvent = async (formData) => {
  try {
    // Ambil token dari localStorage
    const token = Cookies.get("access_Token");

    // Pastikan token ada
    if (!token) {
      throw new Error("Token tidak ditemukan. Silakan login terlebih dahulu.");
    }

    // Mengirimkan request ke API backend dengan header Authorization
    const response = await axios.post(`${API_URL}/event`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, // Gunakan Bearer token dari localStorage
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export default tambahEvent;
