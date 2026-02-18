const express = require("express");
const router = express.Router();
const { validate, signupSchema, loginSchema, updateProfileSchema } = require("../util/joiValidation");
const { verifyAuth } = require("../util/verifyAuth");
const asyncWrap = require("../util/asyncWrap");
const upload = require("../util/upload");

const { signup, login, logout, checkAuth, updateProfile } = require("../controllers/authController");

// Auth Routes
router.post("/signup", upload.single("profileImage"), validate(signupSchema), asyncWrap(signup));
router.post("/login", validate(loginSchema), asyncWrap(login));
router.get("/logout", logout);
router.get("/check", verifyAuth, checkAuth);
router.put("/profile", verifyAuth, upload.single("profileImage"), validate(updateProfileSchema), asyncWrap(updateProfile));

module.exports = router;
