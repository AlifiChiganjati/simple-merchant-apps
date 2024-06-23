const db = require("../../models");
const users = db.users;
const merchants = db.merchants;
const jwt = require("jsonwebtoken");

class merchantController {
  async registerMerchant(req, res, next) {
    try {
      const { userId, merchantName, merchantAddress } = req.body;

      const findUsers = await users.findOne({ where: { id: userId } });

      if (!findUsers) {
        throw new Error("user tidak ditemukan");
      }

      const findMerchant = await merchants.findAll({
        where: { user_id: userId },
      });

      if (findMerchant.length > 0) {
        throw new Error("user telah memiliki merchants");
      }

      const data = {
        user_id: userId,
        merchant_name: merchantName,
        merchant_address: merchantAddress,
      };

      const userRepo = await merchants.create(data);

      return res.status(201).json({
        status: "success",
        message: "Register merchant berhasil",
        Data: {
          userData: userRepo,
          merchantData: findMerchant,
        },
      });
    } catch (err) {
      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    }
  }

  // async listMerchant(req, res, next) {
  //   try {
  //     const findMerchant = await merchants.findAll();
  //     return res.status(200).json({
  //       status: "success",
  //       message: "list merchant berhasil ditampilkan",
  //       data: findMerchant,
  //     });
  //   }catch(err){
  //       return res.status(400).json({
  //           status: 'error',
  //           message: err.message
  //       })
  //   }
}

module.exports = merchantController;
