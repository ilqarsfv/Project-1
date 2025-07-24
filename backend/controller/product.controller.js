const Product = require("../models/product.model");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.image || !product.price || !product.description) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const newProduct = await Product.create(product);
    console.log(newProduct);
    return res.status(201).json({ success: true, data: newProduct });
  }catch (error){
    console.error("Create Product Error:", error);
    return res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  try {
    const find = await Product.findById(id);
    if (!find) {
      return res.status(404).json({ message: "Product not found" });
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
    return res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ success: true, product: deletedProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct, getProduct };
