const express = require("express");
const upload = require("../utils/multer.util");
const {
  getAllWb,
  createWB,
  getWbById,
  getWbBUseryId,
  deleteWb,
  updateWbById,
  patchWbById,
  getWbByTypeandStatus,
  updateStatusApproved,
  updateStatusRejected,
} = require("./wb.services");
const router = express.Router();
const path = require("path");
const BASE_URL = `http://localhost:${process.env.PORT}/images/uploads`;

router.get("/", async (req, res) => {
  const wb = await getAllWb();
  res.send(wb);
});

router.get("/:id", async (req, res) => {
  try {
    const wbId = req.params.id;
    const wb = await getWbById(wbId);
    res.send(wb);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

router.get("/type/:type/APPROVED", async (req, res) => {
  try {
    const wbType = req.params.type;
    const wb = await getWbByTypeandStatus(wbType, "APPROVED");
    res.send(wb);
  } catch (error) {
    console.error(error);
    res.status(404).send({ message: error.message });
  }
});

router.get("/author/:authorId", async (req, res) => {
  try {
    const authorId = req.params.authorId;
    const wb = await getWbBUseryId(authorId);
    res.send({
      data: wb,
      message: "Warisan Budaya fetched successfully",
    });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

router.post(
  "/",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "galeri", maxCount: 3 },
  ]),
  async (req, res) => {
    try {
      const neWB = req.body;

      // Menyimpan path gambar yang diupload
      const thumbnailPath = req.files["thumbnail"]
        ? req.files["thumbnail"][0].path.replace(/\\/g, "/")
        : null;

      if (!thumbnailPath) {
        return res.status(422).send({ message: "Thumbnail wajib diunggah" });
      }

      // Mengonversi path menjadi URL
      const thumbnailUrl = `${BASE_URL}/${path.basename(thumbnailPath)}`; // Mengambil nama file
      console.log(thumbnailUrl);

      // Menyimpan galeri URL
      const galeriPaths = req.files["galeri"]
        ? req.files["galeri"].map((file) => file.path.replace(/\\/g, "/"))
        : [];

      const galeriUrls = galeriPaths.map(
        (filePath) => `${BASE_URL}/${path.basename(filePath)}`
      );
      console.log(galeriUrls);

      // Menggabungkan path gambar dengan data warisan budaya lainnya
      const wb = await createWB({
        ...neWB,
        thumbnail: thumbnailUrl,
        galeri: galeriUrls, // Mengirimkan array galeri ke createWB
      });

      res.status(201).send({
        success: true,
        data: wb,
        message: "Warisan Budaya berhasil ditambahkan",
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: "Error saat menambahkan Warisan Budaya: " + error.message,
      });
    }
  }
);

router.delete("/:id", async (req, res) => {
  try {
    const wbId = req.params.id;
    const wb = await deleteWb(wbId);
    res.send({
      data: wb,
      message: "Data deleted successfully",
    });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

router.put(
  "/:id",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "galeri", maxCount: 5 },
  ]),
  async (req, res) => {
    const id = req.params.id;
    const newWb = req.body;

    try {
      if (
        !newWb.name ||
        !newWb.desc ||
        !newWb.category ||
        !newWb.type ||
        !newWb.kabupaten ||
        !newWb.kecamatan ||
        !newWb.address
      ) {
        return res.status(400).send({ message: "All fields are required" });
      }

      const thumbnailPath = req.files["thumbnail"]
        ? req.files["thumbnail"][0].path.replace(/\\/g, "/")
        : null;

      if (!thumbnailPath && !newWb.thumbnail) {
        return res.status(422).send({ message: "Thumbnail is required" });
      }

      const thumbnailUrl = thumbnailPath
        ? `${BASE_URL}/${path.basename(thumbnailPath)}`
        : newWb.thumbnail;

      const galeriPaths = req.files["galeri"]
        ? req.files["galeri"].map((file) => file.path.replace(/\\/g, "/"))
        : [];

      const galeriUrls = galeriPaths.map(
        (filePath) => `${BASE_URL}/${path.basename(filePath)}`
      );

      const wb = await updateWbById(id, {
        ...newWb,
        thumbnail: thumbnailUrl,
        galeri: galeriUrls.length > 0 ? galeriUrls : newWb.galeri,
      });

      res.send({
        data: wb,
        message: "Data updated successfully",
      });
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  }
);


router.patch(
  "/:id",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "galeri", maxCount: 5 },
  ]),
  async (req, res) => {
    const id = req.params.id;
    const newWb = req.body;

    try {
      if (
        !newWb.name ||
        !newWb.desc ||
        !newWb.category ||
        !newWb.type ||
        !newWb.kabupaten ||
        !newWb.kecamatan ||
        !newWb.address ||
        !newWb.youtube
      ) {
        return res.status(400).send({ message: "Data are required" });
      }

      // Menyimpan path gambar yang diupload
      const thumbnailPath = req.files["thumbnail"]
        ? req.files["thumbnail"][0].path
        : null;
      const galeriPath = req.files["galeri"]
        ? req.files["galeri"][0].path
        : null;

      // Mengonversi path menjadi URL
      const thumbnailUrl = thumbnailPath
        ? `${BASE_URL}/${thumbnailPath}`
        : null;
      const galeriUrl = galeriPath ? `${BASE_URL}/${galeriPath}` : null;

      const wb = await patchWbById(id, {
        ...newWb,
        thumbnail: thumbnailUrl, // Path gambar thumbnail
        galeri: galeriUrl, // Array path gambar dari multer
      });

      res.send({
        data: wb,
        message: "Data updated successfully",
      });
    } catch (error) {
      res.status(404).send({ message: error.message });
    }
  }
);

router.put("/approved/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const wb = await updateStatusApproved(id);
    res.status(200).send({
      data: wb,
      message: "Status updated successfully",
    });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

router.put("/rejected/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const wb = await updateStatusRejected(id);
    res.status(200).send({
      data: wb,
      message: "Status updated successfully",
    });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

module.exports = router;
