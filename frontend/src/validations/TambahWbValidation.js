import * as Yup from "yup";

export const validationSchema = Yup.object({
  namaTempat: Yup.string().required("Nama tempat diperlukan"),
  deskripsi: Yup.string().required("Deskripsi diperlukan"),
  kategoriTempat: Yup.string().required("Kategori tempat diperlukan"),
  tipeTempat: Yup.string().required("Tipe tempat diperlukan"),
  kabupaten: Yup.string().required("Kabupaten diperlukan"),
  kecamatan: Yup.string().required("Kecamatan diperlukan"),
  alamat: Yup.string().required("Alamat lengkap diperlukan"),
  // thumbnail: Yup.mixed().required("Thumbnail diperlukan"),
  // galeri: Yup.mixed().required("Galeri diperlukan"),
});