const express = require("express");
const cors = require("cors");
const path = require("path");

const dotenv = require("dotenv");
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// Menyajikan folder 'images/uploads' sebagai folder statis
app.use("/images/uploads", express.static(path.join(__dirname, "../images/uploads")));

const user = require("./user/user.controllers");
const warisanBudaya = require("./wb/wb.controllers")
const eventWB = require("./event/event.controllers")

app.use("/user", user);
app.use("/wb", warisanBudaya);
app.use("/event", eventWB);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
