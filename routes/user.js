const express = require("express")
const { authusermodel } = require("../Model/authuser")
const userRouter = express.Router()
const jwt = require('jsonwebtoken')
const { authmiddleware } = require("../middleware")
require('dotenv').config()



// Signup 
userRouter.post("/signup", async (req,res)=>{
  const {email,password } = req.body


  const existed = await authusermodel.findOne({email})
  // console.log(existed)
  if(existed){ 
    return res.status(411).json({
      msg : "User exist"
    })
  }
  
  // Insertion : 
  const user = await authusermodel.create({
    email:email,
    password:password
  })

  

  const token  = jwt.sign({
    userId : user._id
  },process.env.SECRET)

  res.json({
    message : "User created !",
    token:token,
  })
})

// Signin route : 
userRouter.post('/signin',async (req,res)=>{

  const {email,password} = req.body

  try {
   
    const result = await authusermodel.findOne({ email, password })
    
    
    if(result === null){
    

      res.status(204).json({
        message:"User not Present !"
      })

      return ;
    }

    else {
    console.log(result)

    const token  = jwt.sign({
      userId : result._id
    },process.env.SECRET)

      res.status(200).json({
       token:token
      })
      
      return 
      
    }
    
  
  } catch (err) {

    console.log(err);
    return res.status(500).json({
      message: "An error occurred during the login process."
    });
  }

  
})

// Name of all the user's registered in the app !! 

userRouter.get('/allist',authmiddleware,async (req,res)=>{

  
  const currentUser = await authusermodel.findById(req.userId)
     
  const list = await authusermodel.find({
   email:{ $regex: req.query.filter, $options: 'i' },
   email: { $ne: currentUser.email }
  })

  res.status(200).json(list)
})


// Do filtering : 
userRouter.get('/list',authmiddleware,async (req,res)=>{
 
  const list = await authusermodel.find({
   email:{ $regex: req.query.filter, $options: 'i' },
  
  })

  res.status(200).json(list)
})


userRouter.get("/name",authmiddleware,async (req,res)=>{
      
  const user = await authusermodel.findById(req.userId)
  // console.log(user)
  res.status(200).json(user)
})







module.exports = userRouter