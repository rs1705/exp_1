const express = require("express");
const { check, body } = require("express-validator");
const authController = require("../controllers/auth");
const User = require("../models/user");
const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .normalizeEmail(),
    body("password").isLength({ min: 6 }).isAlphanumeric().trim(),
  ],
  authController.postLogin
);

router.post(
  "/signup",
  check("email")
    .isEmail()
    .withMessage("Invalid email")
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject(
            "Email exists already. Please pick a different one!"
          );
        }
      });
    })
    .normalizeEmail(),
  body("password", "Kindly enter the password within specified limits.")
    .isLength({ min: 6 })
    .withMessage()
    .trim(),
  body("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords don't match!");
      }
      return true;
    })
    .trim(),
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);
router.post("/reset", authController.postReset);
router.get("/reset/:token", authController.getNewPassword);
router.post("/reset/:token", authController.postNewPassword);
router.post("/new-password", authController.postNewPassword);

module.exports = router;
