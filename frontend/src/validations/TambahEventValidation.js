import * as Yup from "yup";

export const validationSchema = Yup.object({
  namaEvent: Yup.string().required("Nama Event diperlukan"),
  deskripsi: Yup.string().required("Deskripsi Event diperlukan"),
  alamat: Yup.string().required("Alamat lengkap diperlukan"),
  tanggalEvent: Yup.date().required("Tanggal Event diperlukan"),
  call: Yup.string().required("No Telepon diperlukan"),
  email: Yup.string().required("Email diperlukan"),
  thumbnail: Yup.mixed().required("Thumbnail diperlukan"),
});
