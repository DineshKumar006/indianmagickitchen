const Router=require('express').Router()
const HttpError=require('../error Model/errorModel')
const useModel=require('../model/userModel')

const bcrypt=require('bcryptjs')

Router.route('/AddUser').post(async(req,res)=>{

    try {

        const isuserExists=await useModel.userEmailExists(req.body.Email)
        console.log(isuserExists)
        if(isuserExists){
            throw new HttpError('Email already Exists! ')
        }
        
        const data={
            Email:req.body.Email,
            Password:req.body.Password,
            token:''
        }
        const newUser=new useModel(data)
        await newUser.save();
        res.status(201).send({status:'user added ',user:newUser})

    } catch (error) {
        
        if(error.message){

            return res.status(406).send({status:'Signup failed',message:error.message})
  
          }
          res.status(500).send({status:'Signup failed',message:'internal failed'})
    }
})

Router.route('/Login').post(async(req,res)=>{
    try {

        const LoginData=await useModel.LoginUser(req.body.Email,req.body.Password)
        console.log(LoginData)
        if(LoginData){
            LoginData.generateToken()
        }
        res.status(200).send({status:'Login Success',LoginData})
        
    } catch (error) {
        if(error.message){

            return res.status(406).send({status:'Login failed',message:error.message})
  
          }
          res.status(500).send({status:'Login failed',message:'internal failed'})
    }
})

module.exports=Router