// const mongodb = require("mongodb");
// const getDb = require("../utils/database").getDb;
// class Product {
//   constructor(title, price, imageUrl, description, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//     this.userId = userId;
//   }
//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       dbOp = db
//         .collection("products")
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection("products").insertOne(this);
//     }
//     return dbOp
//       .then((res) => {
//         console.log("Inserted the data");
//         console.log(res);
//       })
//       .catch((e) => {
//         console.log(e.message);
//       });
//   }

//   static fetchAll = () => {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         console.log(products);
//         return products;
//       })
//       .catch((error) => console.log(error));
//   };

//   static fetchById = (id) => {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: new mongodb.ObjectId(String(id)) })
//       .next()
//       .then((product) => {
//         return product;
//       })
//       .catch((err) => console.log(err));
//   };

//   static updateById = (id, updatedProduct) => {
//     const db = getDb();
//     return db
//       .collection("products")
//       .updateOne({ _id: new mongodb.ObjectId(id) }, updatedProduct)
//       .then((result) => {
//         console.log("updated");
//       })
//       .catch((err) => console.log(err));
//   };

//   static deleteById(id) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .deleteOne({ _id: new mongodb.ObjectId(id) })
//       .then((result) => console.log("Deleted"))
//       .catch((err) => console.log(err));
//   }
// }

// module.exports = Product;
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId:{
    type:schema.Types.ObjectId,
    ref:"User",
    required:true,
  }
});

module.exports = mongoose.model("Product", productSchema);
