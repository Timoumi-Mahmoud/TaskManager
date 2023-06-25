
const { json } = require('express')
const Task =require('../modeles/task')
const  {createCustomError}=require('../errors/custom-error') 
const asyncWrapper =require('../middelware/async')


const getAllTasks=  asyncWrapper ( async(req, res)=>{
    //res.send("All items form the controller")
        const tasks=await Task.find({})
        res.status(200).json({tasks})
})

/*
const getAllTasks=  asyncWrapper ( async(req, res)=>{
    //res.send("All items form the controller")
    try{s
        const tasks=await Task.find({})
        res.status(200).json({tasks})
    }catch(error){
        res.status(500).json({msg:error})   
    }
 
})
*/



const createTask= asyncWrapper( async (req, res)=>{
   // res.json(req.body)
  //  const task=await Task.create({name:"mahmoud", completed:false})
   

    const task=await Task.create(req.body)
    res.status(201).json({task})

 
   
})


const getTask= asyncWrapper( async(req, res, next)=>{
   // res.createTask('get single Task')
    

  const {id:taskID}=req.params
  const task = await Task.findOne({_id:taskID})

  if(!task){
   /* const error= new Error('Not Found')
    error.status= 404
    return next(error)*/
    // return res.status(404).json({msg:`No task with id: ${taskID}`}) 
    
    return next(createCustomError(`No task with id: ${taskID}`,404))

  }
res.status(200).json({task})
})


   



const deleteTask=  asyncWrapper( async(req, res)=>{

 
        const {id:taskID}= req.params
        const task= await Task.findOneAndDelete({_id:taskID})
        //console.log(t)
      //const   task = await t.deleteOne()
      //console.log("delete it ")
      if(!task){
        return next(createCustomError(`No task with id: ${taskID}`,404))
      }
      res.status(200).json({task})
     // res.status(200).send()
    //res.status(200).json({task:null, status:'successe'})
   

})


const updateTask= asyncWrapper( async(req, res)=>{
    
        const {id:taskID}=req.params
         // res.status(200).json({id:taskID, data:req.body})
        const task= await Task.findOneAndUpdate({_id:taskID}, req.body ,{
            new: true,
            runValidators: true
        })

        if(!task){
          return next(createCustomError(`No task with id: ${taskID}`,404))
        }
          res.status(200).json({task})
         // res.status(200).json({id:taskID, data:req.body})
    
})


module.exports ={
    getAllTasks,
    createTask,
    updateTask,
    getTask,
    deleteTask
}