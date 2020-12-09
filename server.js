const express=require('express')
const cors=require('cors')
const app=express()

const PORT=process.env.PORT || 9000
require('./src/db/mongoDB')
app.use(cors())
app.use(express.json())


const recipeData=require('./src/router/dataRouter')



app.use('/api/recipe',recipeData)


app.use('/',async(req,res)=>{
    res.send('Welcome to Indian Magic Kitchen!')
})
app.listen(PORT,()=>{
    console.log('server running on port',PORT)
})






