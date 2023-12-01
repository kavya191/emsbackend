const admins = require("../models/adminModel");
const employees = require("../models/employeeCollection");

const adminRegister = async (req, res) => {
  //destructure body
  const { email, psw, conpsw } = req.body;
  if (!email || !psw || !conpsw) {
    res.status(400).json("all fields are required");
  } else {
    //try{
    let preAdmin = await admins.findOne({ email});
    if (preAdmin) {
      res.status(400).json("Already exist");
    } else {
      let newAdmin = new admins({ email, psw, conpsw });
      if (psw == conpsw) {
        await newAdmin.save();
        res.status(200).json(newAdmin);
      } else {
        res.status(400).json("password not matching");
      }
    }

    // }catch{
    //   res.status(400).json("connection error");
    // }
  }
};
const adminLogin = async (req, res) => {
  //destructure body data
  const { email, psw } = req.body;
  //email or psw  not found in their input field response get cheyyan
  if (!email || !psw) {
    res.status(400).json("all datas are reqired");
  } else {
    //email and psw mongodb atlas il indo check cheyyumbo,they are comming through network ,connection error will occurs
    //so use try and catch block to resolve connection error
    try {
      //async and await use cheythu data find cheythu directly oru variableil store cheyyam
      const admin = await admins.findOne({ email, psw });
      if (admin) {
        res.status(200).json("login success");
      } else {
        res.status(404).json("incorrect email or password");
      }
    } catch {
      //to get connection error use catch block
      res.status(400).json("connection error");
    }
  }
};

//employeee
const addEmployee = async (req, res) => {
  //variable to store profile input
  const profile = req.file.filename;
  console.log(profile);
  //destructure input data
  const { fname, lname, status, mobile, location, gender, email } = req.body;
  //check if all fields are empty or not
  if (
    !fname ||
    !lname ||
    !status ||
    !mobile ||
    !location ||
    !gender ||
    !email ||
    !profile
  ) {
    res.status(400).json("all fields are required");
  } else {
    //to resolve runtimee errors use try & catch block
    try {
      // check employee already present or not
      let preEmployee = await employees.findOne({ email });
      if (preEmployee) {
        res.status(400).json("employee already exist");
      } else {
        //create new employee in collection
        let newEmployee = new employees({
          fname,
          lname,
          status,
          mobile,
          location,
          gender,
          email,
          profile,
        });
        //save new employee
        await newEmployee.save();
        res.status(200).json(fname);
      }
    } catch {
      res.status(400).json("connection error");
    }
  }
};
//get employee data
const getAllEmployees = async (req, res) => {
  //access query param from api
  //"search" is the variable that hold argument
  const searchKey = req.query.search;
  //regex query
  const query = {
    fname: { $regex: searchKey, $options: "i" },
  };
  try {
    const result = await employees.find(query);
    res.status(200).json(result);
  } catch {
    res.status(400).json("connection error");
  }
};
//get employee single view
const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const emp = await employees.findOne({ _id: id });
    if (emp) {
      res.status(200).json(emp);
    } else {
      res.status(404).json("employee not found");
    }
  } catch {
    res.status(400).json("connection error");
  }
};
//delete employee data
const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    //findByIdAndDelete method use cheythu data find cheythu data delete cheyyan.deletecheyyumbo deleted data kude response aayitt kittum
    const emp = await employees.findByIdAndDelete({ _id: id });
    if (emp) {
      res.status(200).json(emp.fname);
    } else {
      res.status(404).json("employee not found");
    }
  } catch {
    res.status(400).json("connection error");
  }
};
const updateEmployee = async (req, res) => {
  //id of employee
  const { id } = req.params;
  //bodydata
  const {
    fname,
    lname,
    status,
    mobile,
    location,
    gender,
    email,
    user_profile,
  } = req.body;
  const profile = req.file ? req.file.filename : user_profile;
  //try {
  const employee = await employees.findOne({ _id: id });
  if (employee) {
    employee.fname = fname;
    employee.lname = lname;
    employee.status = status;
    employee.mobile = mobile;
    employee.location = location;
    employee.gender = gender;
    employee.email = email;
    employee.profile = profile;
    //save
    await employee.save();
    res.status(200).json(employee);
  } else {
    res.status(404).json("employee not found");
  }
  // } catch {
  //   res.status(400).json("connection error");
  // }
};
//filter employee
const filterEmployee = async (req, res) => {
  const { filterData } = req.query; //active ,inactive
  const filteredEmployees = await employees.find({ status: filterData });
  res.status(200).json(filteredEmployees);
};

module.exports = {
  adminRegister,
  adminLogin,
  addEmployee,
  getAllEmployees,
  getEmployee,
  deleteEmployee,
  updateEmployee,
  filterEmployee,
};
