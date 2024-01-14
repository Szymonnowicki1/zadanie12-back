const express = require("express");
const {
  getProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  getRaport,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getProducts);

router.post("/", addProduct);

router.delete("/:id", deleteProduct);

router.put("/:id", updateProduct);

router.get("/raport", getRaport);

module.exports = router;