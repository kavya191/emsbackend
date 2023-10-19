const mongoose=require('mongoose')

//admin
const adminSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        trim:true ,//to remove white space
        required:true
    },
    psw:{
        type:String,
        required:true,
        trim:true
       
    }
})

const admins=new mongoose.model('admins',adminSchema)

module.exports=admins