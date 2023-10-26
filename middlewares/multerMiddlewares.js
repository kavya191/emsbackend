//import multer middleware
const multer=require('multer')
//set storage
const storage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}-${file.originalname}`)
    }
})
//file filtering
const fileFilter=(req,file,callback)=>{
    //mimetype specifies its file type
    if(file.mimetype=='image/png' || file.mimetype=='image/jpg' || file.mimetype=='image/jpeg'){
        callback(null,true)
    }else{
        callback(null,false)
        return callback(new Error ('only accepts png/jpg/jpeg format files'))
    }
}

//upload
//key and value same so destrure it
const upload=multer({storage,fileFilter})
module.exports=upload