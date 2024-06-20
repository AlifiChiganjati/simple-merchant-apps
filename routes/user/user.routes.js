const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')

const userController= require('../../controllers/user/user.controller')

router.post('/register',  async(req, res, next) => await new userController().register(req, res, next))

router.post('/login',  async(req, res, next) => await new userController().login(req, res, next))

router.get('/list',  auth, async(req, res, next) => await new userController().userList(req, res, next))

module.exports = router