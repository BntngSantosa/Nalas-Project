import React, { useState } from "react";
import FooterLayout from "./FooterLayout";
import ButtonDaftar from "../fragments/button/ButtonForm";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import { daftarValidation } from "../../validations/DaftarValidation";
import daftarUser from "../../services/SignUpService";
import FormTitle from "../fragments/formtitle/FormTitle";
import InputForm from "../fragments/inputform/InputForm";
import ErrorForm from "../fragments/errorform/ErrorForm";
import LoginSignup from "../fragments/loginorsignup/LoginSignup";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Spinner,
  useToast,
} from "@chakra-ui/react";

const DaftarLayout = ({ duration }) => {
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const toast = useToast();
  const { ref, controls } = useScrollAnimation({ duration });

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confPassword: "",
  };

  const onSubmit = async (values) => {
    setLoading(true);
    setAlertMessage(null);
    try {
      const data = await daftarUser(
        values.username,
        values.email,
        values.password,
        values.confPassword
      );
      setAlertMessage("Daftar berhasil! Anda akan diarahkan.");
      setAlertType("success");
      toast({
        title: "Daftar berhasil.",
        description: "Anda akan diarahkan ke halaman Masuk.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom-right",
      });
      setTimeout(() => {
        window.location.href = "/masuk";
      }, 2000);
    } catch (err) {
      setAlertMessage("Daftar gagal! Email atau password salah.");
      setAlertType("error");
      // Menggunakan toast Chakra UI untuk notifikasi error
      toast({
        title: "Daftar gagal.",
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
          validationSchema={daftarValidation}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-full flex flex-col gap-5 px-10 py-10 shadow-lg rounded-[20px]">
              <FormTitle
                titleh1={"Halo wargi!"}
                titleh2={"Silahkan daftar untuk melanjutkan"}
              />

              <div className="grid grid-cols-1 gap-5">
                <InputForm
                  type={"text"}
                  id={"username"}
                  name={"username"}
                  placeholder={"Masukan username anda"}
                />
                <ErrorForm name={"username"} component={"div"} />

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

                <InputForm
                  type={"password"}
                  id={"confPassword"}
                  name={"confPassword"}
                  placeholder={"Konfirmasi password anda"}
                />
                <ErrorForm name={"confPassword"} component={"div"} />

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

                <ButtonDaftar type="submit" disabled={loading || isSubmitting}>
                  {loading ? <Spinner size="sm" /> : "Daftar"}
                </ButtonDaftar>

                <LoginSignup
                  children={"Sudah punya akun ?"}
                  linkTo="/masuk"
                  toForm={" Masuk"}
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

export default DaftarLayout;
