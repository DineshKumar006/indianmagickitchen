const mongoose=require('mongoose')


const sliderimages=mongoose.Schema({
    
    imageid:{type:String},
    imageLink:{type:String},
    Date:{type:Number},
},
{
    timestamps:true
})


const sliderimagesModel=mongoose.model('sliderimages',sliderimages)

module.exports=sliderimagesModel