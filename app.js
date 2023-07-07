console.log('04 Store API')

require('dotenv').config()
//async errors
require('express-async-errors')







const port =process.env.Port  || 3000

const express= require('express')
const app=express()
const connectDB=require('./db/connect')
const notFoundMiddleware= require('./middleware/not-found')
const errorMiddleware= require('./middleware/error-handler')
const productsRouter=require('./routes/products')
app.use(express.json())


app.get('/',(req,res)=>{
    res.send('<h1> Store Api</h1><br> <a href="/api/v1/products"> porducts route</a>')
})

app.use('/api/v1/products', productsRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)


const start= async()=>{
    try {
       await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listen on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()

