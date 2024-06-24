const db = require("../../models");
const products = db.products;

class productController {
  async createProduct(req, res, next) {
    try {
      const { name, price, description, point } = req.body;

      if (!req.user.merchantId) {
        throw new Error("tidak dapat membuat product");
      }

      const data = {
        merchant_id: req.user.merchantId,
        name,
        price,
        description,
        point,
      };

      const product = await products.create(data);

      return res.status(201).json({
        status: "success",
        message: "create product berhasil",
        data: product,
      });
    } catch (err) {
      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    }
  }

  async listProduct(req, res, next) {
    try {
      if (!req.user.merchantId) {
        throw new Error(
          "tidak dapat melihat product karena anda bukan merchant",
        );
      }

      const product = await products.findAll({
        where: { merchant_id: req.user.merchantId },
      });

      return res.status(200).json({
        status: "success",
        message: "list product berhasil ditampilkan",
        data: product,
      });
    } catch (err) {
      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    }
  }

  async update(req, res, next) {
    try {
      const product = await products.findOne({ where: { id: req.params.id } });
      if (!product) {
        return res.status(404).json({
          status: "error",
          message: "Product not found",
        });
      }

      product.name = req.body.name;
      product.price = req.body.price;
      product.description = req.body.description;
      product.point = req.body.point;

      await product.save();
      return res.status(200).json({
        status: "success",
        message: "Product updated successfully",
        data: product,
      });
    } catch (err) {
      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    }
  }

  async delete(req, res, next) {
    try {
      const product = await products.findOne({ where: { id: req.params.id } });

      if (!product) {
        return res.status(404).json({
          status: "error",
          message: "Product not found",
        });
      }

      await product.destroy();
      return res.status(200).json({
        status: "success",
        message: "Product deleted successfully",
      });
    } catch (err) {
      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    }
  }

  async detail(req, res, next) {
    try {
      const product = await products.findOne({ where: { id: req.params.id } });

      return res.status(200).json({
        status: "success",
        message: "detail product berhasil ditampilkan",
        data: product,
      });
    } catch (err) {
      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    }
  }
}

module.exports = productController;
