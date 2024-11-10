const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const {
  getAllUsers,
  getUsersById,
  createUser,
  deleteUser,
  updateUserById,
  patchUserById,
  getUsersByEmail,
} = require("./user.services");

router.get("/", async (req, res) => {
  const users = await getAllUsers();
  res.send(users);
});

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const users = await getUsersById(userId);
    res.send(users);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const newUser = req.body;
  try {
    const user = await createUser(newUser);
    res.send({
      data: user,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post("/daftar", async (req, res) => {
  const newUser = req.body;
  const confPassword = req.body.confPassword;
  if (newUser.password !== confPassword) {
    return res.status(400).send({ message: "Password tidak sesuai" });
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(newUser.password, salt);
  newUser.password = hashedPassword;
  try {
    const user = await createUser(newUser);
    res.send({
      data: user,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await deleteUser(userId);
    res.send({
      data: user,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const newUser = req.body;

  try {
    if (!newUser.username || !newUser.email) {
      return res
        .status(400)
        .send({ message: "Username, email and password are required" });
    }
    const user = await updateUserById(id, newUser);
    res.send({
      data: user,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const newUser = req.body;

  try {
    if (!newUser.username || !newUser.email || !newUser.password) {
      return res
        .status(400)
        .send({ message: "Username, email and password are required" });
    }

    const user = await patchUserById(id, newUser);
    res.send({
      data: user,
      message: "User updated successfully",
    });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

router.post("/masuk", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email dan password wajib diisi" });
    }

    const user = await getUsersByEmail(email);
    if (!user || user.length === 0) {
      return res.status(404).send({ message: "Pengguna tidak ditemukan" });
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Password salah" });
    }

    // Menggunakan user[0].id dan role untuk memasukkan ID dan role ke dalam token JWT
    const token = jwt.sign(
      { id: user[0].id, email: user[0].email, role: user[0].role }, // Tambahkan role di sini
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("access_Token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // Cookie berlaku selama 1 hari
    });

    res.send({
      message: "Login berhasil",
      token,
      role: user[0].role, // Kirim role ke respons
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});



module.exports = router;
