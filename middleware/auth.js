const jwt = require("jsonwebtoken");
const db = require("../models");
const users = db.users;
const merchants = db.merchants;
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    console.log("ini decoded", decoded);

    let findUser = await users.findOne({ email: decoded.email });

    if (!findUser) throw new Error("please authenticate");

    let role = "CUSTOMER";

    const checkMerchant = await merchants.findOne({
      user_id: findUser.id,
    });

    if (checkMerchant) {
      role = "MERCHANT";
    }
    if (checkMerchant) {
      req.user = {
        user: {
          id: findUser.id,
          name: findUser.fullname,
          point: findUser.point,
        },
        role,
        merchantId: checkMerchant.id,
      };
    } else {
      req.user = {
        user: {
          id: findUser.id,
          name: findUser.fullname,
          point: findUser.point,
        },
        role,
      };
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: "please authenticate" });
  }
};

module.exports = auth;
