const express = require('express')
const { adminLogin,addEmployee  } = require('../controllers/adminLogic')
const upload = require('../middlewares/multerMiddlewares')

const router = new express.Router()

//path
router.post('/admin/login', adminLogin)
//add new employeee
router.post('/admin/add-employee',upload.single('user-profile'),addEmployee )


module.exports = router