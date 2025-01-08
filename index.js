const express = require("express")
const app = express()
const mongoose = require('mongoose')
const {authusermodel, Account} = require("./Model/authuser")
const jwt = require('jsonwebtoken')
const { authmiddleware } = require("./middleware")
const cors = require("cors")
require('dotenv').config()



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors());

mongoose.connect(process.env.DATABASE_URL).then(()=>{
  console.log("Database Connected !! ")
})

app.get('/',(req,res)=>{
       res.send("hello")
})

// Make signup route ! 
app.post("/signup", async (req,res)=>{
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


app.post("/initialbalance",authmiddleware,async(req,res)=>{
     const {balance} = req.body
    //  Create account with the balance 
     await Account.create({
      balance,
      userId : req.userId
    })

    res.status(200).json({
      message:"Success!! "
    })
})



// Protected Route : 
app.get("/name",authmiddleware,async (req,res)=>{
      
      const user = await authusermodel.findById(req.userId)
      // console.log(user)
      res.status(200).json(user)
})

app.get("/payment",authmiddleware,async (req,res)=>{
      
  const user = await Account.findById(req.userId)
  console.log(user)
  res.status(200).json(user)
})


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


app.get('/balance',authmiddleware,async (req,res)=>{

  const userbalance = await Account.findOne({userId:req.userId})
  // console.log(userbalance)
 
 if(!userbalance){
   res.status(404).json({
    message : "Wrong User !!"
   })
  }


 res.status(200).json(userbalance)

})

app.post('/transfer', authmiddleware  ,async (req,res)=>{
     
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount , to } = req.body;

  // Fetch the accounts within the transaction
  const account = await Account.findOne({ userId: req.userId }).session(session);


  if (!account || account.balance < amount) {
      await session.abortTransaction();
      console.log("Insufficient balance")
      return;
  }



  const toAccount = await Account.findOne({ userId: to }).session(session);
  
  console.log(toAccount)

  if (!toAccount) {
      await session.abortTransaction();
      console.log("Invalid account")
      return;
  }

  // Perform the transfer
  await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
  await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

  // Commit the transaction
  await session.commitTransaction();
  res.status(200).json({
    message:"Transfered Successfully"
  })

})




app.post('/signin',async (req,res)=>{

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

app.get('/allist',authmiddleware,async (req,res)=>{

  
  const currentUser = await authusermodel.findById(req.userId)
 
        
  const list = await authusermodel.find({
   email:{ $regex: req.query.filter, $options: 'i' },
   email: { $ne: currentUser.email }
  })

  res.status(200).json(list)
})





app.get('/list',authmiddleware,async (req,res)=>{

  
        
  const list = await authusermodel.find({
   email:{ $regex: req.query.filter, $options: 'i' },
  
  })

  res.status(200).json(list)
})





app.listen(3000,()=>{
  console.log("App is running 🚀🚀")
})