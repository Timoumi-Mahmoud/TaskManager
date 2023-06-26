const connectDB =require('./db/connect')
require('dotenv').config()
const port=process.env.PORT  || 3000
const express=require('express')
const app=express()
app.use(express.static('./public'))
const tasks=require('./routes/tasks')
const notFound=require('./middelware/notfound')
const errorHandlerMiddleware=require('./middelware/error-handler')
require('./db/connect')

//middleware
app.use(express.json())
//app.use(notFound)
app.use('/api/v1/tasks', tasks)
app.use(errorHandlerMiddleware)

const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server listen on port ${port} .....`))


    }catch(error){
       console.log(error)
    }
}
start()


module.exports = app;
