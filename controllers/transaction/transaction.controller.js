
const db = require("../../models");
const users = db.users
const products = db.products
const transactions = db.transactions
const transactions_detail = db.transactions_detail

class transactionController{
    async createTransaction(req, res, next){
        try{

            const transactionsData = req.body.transactionsData

            const productIds = transactionsData.map((data) => {
                return data.productId;
            });

            const getAllProductsByProductIds = await products.findAll({where: {id: productIds}})

            let point_total = 0;
            let subtotal = 0;
            const insertDetailData = []

            for(let i = 0; i < transactionsData.length; i++){
                const product = getAllProductsByProductIds.find((x) => x.id === transactionsData[i].productId)
                point_total += product.point
                subtotal += Number(product.price * transactionsData[i].qty)
                const payloadToInsert = {
                    productId: product.id,
                    qty: transactionsData[i].qty,
                    point: product.point,
                    total:  Number(product.price * transactionsData[i].qty),
                }

                insertDetailData.push(payloadToInsert)
            }

            const constructTransactionData = {
                user_id: req.user.user.id,
                merchant_id: req.body.merchant_id,
                transactions_no: Math.floor(1000 + Math.random() * 9000),
                point_total,
                subtotal
            }

            const transactionData = await transactions.create(constructTransactionData)

            for(let i = 0; i < insertDetailData.length; i++){
                const payloadToInsert = {
                    product_id: insertDetailData[i].productId,
                    qty: insertDetailData[i].qty,
                    point: insertDetailData[i].point,
                    total: insertDetailData[i].total,
                    transaction_id: transactionData.id,
                }

                await transactions_detail.create(payloadToInsert)
                
            } 

            await users.update(
                { point: Number(req.user.user.point) + point_total },
                {
                  where: {
                    id: req.user.user.id,
                  },
                },
              );

            return res.status(201).json({
                status: 'success',
                message: 'create transaksi berhasil',
                data: transactionData
            })
        }catch(err){
            return res.status(400).json({
                status: 'error',
                message: err.message
            })
        }
    }
} 

module.exports = transactionController