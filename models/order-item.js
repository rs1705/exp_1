const sequelize = require("sequelize");
const seq = require("../utils/database");

const OrderItem = seq.define("orderItem", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: { type: sequelize.INTEGER },
});

module.exports = OrderItem;
