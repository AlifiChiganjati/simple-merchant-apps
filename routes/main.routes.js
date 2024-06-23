const user = require("./user/user.routes");
const merchant = require("./merchant/merchant.routes");
const product = require("./product/product.routes");
const transaction = require("./transaction/transaction.routes");

const api = "/api/v1";

const router = (app) => {
  app.use(`${api}/user`, user);
  app.use(`${api}/merchant`, merchant);
  app.use(`${api}/product`, product);
  app.use(`${api}/transaction`, transaction);
};

module.exports = router;
