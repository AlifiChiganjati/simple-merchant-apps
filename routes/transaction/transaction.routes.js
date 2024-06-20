const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

const transactionController = require('../../controllers/transaction/transaction.controller')

router.post('/create', auth, async(req, res, next) => await new transactionController().createTransaction(req, res, next))

module.exports = router;