const mongoose =require('mongoose')
//employee

const employeeSchema=new mongoose.Schema({

    fname:{
        type:String,
        trime:true,
        required:true
    },
    lname:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        required:true
    },
    mobile:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        minlength:10,
        maxlength:13
    },
    gender:{
        type:String,
        trim:true,
        required:true
    },
    status:{
        type:String,
        trim:true,
        required:true
    },
    profile:{
        type:String,
        required:true,
        trim:true
    },
    location:{
        type:String,
        trim:true,
        required:true
    }

})