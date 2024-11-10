import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import InputForm from "../../fragments/inputform/InputForm";
import Button from "../../fragments/button/ButtonForm";
import {
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import ErrorForm from "../../fragments/errorform/ErrorForm";
import LabelTambahWb from "../../fragments/labeltambahwb/LabelTambahWb";
import { validationSchema } from "../../../validations/TambahWbValidation";
import UpdateWbService from "../../../services/UpdateWb";
import FetchAllWb from "../../../services/FetchAllWb";
import SelectField from "../../fragments/selectfield/SelectField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const UpdateWbLayout = () => {
  const { id } = useParams();
  const [wb, setWb] = useState(null);
  const [loading, setLoading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const wbData = await FetchAllWb();
      const selectedWb = wbData.find((item) => item.id === id);
      setWb(selectedWb || null);

      if (selectedWb) {
        setThumbnailPreview(selectedWb.thumbnail);
        setGalleryPreview(selectedWb.galeri || []);
      }
    };
    fetchData();
  }, [id]);

  const initialValues = wb
    ? {
        namaTempat: wb.name,
        deskripsi: wb.desc,
        kategoriTempat: wb.category,
        tipeTempat: wb.type,
        kabupaten: wb.kabupaten,
        kecamatan: wb.kecamatan,
        alamat: wb.address,
        youtube: wb.youtube,
        thumbnail: null,
        galeri: null,
      }
    : {};

  const onSubmit = async (values) => {
    setLoading(true);
    setAlertMessage(null);
    const formData = new FormData();

    formData.append("name", values.namaTempat);
    formData.append("desc", values.deskripsi);
    formData.append("category", values.kategoriTempat);
    formData.append("type", values.tipeTempat);
    formData.append("kabupaten", values.kabupaten);
    formData.append("kecamatan", values.kecamatan);
    formData.append("address", values.alamat);
    formData.append("youtube", values.youtube);

    if (values.thumbnail) {
      formData.append("thumbnail", values.thumbnail);
    } else {
      formData.append("thumbnail", wb.thumbnail);
    }

    if (values.galeri) {
      values.galeri.forEach((file) => {
        formData.append("galeri", file);
      });
    } else {
      wb.galeri.forEach((file) => {
        formData.append("galeri", file.url);
      });
    }

    try {
      await UpdateWbService(id, formData);
      setAlertMessage("Data berhasil diperbarui.");
      setAlertType("success");
      toast({
        title: "Data berhasil diperbarui.",
        description: "Perubahan telah disimpan.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "bottom-right",
      });
      setTimeout(() => {
        window.location.href = "/admin/dashboard/wb";
      }, 2000);
    } catch (err) {
      setAlertMessage("Data gagal diperbarui");
      setAlertType("error");
      toast({
        title: "Data gagal diperbarui.",
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
    const files = event.target.files;
    const fileArray = Array.from(files);
    const filePreviews = fileArray.map((file) => URL.createObjectURL(file));

    // Update the form state
    setFieldValue("galeri", fileArray);
    setGalleryPreview([...galleryPreview,...filePreviews]); // Merge with existing previews
  };

  const handleDeletePreview = (indexToDelete) => {
    const updatedGalleryPreview = galleryPreview.filter(
      (_, index) => index !== indexToDelete
    );

    setGalleryPreview(updatedGalleryPreview);
    setFieldValue("galeri", updatedGalleryPreview);
  };

  if (!wb)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: { delay: 0.5, duration: 1 },
      }}
      className="w-full px-5 md:px-24"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="flex flex-col gap-5 max-w-xl mx-auto">
            <h1 className="font-poppins text-navyy text-lg font-bold ">
              Perbarui Data Warisan Budaya
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
              selected={wb.category}
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
              selected={wb.type}
              setFieldValue={setFieldValue}
            />
            <SelectField
              label="Kabupaten"
              name="kabupaten"
              selected={wb.kabupaten}
              options={["Kabupaten Bandung"]}
              setFieldValue={setFieldValue}
            />
            <SelectField
              label="Kecamatan"
              name="kecamatan"
              selected={wb.kecamatan}
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
            <div className="grid grid-cols-1 gap-2">
              <LabelTambahWb>Thumbnail</LabelTambahWb>
              <input
                type="file"
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
                accept="image/*"
                multiple
                onChange={(event) => handleGalleryChange(event, setFieldValue)}
              />
              {galleryPreview.length > 0 && (
                <div className="mt-2 flex gap-5">
                  {galleryPreview.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview.url ? preview.url : preview}
                        alt={`Preview ${index}`}
                        className="w-24 h-20 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeletePreview(index)}
                        className="absolute -top-2 -right-2 bg-orangee text-white rounded-full p-2 flex items-center justify-center text-sm"
                      >
                        <FontAwesomeIcon icon={faX} className=""/>
                      </button>
                    </div>
                  ))}
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
              {loading ? <Spinner size="sm" /> : "Perbarui Data"}
            </Button>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default UpdateWbLayout;
