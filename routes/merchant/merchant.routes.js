const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

const merchantController = require('../../controllers/merchant/merchant.controller')

router.post('/register', auth, async(req, res, next) => await new merchantController().registerMerchant(req, res, next))

module.exports = router