const jwt = require('jsonwebtoken')
const db = require("../models");
const users = db.users
const merchants = db.merchants
require('dotenv').config()

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')

        const decoded = jwt.decode(token, process.env.JWT_SECRET)

        let findUser = await users.findOne({email: decoded.email})

        if(!findUser)throw new Error("please authenticate");

        let role = 'CUSTOMER'
            
        const checkMerchant = await merchants.findOne({userId: findUser.id})

        if(checkMerchant){
            role = 'MERCHANT'
        }

        req.user = {
            user: {
                id: findUser.id,
                name: findUser.fullname,
                point: findUser.point
            },
            role,
            merchantId: checkMerchant.id
        }
         
        next()
    }catch(err){
        console.log(err)
        res.status(401).send({ error: 'please authenticate'})
    }
}

module.exports = auth