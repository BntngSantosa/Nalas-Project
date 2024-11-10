import React, { useState } from "react";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import InputForm from "../fragments/inputform/InputForm";
import Button from "../fragments/button/ButtonForm";
import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import ErrorForm from "../fragments/errorform/ErrorForm";
import LabelTambahWb from "../fragments/labeltambahwb/LabelTambahWb";
import { validationSchema } from "../../validations/TambahWbValidation";
import tambahWarisanBudaya from "../../services/TambahWb";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import SelectField from "../fragments/selectfield/SelectField";

const initialValues = {
  namaTempat: "",
  deskripsi: "",
  kategoriTempat: "",
  tipeTempat: "",
  kabupaten: "",
  kecamatan: "",
  alamat: "",
  youtube: "",
  thumbnail: null,
  galeri: null,
};

const TambahWarisanBudaya = ({paddingTop, location}) => {
  const [loading, setLoading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const toast = useToast();

  const onSubmit = async (values) => {
    setLoading(true);
    setAlertMessage(null);
    const formData = new FormData();

    const token = Cookie.get("access_Token");
    let authorId;

    if (token) {
      const decodedToken = jwtDecode(token);
      authorId = decodedToken.id;
      console.log("Author ID:", authorId);
    }

    formData.append("name", values.namaTempat);
    formData.append("desc", values.deskripsi);
    formData.append("category", values.kategoriTempat);
    formData.append("type", values.tipeTempat);
    formData.append("kabupaten", values.kabupaten);
    formData.append("kecamatan", values.kecamatan);
    formData.append("address", values.alamat);
    formData.append("youtube", values.youtube);
    formData.append("thumbnail", values.thumbnail);
    formData.append("authorId", authorId);

    values.galeri.forEach((file, i) => {
      formData.append("galeri", file);
    });

    try {
      const data = await tambahWarisanBudaya(formData);
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

  const handleGalleryChange = (event, setFieldValue) => {
    const files = Array.from(event.target.files);
    setFieldValue("galeri", files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setGalleryPreview(previews);
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
        className={`w-full px-5 pb-10 pt-${paddingTop} md:px-24`}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, isSubmitting }) => (
            <Form className="flex flex-col gap-5 max-w-xl mx-auto">
              <h1 className="font-poppins text-navyy text-lg font-bold ">
                Tambah Data Warisan Budaya
              </h1>
              <InputForm
                label="Nama Tempat"
                name="namaTempat"
                type="text"
                placeholder="Masukan nama"
              />
              <ErrorForm name="namaTempat" component={"div"} />

              <InputForm
                label="Deskripsi"
                name="deskripsi"
                type="text"
                placeholder="Masukan deskripsi"
              />
              <ErrorForm name="deskripsi" component={"div"} />

              <SelectField
                label="Kategori"
                name="kategoriTempat"
                options={["Warisan Budaya Benda", "Warisan Budaya Tak Benda"]}
                setFieldValue={setFieldValue}
              />
              <SelectField
                label="Tipe"
                name="tipeTempat"
                options={[
                  "Arsitektur",
                  "Naskah",
                  "Kerajinan Tradisional",
                  "Upacara Tradisional",
                  "Kesenian Tradisional",
                ]}
                setFieldValue={setFieldValue}
              />
              <SelectField
                label="Kabupaten"
                name="kabupaten"
                options={["Kabupaten Bandung"]}
                setFieldValue={setFieldValue}
              />
              <SelectField
                label="Kecamatan"
                name="kecamatan"
                options={[
                  "Arjasar",
                  "Baleendah",
                  "Banjaran",
                  "Bojongsoang",
                  "Cangkuang",
                  "Cicalengka",
                  "Cikancung",
                  "Cilengkrang",
                  "Cileunyi",
                  "Cimaung",
                  "Cimenyan",
                  "Ciparay",
                  "Ciwidey",
                  "Dayeuhkolot",
                  "Ibun",
                  "Katapang",
                  "Kertasari",
                  "Kutawaringin",
                  "Majalaya",
                  "Margaasih",
                  "Margahayu",
                  "Nagreg",
                  "Pacet",
                  "Pameungpeuk",
                  "Pangalengan",
                  "Paseh",
                  "Pasirjambu",
                  "Rancabali",
                  "Rancaekek",
                  "Solokanjeruk",
                  "Soreang",
                ]}
                setFieldValue={setFieldValue}
              />

              <InputForm
                label="Alamat Lengkap"
                name="alamat"
                type="text"
                placeholder="Masukan alamat lengkap"
              />
              <ErrorForm name="alamat" component={"div"} />

              <InputForm
                label="Youtube"
                name="youtube"
                type="text"
                placeholder="masukan link youtube (opsional)"
              />
              <ErrorForm name="youtube" component={"div"} />

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
                    className="mt-2 w-24 rounded-md"
                  />
                )}
                <ErrorForm name="thumbnail" component={"div"} />
              </div>

              {/* Input for Gallery */}
              <div className="grid grid-cols-1 gap-2">
                <LabelTambahWb>Galeri</LabelTambahWb>
                <input
                  type="file"
                  name="galeri"
                  accept="image/*"
                  multiple
                  onChange={(event) =>
                    handleGalleryChange(event, setFieldValue)
                  }
                />
                {galleryPreview.length > 0 && (
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <div className="flex gap-2">
                      {galleryPreview.map((preview, index) => (
                        <img
                          key={index}
                          src={preview}
                          alt={`Preview ${index}`}
                          className="w-24 rounded-md"
                        />
                      ))}
                    </div>
                  </div>
                )}
                <ErrorForm name="galeri" component={"div"} />
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

export default TambahWarisanBudaya;
