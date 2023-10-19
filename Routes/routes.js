const express = require('express')
const { adminLogin } = require('../controllers/adminLogic')

const router = new express.Router()

//path
router.post('/admin/login', adminLogin)


module.exports = router