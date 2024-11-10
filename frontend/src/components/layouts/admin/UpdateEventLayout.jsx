import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FetchEventById from "../../../services/FetchEventById";
import { motion } from "framer-motion";
import { Form, Formik } from "formik";
import Button from "../../fragments/button/ButtonForm";
import { validationSchema } from "../../../validations/TambahWbValidation";
import InputForm from "../../fragments/inputform/InputForm";
import ErrorForm from "../../fragments/errorform/ErrorForm";
import LabelTambahWb from "../../fragments/labeltambahwb/LabelTambahWb";
import UpdateEventService from "../../../services/UpdateEvent";

export default function UpdateEventLayout() {
  const [eventWb, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const { id } = useParams();
  const toast = useToast();

  useEffect(() => {
    const fetchEventData = async () => {
        const eventData = await FetchEventById(id);
      setEvent(eventData);
      if (eventData) {
        setThumbnailPreview(eventData.thumbnail);
      }
    };
    fetchEventData();
  }, [id]);

  const initialValues = eventWb
    ? {
        namaEvent: eventWb.name,
        deskripsi: eventWb.desc,
        alamat: eventWb.address,
        tanggalEvent: new Date(eventWb.date).toISOString().split("T")[0],
        call: eventWb.call,
        email: eventWb.email,
        thumbnail: null,
      }
    : {};

  const onSubmit = async (values) => {
    setLoading(true);
    setAlertMessage(null);
    const formData = new FormData();

    const dateEventISO = new Date(values.tanggalEvent).toISOString();

    formData.append("name", values.namaEvent);
    formData.append("desc", values.deskripsi);
    formData.append("date", dateEventISO);
    formData.append("address", values.alamat);
    formData.append("call", values.call);
    formData.append("email", values.email);

    if (values.thumbnail) {
      formData.append("thumbnail", values.thumbnail);
    } else {
      formData.append("thumbnail", eventWb.thumbnail);
    }

    try {
      await UpdateEventService(id, formData);
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
        window.location.href = "/admin/dashboard/event";
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

  if (!eventWb)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );

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
        className="w-full px-5 md:px-24"
      >
        <Formik
          initialValues={initialValues}
        //   validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className="flex flex-col gap-5 max-w-xl mx-auto">
              <h1 className="font-poppins text-navyy text-lg font-bold ">
                Update Data Event
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
                {loading ? <Spinner size="sm" /> : "Perbarui data"}
              </Button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </>
  );
}
