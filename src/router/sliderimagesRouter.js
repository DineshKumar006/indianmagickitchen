const Router=require('express').Router();
const sliderimageModel=require('../model/sliderimages')
const fs=require('fs')
const cloudinary=require('cloudinary').v2
const {v4:uuid}=require('uuid')
const multer=require('multer')
const authMiddleWare=require('../middleware/authMiddleware')


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})
const imageUpload=multer({
    limits:{
        fileSize:500000
    },

    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'uploads/images')
        },

        filename:(req,file,cb)=>{
            cb(null,uuid()+'.png')
        }
    })
})

Router.route('/addSliderimage').post(authMiddleWare,imageUpload.single('sliderimage'),async(req,res)=>{

    try {
        const result=await cloudinary.uploader.upload(req.file.path,{width:1080,height:500, quality: "auto:best" ,fetch_format:"auto"})
        const data={
            imageid:result.public_id,
            imageLink:result.secure_url,
            Date:new Date().getTime()
        }

    const sliderimage=new sliderimageModel(data)
        await sliderimage.save()

        
        if(req.file){
            //   console.log(req.file)
            fs.unlinkSync(req.file.path)
          }

    res.status(201).send({status:'success',sliderimage})


    } catch (error) {
        if(req.file){
            fs.unlinkSync(req.file.path)
        }
        console.log(error)
        res.status(500).send({status:'Failed',message:'something went wrong!',error})
    }

})

Router.route('/getSliderimages').get(async(req,res)=>{
    try {

        const data=await sliderimageModel.find({}).sort({Date:-1}).exec()

        res.status(200).send({status:'success',data})

        
    } catch (error) {
        console.log(error)
        res.status(500).send({status:'Failed',message:'something went wrong!',error})

    }
})




module.exports=Router


