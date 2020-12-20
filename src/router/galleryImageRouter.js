const Router=require('express').Router();
const galleryimageModel=require('../model/galleryModel')
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
        fileSize:800000
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




Router.route('/addGalleryimage').post(authMiddleWare,imageUpload.single('galleryimage'),async(req,res)=>{

    try {
        const result=await cloudinary.uploader.upload(req.file.path,{width:1080,height:500, quality: "auto:best" ,fetch_format:"auto"})
        const data={
            imageid:result.public_id,
            imageLink:result.secure_url,
            Date:new Date().getTime()
        }

    const galleryimage=new galleryimageModel(data)
        await galleryimage.save()

        
        if(req.file){
            //   console.log(req.file)
            fs.unlinkSync(req.file.path)
          }

    res.status(201).send({status:'success',galleryimage})


    } catch (error) {
        if(req.file){
            fs.unlinkSync(req.file.path)
        }
        console.log(error)
        res.status(500).send({status:'Failed',message:'something went wrong!',error})
    }

})

Router.route('/getGalleryimage').get(async(req,res)=>{
    try {

        const data=await galleryimageModel.find({}).sort({Date:-1}).exec()

        res.status(200).send({status:'success',data})

        
    } catch (error) {
        console.log(error)
        res.status(500).send({status:'Failed',message:'something went wrong!',error})

    }
})



Router.route('/deleteGalleryimage/:imageid').delete(authMiddleWare,async(req,res)=>{
    try {

        const DeletedImage=await galleryimageModel.findByIdAndDelete({_id:req.params.imageid}).exec()
        res.status(200).send({status:'Delete Success',DeletedImage})

    } catch (error) {
        res.status(500).send({status:'Failed',message:'something went wrong!',error})

    }
})


module.exports=Router


