const Product = require("../models/product");
const Order = require("../models/order");
exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/product-list", {
        products: products,
        pageTitle: "Products",
        path: "/products",
      });
    })
    .catch((error) => console.log(error));
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
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
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items;
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
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.redirect("/cart");
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  req.user
    .removeFromCart(prodId)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({"user.userId":req.user._id})
    .then((orders) => {
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
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, productData: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user,
        },
        products: products,
      });
      return order.save();
    })
    .then((result) => {
      return req.user.clearCart();
      
    }).then(()=>{
      res.redirect("/orders");
    })
    .catch((e) => console.log(e));
};
exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        products: products,
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
