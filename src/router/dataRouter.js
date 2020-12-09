const Router=require('express').Router();
const dataModel=require('../model/dataModel')


Router.route('/data').post(async(req,res)=>{
    try {

        const data={
            RecipeName:req.body.RecipeName,
            Ingredients:req.body.Ingredients,
            Description:req.body.Description,
            Steps:req.body.Steps,
            isVeg:req.body.isVeg,
            isNonVeg:req.body.isNonVeg,
        }
        const newdata=new dataModel(data)
          await newdata.save()
        res.status(201).send({status:'success',data:newdata})
    } catch (error) {
        console.log(error)
        res.status(500).send({status:'Failed',message:'something went wrong!'})
    }
})



module.exports=Router