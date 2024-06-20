
const db = require("../../models");
const products = db.products

class productController{
    async createProduct(req, res, next){
        try{
            const {name, price, description, point } = req.body

            if(!req.user.merchantId ){
                throw new Error("tidak dapat membuat product")
            }

            const data = { merchant_id: req.user.merchantId , name, price, description, point }

            const product =  await products.create(data)

            return res.status(201).json({
                status: 'success',
                message: 'create product berhasil',
                data: product
            })
        }catch(err){
            return res.status(400).json({
                status: 'error',
                message: err.message
            })
        }
    }

    async listProduct(req, res, next){
        try{

            if(!req.user.merchantId ){
                throw new Error("tidak dapat melihat product karena anda bukan merchant")
            }

            const product =  await products.findAll({where:{merchant_id: req.user.merchantId}})

            return res.status(200).json({
                status: 'success',
                message: 'list product berhasil ditampilkan',
                data: product
            })
        }catch(err){
            return res.status(400).json({
                status: 'error',
                message: err.message
            })
        }
    }

    async detail(req, res, next){
        try{
            const product =  await products.findOne({where: {id: req.params.id}})

            return res.status(200).json({
                status: 'success',
                message: 'detail product berhasil ditampilkan',
                data: product
            })
        }catch(err){
            return res.status(400).json({
                status: 'error',
                message: err.message
            })
        }
    }
} 

module.exports = productController