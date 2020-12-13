const express=require('express')
const cors=require('cors')
const app=express()
require('dotenv').config()

const PORT=process.env.PORT || 9000
require('./src/db/mongoDB')
app.use(cors())
app.use(express.json())


const recipeData=require('./src/router/dataRouter')
const commentData=require('./src/router/commentRouter')
const userData=require('./src/router/userRoute')

app.use('/api/recipe',recipeData)
app.use('/api/comment',commentData)
app.use('/api/user',userData)

app.get('/',async(req,res)=>{
    res.send('Welcome to Indian Magic Kitchen!')
})
app.listen(PORT,()=>{
    console.log('server running on port',PORT)
})






