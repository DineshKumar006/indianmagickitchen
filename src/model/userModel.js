const mongoose=require('mongoose')

const Validator=require('validator')
const HttpError=require('../error Model/errorModel')
const JWT=require('jsonwebtoken')

const userSchema=mongoose.Schema({

    Email:{

        
        type:String,
        validate(value){
            if(!Validator.isEmail(value)){
                throw new HttpError('Not a valid email')
            }
        }
    },
    Password:{type:String},

    token:{type:String}
})


userSchema.statics.LoginUser=async(email,password)=>{

    try {
        const isuser=await userModel.findOne({Email:email,Password:password}).exec()
        console.log(isuser)
        if(!isuser){
        return new HttpError('User not found plz try again')
        }
        return  isuser

    } catch (error) {
        return new HttpError('Login Failed')    
    }
    
}




userSchema.statics.userEmailExists=async(email)=>{
    const isuser=await userModel.findOne({Email:email}).exec()
    console.log(isuser)
    if(isuser){
        return true
    }
    return false
}

userSchema.methods.generateToken=async function(){

    const jwtToken=JWT.sign({_id:this._id.toString()} , 'chootu is my best friend',{expiresIn:'1d'})
    this.token=jwtToken
    await this.save()
    return jwtToken
}




const userModel=mongoose.model('adminuser',userSchema)

module.exports=userModel


