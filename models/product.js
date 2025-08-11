const fs = require("fs");
const path = require("path");
const Cart= require("./cart")
const pth = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);
const getProductsFromFile = (cb) => {
  fs.readFile(pth, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, desc, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = desc;
    this.price = parseFloat(price);
  }

  static deleteById(id){
    getProductsFromFile((products) => {
      const product=products.find(prod=>prod.id===id)
      const updatedProducts = products.filter(prod => prod.id !== id);
      fs.writeFile(pth,JSON.stringify(updatedProducts),err=>{
        if(!err){
          Cart.deleteProduct(id,product.price)
        }
      })
    });
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (p) => p.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(pth, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(pth, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static fetchById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find(prod=> prod.id === id);
      cb(product);
    });
  }
};
