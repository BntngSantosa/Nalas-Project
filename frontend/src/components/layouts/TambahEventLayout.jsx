import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import tambahEvent from "../../services/TambahEventService";
import { Form, Formik } from "formik";
import InputForm from "../fragments/inputform/InputForm";
import ErrorForm from "../fragments/errorform/ErrorForm";
import LabelTambahWb from "../fragments/labeltambahwb/LabelTambahWb";
import {
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Box,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { validationSchema } from "../../validations/TambahEventValidation";
import Button from "../fragments/button/ButtonForm";
import { motion } from "framer-motion";

const initialValues = {
  namaEvent: "",
  deskripsi: "",
  alamat: "",
  tanggalEvent: "",
  call: "",
  email: "",
  thumbnail: null,
};

const TambahEventLayout = ({paddingTop, location}) => {
  const [loading, setLoading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const toast = useToast();

  const onSubmit = async (values) => {
    setLoading(true);
    setAlertMessage(null);
    const formData = new FormData();

    const token = Cookies.get("access_Token");
    let authorId;

    if (token) {
      const decodedToken = jwtDecode(token);
      authorId = decodedToken.id;
      console.log("Author ID:", authorId);
    }

    const dateEventISO = new Date(values.tanggalEvent).toISOString();

    formData.append("name", values.namaEvent);
    formData.append("desc", values.deskripsi);
    formData.append("date", dateEventISO);
    formData.append("address", values.alamat);
    formData.append("call", values.call);
    formData.append("email", values.email);
    formData.append("thumbnail", values.thumbnail);
    formData.append("authorId", authorId);

    try {
      const data = await tambahEvent(formData);
      
      console.log("Warisan Budaya berhasil ditambah:", data);
      setAlertMessage("Data berhasil diajukan.");
      setAlertType("success");
      toast({
        title: "Data berhasil diajukan.",
        description: "Tunggu konfirmasi dari admin.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom-right",
      });
      setTimeout(() => {
        window.location.href = location;
      }, 2000);
    } catch (err) {
      console.error("Error submitting data:", err.message);
      setAlertMessage("Data gagal diajukan");
      setAlertType("error");
      toast({
        title: "Data gagal diajukan.",
        description: "Periksa kembali data yang di ajukan",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleThumbnailChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue("thumbnail", file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  return (
    <>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            delay: 0.5,
            duration: 1,
          },
        }}
        className={`w-full px-5 pt-${paddingTop} pb-10 md:px-24`}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className="flex flex-col gap-5 max-w-xl mx-auto">
              <h1 className="font-poppins text-navyy text-lg font-bold ">
                Tambah Data Event
              </h1>
              <InputForm
                label="Nama Event"
                name="namaEvent"
                type="text"
                placeholder="Masukan nama Event"
              />
              <ErrorForm name="namaEvent" component={"div"} />

              <InputForm
                label="Deskripsi"
                name="deskripsi"
                type="text"
                placeholder="Masukan deskripsi"
              />
              <ErrorForm name="deskripsi" component={"div"} />

              <InputForm
                label="Alamat Lengkap"
                name="alamat"
                type="text"
                placeholder="Masukan alamat lengkap"
              />
              <ErrorForm name="alamat" component={"div"} />

              <InputForm
                label="Tanggal Event"
                name="tanggalEvent"
                type="date"
                placeholder="masukan Tanggal Event"
              />
              <ErrorForm name="tanggal" component={"div"} />

              <InputForm
                label="No Telepon"
                name="call"
                type="text"
                placeholder="masukan No Telepon (Opsional)"
              />
              <ErrorForm name="noTelepon" component={"div"} />

              <InputForm
                label="email"
                name="email"
                type="email"
                placeholder="masukan email (Opsional)"
              />
              <ErrorForm name="email" component={"div"} />

              {/* Input for Thumbnail */}
              <div className="grid grid-cols-1 gap-2">
                <LabelTambahWb>Thumbnail</LabelTambahWb>
                <input
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  onChange={(event) =>
                    handleThumbnailChange(event, setFieldValue)
                  }
                />
                {thumbnailPreview && (
                  <img
                    src={thumbnailPreview}
                    alt="Preview"
                    className="mt-2 w-20 rounded-md"
                  />
                )}
                <ErrorForm name="thumbnail" component={"div"} />
              </div>

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

              <Button type="submit" disabled={loading || isSubmitting}>
                {loading ? <Spinner size="sm" /> : "Tambah data"}
              </Button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </>
  );
};

export default TambahEventLayout;
