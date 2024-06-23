const db = require("../../models");
const users = db.users;
const merchants = db.merchants;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

class userController {
  async register(req, res, next) {
    try {
      const { fullname, email } = req.body;

      const password = await bcrypt.hash(req.body.password, 8);

      const data = { fullname, password, email, point: 0 };

      const userRepo = await users.create(data);

      return res.status(201).json({
        status: "success",
        message: "Register user berhasil",
        data: userRepo,
      });
    } catch (err) {
      return res.status(400).json({
        status: "error",
        message: "email al",
      });
    }
  }

  async login(req, res, next) {
    try {
      let email = req.body.username;
      let password = req.body.password;

      let findUser = await users.findOne({ where: { email } });

      console.log(findUser);

      if (!findUser) throw new Error("Username atau password salah");

      let findUserPassword = findUser.password;

      let passwordCompare = await bcrypt.compare(password, findUserPassword);

      if (!passwordCompare) {
        throw new Error("maaf password tidak sesuai");
      }

      let role = "CUSTOMER";

      const checkMerchant = await merchants.findOne({
        where: { user_id: findUser.id },
      });

      if (checkMerchant) {
        role = "MERCHANT";
      }

      let userData = {
        userId: findUser.id,
        email: findUser.code,
        fullname: findUser.fullname,
        role,
      };
      let token = await jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: "3h",
      });

      return res.status(201).json({
        status: "success",
        message: "Login berhasil",
        data: {
          token,
          userData,
          merchantData: checkMerchant,
        },
      });
    } catch (err) {
      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    }
  }

  async userList(req, res, next) {
    try {
      const data = await users.findAll({});
      return res.status(200).json({
        status: "success",
        message: "user berhasil ditampilkan",
        data,
      });
    } catch (err) {
      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    }
  }
}

module.exports = userController;
