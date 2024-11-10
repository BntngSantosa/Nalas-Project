const express = require("express");
const upload = require("../utils/multer.util");

const {
  getAllEvent,
  getEventById,
  getEventByUseryId,
  createEvent,
  deleteEvent,
  updateEventWbById,
  patchEventWbById,
  getEventByStatus,
  updateStatusApproved,
  updateStatusRejected,
} = require("./event.services");

const router = express.Router();
const BASE_URL = `http://localhost:${process.env.PORT}`;

router.get("/", async (req, res) => {
  const event = await getAllEvent();
  res.send(event);
});

router.get("/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await getEventById(eventId);
    res.send(event);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

router.get("/event-wb/APPROVED", async (req, res) => {
  try {
    const event = await getEventByStatus("APPROVED");
    res.send(event);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

router.get("/author/:authorId", async (req, res) => {
  try {
    const authorId = req.params.authorId;
    const event = await getEventByUseryId(authorId);
    res.send(event);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

router.post("/", upload.fields([{ name: "thumbnail", maxCount: 1 }]), async (req, res) => {
  try {
    const newEvent = req.body;

    // Menyimpan path gambar yang diupload
    const thumbnailPath = req.files['thumbnail'] ? req.files['thumbnail'][0].path : null;

    // Mengonversi path menjadi URL
    const thumbnailUrl = thumbnailPath ? `${BASE_URL}/${thumbnailPath}` : null;

    // Menggabungkan path gambar dengan data event lainnya
    const event = await createEvent({
      ...newEvent,
      thumbnail: thumbnailUrl,
    });

    res.send({
      data: event,
      message: "Event created successfully",
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await deleteEvent(eventId);
    res.send({
      data: event,
      message: "Data deleted successfully",
    });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

router.put("/:id", upload.single('thumbnail'), async (req, res) => {
  const id = req.params.id;
  const newEventWb = req.body;
  
  try {
    if (!newEventWb.name || !newEventWb.desc || !newEventWb.address || !newEventWb.date || !newEventWb.call || !newEventWb.email) {
      return res
        .status(400)
        .send({ message: "Data are required" });
    }

    // Menyimpan path gambar yang diupload
     const thumbnailPath = req.file ? req.file.path : null;

    // Mengonversi path menjadi URL
    const thumbnailUrl = thumbnailPath ? `${BASE_URL}/${thumbnailPath}` : null;

    const event = await updateEventWbById(id, {
      ...newEventWb,
      thumbnail : thumbnailUrl, // Path gambar thumbnail
    });

    res.send({
      data: event,
      message: "Data updated successfully",
    });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

router.patch("/:id", upload.single('thumbnail'), async (req, res) => {
  const id = req.params.id;
  const newEventWb = req.body;
  
  try {

    // Menyimpan path gambar yang diupload
     const thumbnailPath = req.file ? req.file.path : null;

    // Mengonversi path menjadi URL
    const thumbnailUrl = thumbnailPath ? `${BASE_URL}/${thumbnailPath}` : null;

    const event = await patchEventWbById(id, {
      ...newEventWb,
      thumbnail : thumbnailUrl, // Path gambar thumbnail
    });

    res.send({
      data: event,
      message: "Data updated successfully",
    });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

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
