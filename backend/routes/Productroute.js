const express = require("express");
const router = express.Router();

const {
  getProduct,
  postProduct,
  deleteProduct,
  updateProduct,
} = require("../controller/productController");

const authMiddleware = require("../middleware/authMiddleware"); // ✅ MATCHES FILE NAME

router.get("/product", getProduct);
router.post("/postproduct", authMiddleware, postProduct);
router.delete("/deleteproduct/:id", authMiddleware, deleteProduct);
router.put("/updateproduct/:id", authMiddleware, updateProduct);

module.exports = router;

