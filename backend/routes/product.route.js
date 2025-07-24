const express = require("express");
const mongoose = require("mongoose");
const { getProducts, createProduct, updateProduct, deleteProduct, getProduct } = require("../controller/product.controller");
const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
