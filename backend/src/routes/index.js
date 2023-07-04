const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/auth')
const userController = require('../controllers/user')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/reset-password', userController.resetPassword)
router.use('/user', verifyToken, require('./user'))
router.use('/post', verifyToken, require('./post'))


module.exports = router