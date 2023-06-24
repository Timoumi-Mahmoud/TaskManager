
const { json } = require('express')
const Task =require('../modeles/task')



const getAllTasks= async(req, res)=>{
    //res.send("All items form the controller")
    try{
        const tasks=await Task.find({})
        res.status(200).json({tasks})
    }catch(error){
        res.status(500).json({msg:error})   
    }
 
}


const createTask= async (req, res)=>{
   // res.json(req.body)
  //  const task=await Task.create({name:"mahmoud", completed:false})
   
  try{
    const task=await Task.create(req.body)
    res.status(201).json({task})

  }catch(error){
    console.log(error)
    res.status(500).json({msg:error})
  }
   
}


const getTask= async(req, res)=>{
   // res.createTask('get single Task')
    
try{
  const {id:taskID}=req.params
  const task = await Task.findOne({_id:taskID})

  if(!task){
    return res.status(404).json({msg:`No task with id: ${taskID}`})  
  }
res.status(200).json({task})


}catch(error){
    res.status(500).json({msg:error})
}


   
}


const deleteTask= async(req, res)=>{

    try{
        const {id:taskID}= req.params
        const task= await Task.findOneAndDelete({_id:taskID})
        //console.log(t)
      //const   task = await t.deleteOne()
      //console.log("delete it ")
      if(!task){
        return res.status(404).json({msg:`No task with id: ${taskID}`})
      }
      res.status(200).json({task})
     // res.status(200).send()
    //res.status(200).json({task:null, status:'successe'})
    }catch(error){
        res.status(500).json({msg:error})

    }

}


const updateTask= async(req, res)=>{
    try{
        const {id:taskID}=req.params
         // res.status(200).json({id:taskID, data:req.body})
        const task= await Task.findOneAndUpdate({_id:taskID}, req.body ,{
            new: true,
            runValidators: true
        })

        if(!task){
            return res.status(404).json({msg:`No task with id: ${taskID}`})
          }
          res.status(200).json({task})
         // res.status(200).json({id:taskID, data:req.body})
    } catch(error){

        res.status(500).json({msg:error})

    }
}



module.exports ={
    getAllTasks,
    createTask,
    updateTask,
    getTask,
    deleteTask
}