const express = require("express");
const router = express.Router();
const path = require("path");

const rootDir = require("../utils/path");
const products = [];
//get=> /admin/get-product
router.get("/add-product", (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
    activeAddProduct: true,
    productCss: true,
    formsCss: true,
  });
});

//post=> /admin/get-product

router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

exports.routes = router;
exports.products = products;
