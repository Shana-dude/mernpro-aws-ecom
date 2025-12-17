const express = require("express");
const { registerUser, loginUser } = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware"); // ✅ MATCHES FILE NAME

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    userId: req.user,
  });
});

module.exports = router;
