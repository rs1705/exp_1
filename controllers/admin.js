const Product = require("../models/product");

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
  const product = new Product(title, price, imageUrl, desc);
  product.save().then((result) => {
    console.log(result);
    res.redirect("/admin/add-product");
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const prodId = req.params.productId;
  Product.fetchById(prodId).then((product) => {
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
  const updatedDescription = req.body.description;
  const updatedPrice = req.body.price;

  const updatedProduct = {
    title: updatedTitle,
    imageUrl: updatedImage,
    description: updatedDescription,
    price: updatedPrice,
  };
  Product.updateById(prodId, updatedProduct)
    .then((result) => {
      console.log("updated result", result);
      res.redirect("/admin/products");
    })
    .catch((e) => console.log(e));
};

// exports.postDeleteProduct = (req, res, next) => {
//   const id = req.body.productId;
//   Product.destroy({ where: { id: id } }).then((result) => {
//     console.log(result);
//     res.redirect("/admin/products");
//   });
// };

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
