const sequelize = require("sequelize");
const seq = require("../utils/database");

const CartItem = seq.define("cartItem", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: { type: sequelize.INTEGER },
});

module.exports = CartItem;
