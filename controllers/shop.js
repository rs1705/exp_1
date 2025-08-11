const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All products",
      path: "/products",
    });
  });
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.fetchById(prodId, (product) => {
    res.render("shop/product-detail", {
      product: product,
      path: "/products",
      pageTitle: product.title,
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Your cart",
    path: "/cart",
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your orders",
    path: "/orders",
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};

exports.notFound = (req, res, next) => {
  res.status(404).render("404", { pageTitle: "404 not found" });
};
