const mongoose=require('mongoose')


const DataSchema=mongoose.Schema({
    RecipeName:{type:String},
    Ingredients:[{type:String}],
    Description:{type:String},
    Steps:[{type:String}],
    RecipeType:{type:String},
    isVeg:{type:Boolean},
    isNonVeg:{type:Boolean},
    videoLink:{type:String},
    Thumbnail:{type:String},
    ThumbnailId:{type:String},
    Rating:{type:Number},
    Date:{type:Number}

},
{
    timestamps:true
})


const dataModel=mongoose.model('recipedata',DataSchema)


module.exports=dataModel