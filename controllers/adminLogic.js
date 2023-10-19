const admins = require("../models/adminModel")
const employees = require("../models/employeeCollection")
const adminLogin = async (req, res) => {
    //destructure body data
    const { email, psw } = req.body
    //email or psw  not found in their input field response get cheyyan
    if (!email || !psw) {
        res.status(400).json("all datas are reqired")
    } else {
        //email and psw mongodb atlas il indo check cheyyumbo,they are comming through network ,connection error will occurs
        //so use try and catch block to resolve connection error
        try {
            //async and await use cheythu data find cheythu directly oru variableil store cheyyam
            const admin = await admins.findOne({ email, psw })
            if (admin) {
                res.status(200).json("login success")
            } else {
                res.status(404).json("incorrect email or password")
            }
        }//to get connection error use catch block
        catch {
            res.status(400).json("connection error")
        }
    }
}

//employeee
const addEmployee = async (req, res) => {
    //variable to store profile input
    const profile = ""
    //destructure input data
    const [fname, lname, status, mobile, location, gender, email] = req.body
    //check if all fields are empty or not
    if (!fname || !lname || !status || !mobile || !location || !gender || !email) {
        res.status(400).json("all fields are required")
    } 
    else {
        //to resolve runtimee errors use try & catch block
        try {
            //check employee already present or not
            let preEmployee = await employees.findOne({ email })
            if (preEmployee) {
                res.status(400).json("employee already exist")
            }
            else {
                //create new employee in collection
                let newEmployee = new employees({
                    fname, lname, status, mobile, location, gender, email
                })
                //save new employee
                await newEmployee.save()
                res.status(200).json(fname)
    
            }
        }
       
    
    catch {
        res.status(400).json("connection error")
    }
}
}


module.exports = { adminLogin, addEmployee }