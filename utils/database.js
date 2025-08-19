const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://pathfinder:yfnTB9Pi5zft3m1p@cluster0.ezbowy4.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
  )
    .then((client) => {
      console.log("Connected to Mongo db");
      _db = client.db();
      callback();
    })
    .then((err) => {
      console.log(err);
    });
};
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No Database found!";
};
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
