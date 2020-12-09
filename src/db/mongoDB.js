const Mongoose=require('mongoose')

const url='mongodb+srv://root:root@cluster0-gxjis.gcp.mongodb.net/indianmagickitchen?retryWrites=true&w=majority'
Mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true,useUnifiedTopology:true}).then(()=>{
    console.log('connection online...')
}).catch((error)=>{
    console.log('something went wrong! check the internet connection!',error)

})

var db=Mongoose.connection

db.once('open',()=>{
    console.log('db is connected')
})