const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config/.env" });
const PORT = process.env.PORT;
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes");

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("MERN music app");
});

app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
