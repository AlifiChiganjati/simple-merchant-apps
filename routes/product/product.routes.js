const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const productController = require("../../controllers/product/product.controller");

router.post(
  "/create",
  auth,
  async (req, res, next) =>
    await new productController().createProduct(req, res, next),
);

router.get(
  "/list",
  auth,
  async (req, res, next) =>
    await new productController().listProduct(req, res, next),
);

router.put(
  "/update/:id",
  auth,
  async (req, res, next) =>
    await new productController().update(req, res, next),
);

router.delete(
  "/delete/:id",
  auth,
  async (req, res, next) =>
    await new productController().delete(req, res, next),
);

router.get(
  "/:id",
  auth,
  async (req, res, next) =>
    await new productController().detail(req, res, next),
);

module.exports = router;
