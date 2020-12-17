const Router=require('express').Router();
const dataModel=require('../model/dataModel')
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


Router.route('/addRecipe').post(authMiddleWare,imageUpload.single('thumbnail'),async(req,res)=>{
    try {
        const result=await cloudinary.uploader.upload(req.file.path,{width:500,height:400, quality: "auto:best" ,fetch_format:"auto"})

        const data={
            RecipeName:req.body.RecipeName,
            Ingredients:req.body.Ingredients,
            Description:req.body.Description,
            Steps:req.body.Steps,
            isVeg:req.body.isVeg,
            isNonVeg:req.body.isNonVeg,
            videoLink:req.body.videoLink,
            Thumbnail:result.secure_url,
            ThumbnailId:result.public_id,
            Rating:0 ,
            Date:new Date().getTime() 
        }
        const newdata=new dataModel(data)
          await newdata.save()

          if(req.file){
            //   console.log(req.file)
            fs.unlinkSync(req.file.path)
          }

       
        res.status(201).send({status:'success',data:newdata})
    } catch (error) {

        if(req.file){
            fs.unlinkSync(req.file.path)
        }
        console.log(error)
        res.status(500).send({status:'Failed',message:'something went wrong!'})
    }
})



Router.route('/getRecipes').get(async(req,res)=>{

    const currentPageno=parseInt(req.query.pageno)
    console.log(typeof currentPageno)
    try {
        const itemperPage=4
        const lastindex=currentPageno * itemperPage
        const firstindex=lastindex-itemperPage

        const data=await dataModel.find({}).skip(firstindex).limit(lastindex).sort({Date:-1}).exec()

        res.status(200).send({statue:'success',data})

    } catch (error) {
        res.status(500).send({status:'Failed',message:'something went wrong!'})

    }
})


Router.route('/getRecipe/:id').get(async(req,res)=>{
    try {
        const data=await dataModel.findOne({_id:req.params.id}).exec()

        res.status(200).send({statue:'success',data})

    } catch (error) {
        console.log(error)
        res.status(500).send({status:'Failed',message:'something went wrong,cehck the id!'})

    }
})


Router.route('/getRecipeByname/:name').get(async(req,res)=>{
    try {

        const data=await dataModel.findOne({RecipeName:req.params.name}).exec()

        res.status(200).send({statue:'success',data})

    } catch (error) {
        res.status(500).send({status:'Failed',message:'something went wrong!'})

    }
})



module.exports=Router