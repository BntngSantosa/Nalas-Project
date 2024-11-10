import React, { useState } from "react";
import FooterLayout from "./FooterLayout";
import ButtonLogin from "../fragments/button/ButtonForm";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import { loginValidation } from "../../validations/LoginValidation";
import masukUser from "../../services/LoginService";
import FormTitle from "../fragments/formtitle/FormTitle";
import InputForm from "../fragments/inputform/InputForm";
import ErrorForm from "../fragments/errorform/ErrorForm";
import LoginSignup from "../fragments/loginorsignup/LoginSignup";
import Cookies from "js-cookie";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Spinner,
  useToast,
} from "@chakra-ui/react";

const LoginLayout = ({ duration }) => {
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const toast = useToast();
  const { ref, controls } = useScrollAnimation({ duration });

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values) => {
    setLoading(true);
    setAlertMessage(null);
    try {
      const data = await masukUser(values.email, values.password);
      setAlertMessage("Login berhasil! Anda akan diarahkan.");
      setAlertType("success");
      Cookies.set("access_Token", data.token, { expires: 1 });
      Cookies.set("user_Role", data.role, { expires: 1 });
      toast({
        title: "Login berhasil.",
        description: "Anda akan diarahkan ke Tambah Warisan Budaya.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom-right",
      });
      setTimeout(() => {
        if (data.role === "ADMIN") {
          window.location.href = "/admin/dashboard"; // Misal ke dashboard admin
        } else {
          window.location.href = "/tambah-wb"; // Arahkan pengguna biasa ke halaman ini
        }
      });
    } catch (err) {
      setAlertMessage("Login gagal! Email atau password salah.");
      setAlertType("error");
      // Menggunakan toast Chakra UI untuk notifikasi error
      toast({
        title: "Login gagal.",
        description: "Periksa kembali email atau password Anda.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{
          y: 10,
          opacity: 0,
        }}
        ref={ref}
        animate={controls}
        className="w-full h-screen px-5 pt-24 pb-5 md:px-10 md:max-w-xl flex mx-auto items-center"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidation}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-full flex flex-col gap-5 px-10 py-10 shadow-lg rounded-[20px]">
              <FormTitle
                titleh1={"Halo wargi!"}
                titleh2={"Wilu jeung sumping"}
              />

              <div className="grid grid-cols-1 gap-5">
                <InputForm
                  type={"email"}
                  id={"email"}
                  name={"email"}
                  placeholder={"Masukan email anda"}
                />
                <ErrorForm name={"email"} component={"div"} />

                <InputForm
                  type={"password"}
                  id={"password"}
                  name={"password"}
                  placeholder={"Masukan password anda"}
                />
                <ErrorForm name={"password"} component={"div"} />

                {alertMessage && (
                  <Alert status={alertType} borderRadius="full">
                    <AlertIcon />
                    <Box __css={{ display: "flex", alignItems: "center" }}>
                      <AlertTitle>
                        {alertType === "success" ? "Sukses" : "Error"}
                      </AlertTitle>
                      <AlertDescription>{alertMessage}</AlertDescription>
                    </Box>
                  </Alert>
                )}

                <ButtonLogin type="submit" disabled={loading || isSubmitting}>
                  {loading ? <Spinner size="sm" /> : "Masuk"}
                </ButtonLogin>

                <LoginSignup
                  children={"Belum punya akun ?"}
                  toForm={" Daftar"}
                  linkTo="/daftar"
                />
              </div>
            </Form>
          )}
        </Formik>
      </motion.div>
      <FooterLayout />
    </>
  );
};

export default LoginLayout;
