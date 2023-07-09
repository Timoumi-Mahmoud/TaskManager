
const authenticationMiddleware= async (req,res, next)=>{
    console.log("\n -----------\n")
   console.log(req.headers.authorization)
   next()

}

module.exports=authenticationMiddleware