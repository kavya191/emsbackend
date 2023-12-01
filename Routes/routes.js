const express = require('express')
const { adminLogin,addEmployee, getAllEmployees, getEmployee, deleteEmployee, updateEmployee, filterEmployee, adminRegister  } = require('../controllers/adminLogic')
const upload = require('../middlewares/multerMiddlewares')

const router = new express.Router()
//path for register
router.post('/admin/register',adminRegister)
//path
router.post('/admin/login', adminLogin)
//add new employeee
router.post('/admin/add-employee',upload.single('user_profile'),addEmployee )
//get employee data
router.get('/admin/get-all-employees',getAllEmployees)
//get employee single view
router.get('/admin/get-employee/:id',getEmployee)
//delete emp data
router.delete('/admin/delete-employee/:id',deleteEmployee)
//update employeee
router.put('/admin/edit-employee/:id',upload.single('user_profile'),updateEmployee)
//filter status
router.get('/admin/filter',filterEmployee)

module.exports = router