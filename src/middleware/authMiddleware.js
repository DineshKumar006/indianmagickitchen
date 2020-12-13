
const httpError=require('../error Model/errorModel')
const JWT=require('jsonwebtoken')
const userModel=require('../model/userModel')
const authMiddleware=async(req,res,next)=>{
    try {
       
        const headerToken=req.header('Authorization').replace('Bearer ', '');
        if(!headerToken){
            throw new httpError("Authorization Failed!, Check the token")

        }
        const isMatch= JWT.verify(headerToken,'chootu is my best friend')

        const isUser=await userModel.findOne({_id:isMatch._id,token:headerToken})

        if(!isUser){
            throw new httpError("you are not authorised!",402)
        }
        req.validUser=isUser
        req.headerToken=headerToken

        next()
    } catch (error) {
        if(error.message){
            return res.status(402).send({status:"failed",message:error.message})
        }
    
        return res.status(400).send('not a valid token')
    }
}


module.exports=authMiddleware