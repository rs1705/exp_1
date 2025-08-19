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
    .then((cart) => {
      return cart.getProducts().then((products) => {
        res.render("shop/cart", {
          pageTitle: "Your cart",
          path: "/cart",
          products: products,
        });
      });
    })
    .catch((e) => console.log(e.messsage));
  // Cart.getProducts((cart) => {
  //   Product.fetchAll((products) => {
  //     const cartProducts = [];
  //     for (let product of products) {
  //       const cartProductData = cart.products.find(
  //         (prod) => prod.id === product.id
  //       );
  //       if (cartProductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }
  //     res.render("shop/cart", {
  //       pageTitle: "Your cart",
  //       path: "/cart",
  //       products: cartProducts,
  //     });
  //   });
  // });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let newQuantity = 1;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }

      return Product.findByPk(prodId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch();
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((e) => console.log(e));
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
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      let orderRef;
      return req.user
        .createOrder()
        .then((order) => {
          orderRef = order;
          return order.addProducts(
            products.map((product) => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .then(() => {
          return fetchedCart.setProducts(null);
        });
    })
    .then(() => {
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
