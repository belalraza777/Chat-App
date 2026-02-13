const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../util/cloudConfig");
const upload = multer({ storage });
const { validate, signupSchema, loginSchema } = require("../util/joiValidation");
const { verifyAuth } = require("../util/verifyAuth");
const asyncWrap = require("../util/asyncWrap");

const { signup, login, logout, checkAuth } = require("../controllers/authController");

// Auth Routes
router.post("/signup", upload.single("profileImage"), validate(signupSchema), asyncWrap(signup));
router.post("/login", validate(loginSchema), asyncWrap(login));
router.get("/logout", logout);
router.get("/check", verifyAuth, checkAuth);

module.exports = router;
