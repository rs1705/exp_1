const sequelize = require("sequelize");

const seq = new sequelize.Sequelize("node-complete", "root", "12345", {
  dialect: "mysql",
  host: "localhost",
});

module.exports=seq;