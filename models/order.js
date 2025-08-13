const sequelize = require("sequelize");
const seq = require("../utils/database");

const Order = seq.define("order", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Order;
