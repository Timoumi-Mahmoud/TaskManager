const mongoose = require('mongoose')

const TaskScheme= new mongoose.Schema({
    
    name : { 
        type:String,
         required:[true, 'must provide a title ']  ,
         trim: true,
         maxlength:[10 , 'name can not be more than 10 characters'],
        }
    
    ,completed: {type: Boolean,
        default:false,
    }
    ,description:{
        type:String,
       // required:[true, 'must provide a description ']  ,
        trim: true,
        maxlength:[50 , 'description can not be more than 50 characters'],
      //  minlength:[10 , 'description can not be less than 10 characters'],

    },
    start:
         Date,
    

         category : { 
            type:String,
             trim: true,
            }
        
})

 module.exports=mongoose.model('Task', TaskScheme)