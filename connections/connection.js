const mongoose=require('mongoose')

mongoose.connect(process.env.base_url,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("__________________MongoDB Atlas Required____________");
}).catch((error)=>{
    console.log("connection error",error);
})