import * as Yup from "yup";

export const daftarValidation = Yup.object({
  username: Yup.string().required("Username wajib diisi"),
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: Yup.string()
    .required("Password wajib diisi")
    .min(6, "Password minimal 6 karakter"),
  confPassword: Yup.string()
    .required("Password wajib diisi")
    .min(6, "Password minimal 6 karakter"),
});
