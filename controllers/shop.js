const Product = require("../models/product");
const Cart = require("../models/cart");
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
  Cart.getProducts((cart) => {
    Product.fetchAll(products => {
      const cartProducts=[]
      for (let product of products){
        const cartProductData = cart.products.find(prod=> prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
        res.render("shop/cart", {
          pageTitle: "Your cart",
          path: "/cart",
          products: cartProducts
        });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.fetchById(prodId, (product) => {
    Cart.addProduct(prodId, parseFloat(product.price));
  });
  res.redirect("/cart");
};

exports.postCartDeleteProduct=(req, res,next)=>{
  const id = req.body.productId;
  Product.fetchById(id, product=>{
    Cart.deleteProduct(id,product.price)
    res.redirect("/cart")
  })
}

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
