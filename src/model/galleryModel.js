
const mongoose=require('mongoose')

const galleryimages=mongoose.Schema({
    
    imageid:{type:String},
    imageLink:{type:String},
    Date:{type:Number},
},
{
    timestamps:true
})


const galleryimagesModel=mongoose.model('galleryimages',galleryimages)

module.exports=galleryimagesModel