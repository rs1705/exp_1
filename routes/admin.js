const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");

//get=> /admin/get-product
router.get("/add-product", adminController.getAddProduct);

//post=> /admin/add-product
router.post("/add-product", adminController.postAddProduct);
router.get("/products", adminController.getProducts);

module.exports = router;
