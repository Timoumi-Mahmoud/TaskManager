require('dotenv').config();
const jwt = require('jsonwebtoken')


const CustomAPIError=require('../errors/custom-error')
const login=  async(req,res)=>{
   const {username, password}=req.body
  // monogo
  //joi
  //checking both crediantial

  if(!username || !password){
   throw new CustomAPIError('please provide email and password', 400)
  }
  const id= 3
  const token =jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn:'30d'})

console.log(token)
  res.status(200).json({msg:'user created', token})

   // res.send('fake login/Register/signup route')
}

const dashboard =async(req,res)=>{
    // console.log(req.headers)
    // console.log("\n-------------------------------------\n")
    // console.log(req)

    const authHeader= req.headers.authorization;

    if(!authHeader || !authHeader.startsWith(`Bearer `)){
        throw new CustomAPIError('No token provided', 401 );
    }

const token =authHeader.split(' ')[1]
console.log(token)

  try {
    const decoded= jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)
    const luckyNumber=Math.floor(Math.random()*100)
    res.status(200).json({msg: `Hello, Bara `, secret:`Here is your secret data
    ${luckyNumber}` })
  } catch (error) {
    throw new CustomAPIError('Not autorized to acces this route', 401)
    
  }
  
}

module.exports={
    login,
    dashboard
}