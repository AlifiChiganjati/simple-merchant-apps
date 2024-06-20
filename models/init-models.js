var DataTypes = require("sequelize").DataTypes;
var _merchants = require("./merchants");
var _products = require("./products");
var _transactions = require("./transactions");
var _transactions_detail = require("./transactions_detail");
var _users = require("./users");

function initModels(sequelize) {
  var merchants = _merchants(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var transactions = _transactions(sequelize, DataTypes);
  var transactions_detail = _transactions_detail(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  transactions.belongsTo(merchants, { as: "merchant", foreignKey: "merchant_id"});
  merchants.hasMany(transactions, { as: "transactions", foreignKey: "merchant_id"});
  transactions_detail.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(transactions_detail, { as: "transactions_details", foreignKey: "product_id"});
  transactions_detail.belongsTo(transactions, { as: "transaction", foreignKey: "transaction_id"});
  transactions.hasMany(transactions_detail, { as: "transactions_details", foreignKey: "transaction_id"});
  merchants.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(merchants, { as: "merchants", foreignKey: "user_id"});
  transactions.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(transactions, { as: "transactions", foreignKey: "user_id"});

  return {
    merchants,
    products,
    transactions,
    transactions_detail,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
