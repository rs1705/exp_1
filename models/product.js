const mongodb = require("mongodb");
const getDb = require("../utils/database").getDb;
class Product {
  constructor(title, price, imageUrl, description) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }
  save() {
    const db = getDb();
    return db
      .collection("products")
      .insertOne(this)
      .then((res) => {
        console.log("Inserted the data");
        console.log(res);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }

  static fetchAll = () => {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((error) => console.log(error));
  };

  static fetchById = (id) => {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(id) })
      .next()
      .then((product) => {
        return product;
      })
      .catch((err) => console.log(err));
  };

  static updateById = (id, updatedProduct) => {
    const db = getDb();
    return db
      .collection("products")
      .updateOne({ _id: new mongodb.ObjectId(id) }, updatedProduct)
      .then((result) => {
        console.log("updated");
      })
      .catch((err) => console.log(err));
  };
}

module.exports = Product;
