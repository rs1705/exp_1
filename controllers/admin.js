const Product = require("../models/product");
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const desc = req.body.description;
  const price = req.body.price;
  const product = new Product(title, price, imageUrl, desc, null, req.user._id);
  product.save().then((result) => {
    console.log(result);
    res.redirect("/products");
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const prodId = req.params.productId;
  Product.fetchById(prodId).then((product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImage = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

  let objectId;
  try {
    objectId = new ObjectId(prodId);
  } catch (err) {
    console.error("Invalid productId:", prodId);
    return res.redirect("/admin/products");
  }

  const product = new Product(
    updatedTitle,
    updatedPrice,
    updatedImage,
    updatedDescription,
    objectId
  );

  product
    .save()
    .then((result) => {
      console.log("updated result", result);
      res.redirect("/admin/products");
    })
    .catch((e) => console.log(e));
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.body.productId;
  Product.deleteById(id).then(() => res.redirect("/admin/products"));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((e) => console.log(e));
};
