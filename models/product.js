const sequelize = require("sequelize");
const seq = require("../utils/database");

const Product = seq.define("product", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Product;
