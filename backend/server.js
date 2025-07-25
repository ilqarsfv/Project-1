const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const productRoutes = require("./routes/product.route");
const path = require("path");
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(path.resolve(), "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
});
