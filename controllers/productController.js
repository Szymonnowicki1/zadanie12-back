const Product = require("../models/productModel");
const mongoose = require("mongoose");

const getProducts = async (req, res) => {
  const products = await Product.find({});

  if (!products) {
    return res.status(404).json({ error: "No products could be found" });
  }

  res.status(200).json(products);
};

const addProduct = async (req, res) => {
  const { name, price, description, quantity, unit } = req.body;

  try {
    const product = await Product.create({
      name,
      price,
      description,
      quantity,
      unit,
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No product with this id" });
  }

  const product = await Product.findOneAndDelete({ _id: id });

  if (!product) {
    return res.status(404).json({ error: "No product with this id" });
  }

  res.status(200).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, quantity, unit } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No product with this id" });
  }

  const product = await Product.findOneAndUpdate(
    { _id: id },
    { $set: { name, price, description, quantity, unit } }
  );

  if (!product) {
    return res.status(404).json({ error: "No product with this id" });
  }

  res.status(200).json(product);
};

const getRaport = async (req, res) => {
  const pipeline = [
    {
      $group: {
        _id: null,
        totalQuantity: { $sum: "$quantity" },
        totalValue: { $sum: { $multiply: ["$quantity", "$price"] } },
      },
    },
  ];

  try {
    const result = await Product.aggregate(pipeline);
    const resultArray = Array.isArray(result) ? result : await result.toArray();

    res.json(resultArray[0] || { totalQuantity: 0, totalValue: 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  getRaport,
};