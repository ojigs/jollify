const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config/.env" });
const PORT = process.env.PORT;
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const { errorHandler } = require("./middleware/errorHandler");

connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("MERN music app");
});

app.use("/user", userRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
