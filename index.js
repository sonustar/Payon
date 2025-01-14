const express = require("express")
const app = express()
const mongoose = require('mongoose')
const {authusermodel, Account} = require("./Model/authuser")
const jwt = require('jsonwebtoken')
const { authmiddleware } = require("./middleware")
const cors = require("cors")
const router = require("./routes")
require('dotenv').config()



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors());

mongoose.connect(process.env.DATABASE_URL).then(()=>{
  console.log("Database Connected !! ")
})

app.use('/',router)




// If you want to update the details of the user !! 
// Get user through the middleware !! 
app.put('/user',authmiddleware,async (req,res)=>{

  const {email , password} = req.body
  
  try {

    const user = await authusermodel.findByIdAndUpdate(req.userId,{
      email:email,
      password:password
    }).then(()=>{
      res.status(200).json({
        message:"Updated Successfully !!"
      })
    })
    
  } catch (error) {
    res.status(411).json(
      {
        message: "Error while updating information"
      }
    )
  }
        
   
})





app.listen(3000,()=>{
  console.log("App is running 🚀🚀")
})