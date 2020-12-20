const mongoose=require('mongoose')
const HttpError=require('../error Model/errorModel')
const Validator=require('validator')

const CommentSchema=mongoose.Schema({
    
    RecipeId:{type:String},
    RecipeName:{type:String},
    Message:{type:String},
    Username:{type:String},
    Date:{type:Number},
    Email:{
        type:String,
        validate(value){
            if(!Validator.isEmail(value)){
                throw new HttpError('Email not allowed! Please recheck the email!')
            }
        }
    
    
    }
},
{
    timestamps:true
})


const CommentModel=mongoose.model('comments',CommentSchema)

module.exports=CommentModel