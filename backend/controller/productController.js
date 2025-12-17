const productModel = require("../model/Product");

// ✅ GET all products
exports.getProduct = async (req, res) => {
  try {
    const products = await productModel.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ POST new product
exports.postProduct = async (req, res) => {
  const { name, price, description, image } = req.body;

  try {
    const newProduct = new productModel({
      name,
      price,
      description,
      image,
    });

    await newProduct.save();
    res.status(201).json(newProduct);

  } catch (error) {
    console.error("🔥 REAL ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ DELETE product
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  const deleted = await productModel.findByIdAndDelete(id);

  if (!deleted) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.status(200).json({ message: "Product deleted successfully" });
};

// ✅ UPDATE product
exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  const { name, price, description, image } = req.body;

  try {
    const updated = await productModel.findByIdAndUpdate(
      id,
      { name, price, description, image },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updated);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
