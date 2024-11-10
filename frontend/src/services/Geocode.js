// services/geocode.js

const geocodeAddress = async (address) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch geocode data");
  }

  const data = await response.json();

  // Mengembalikan lat dan lon dari data pertama yang didapat
  if (data.length > 0) {
    return {
      lat: data[0].lat,
      lon: data[0].lon,
    };
  }

  return null; // Jika alamat tidak ditemukan
};

export default geocodeAddress;
