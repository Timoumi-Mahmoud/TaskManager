console.log('Task Manager App')



const connectDB =require('./db/connect')
require('dotenv').config()
const port=3000
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
//Routes:
app.use('/api/v1/tasks', tasks)


app.use(errorHandlerMiddleware)







/*

Routes:        
- list:          app.get('/api/tasks')
- add new task:  app.post('/api/tasks')
- delete:        app.delete('/api/tasks/;id')
- update:        app.patch('/api/tasks/:id')
- get by id:     app.get('/api/tasks/:id')


-------
Mongo
- NoSql, non relational DB
- store JSON
- instead of table we have collections wich represent group of items
- instead of rows we have documents which represent single item : set of key value paire
- Free cloud hosting MongoDB-ATLAS

*/



const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server listen on port ${port} .....`))


    }catch(error){
       console.log(error)
    }
}
start()