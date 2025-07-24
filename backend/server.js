const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const productRoutes = require("./routes/product.route");
const PORT = process.env.PORT || 5000;
dotenv.config();

app.use(express.json());

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log("Server is running");
  connectDB();
});
