const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const productRoutes = require("./routes/product.route");
const path = require("path");
dotenv.config();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json());

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server is running");
  connectDB();
});
