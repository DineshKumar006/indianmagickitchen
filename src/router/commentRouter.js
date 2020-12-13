
const Router=require('express').Router()
const commentModel=require('../model/commentModel')

const HttpError=require('../error Model/errorModel')
Router.route('/addcomment/:id').post(async(req,res)=>{

    try {

        if(!req.params.id){
            return res.status(405).send({status:'failed',message:'oops recepie id required!'})
        }

        const data={
            RecipeId:req.params.id,
            RecipeName:req.body.RecipeName,
            Message:req.body.Message,
            Username:req.body.Username,
            Email:req.body.Email
        }

        const newComment=new commentModel(data)

        await newComment.save()

        res.status(201).send({status:'success',message:newComment})

    } catch (error) {

        if(error.message){

          return res.status(406).send({status:'failed',message:error.message})

        }
        res.status(500).send({status:'failed',message:'internal failed'})
    }
})





Router.route('/getComment/:id').get(async(req,res)=>{

    try {
const currentPage=req.query.commentpage
const commentPerPage=5
const lastIndex=commentPerPage*currentPage
const firstindex=lastIndex-commentPerPage


    const recpiceid=req.params.id.trim().split(' ').join('')
    const comments=await commentModel.find({RecipeId:recpiceid}).skip(firstindex).limit(lastIndex).exec()
        
    if(comments.length===0){
        throw new HttpError('No comments Available!')
    }
    console.log(comments)
    res.status(200).send({status:'success',data:comments})


    } catch (error) {
        if(error.message){
        return res.status(404).send({status:'failed',message:error.message})

        }
        res.status(500).send({status:'failed',message:'internal failed'})
    }
})













module.exports=Router