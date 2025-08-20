const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((data) => {
      res.render("shop/product-list", {
        products: data,
        pageTitle: "Products",
        path: "/products",
      });
    })
    .catch((error) => console.log(error));
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.fetchById(prodId)
    .then((p) => {
      res.render("shop/product-detail", {
        product: p,
        path: "/products",
        pageTitle: p.title,
      });
    })
    .catch((e) => console.log(e.message));
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((products) => {
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Cart",
        products: products,
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.fetchById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.redirect("/cart");
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemFromCart(prodId)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((e) => {
      console.log(e);
      res.redirect("/cart");
    });
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      console.log(orders);
      res.render("shop/orders", {
        pageTitle: "Your orders",
        path: "/orders",
        orders: orders,
      });
    })
    .catch();
};
exports.postOrder = (req, res, next) => {
  req.user
    .addOrder()
    .then((result) => {
      res.redirect("/orders");
    })
    .catch((e) => console.log(e));
};
exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((data) => {
      res.render("shop/index", {
        products: data,
        pageTitle: "Shop",
        path: "/index",
      });
    })
    .catch((error) => console.log(error));
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
