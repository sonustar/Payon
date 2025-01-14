const express = require('express')
const { Account } = require('../Model/authuser')
const { authmiddleware } = require('../middleware')
const accountRouter = express.Router()
const mongoose = require('mongoose')

accountRouter.post("/initialbalance",authmiddleware,async(req,res)=>{
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

accountRouter.get("/payment",authmiddleware,async (req,res)=>{
      
  const user = await Account.findById(req.userId)
  console.log(user)
  res.status(200).json(user)
})

accountRouter.get('/balance',authmiddleware,async (req,res)=>{

  const userbalance = await Account.findOne({userId:req.userId})
  // console.log(userbalance)
 
 if(!userbalance){
   res.status(404).json({
    message : "Wrong User !!"
   })
  }


 res.status(200).json(userbalance)

})




accountRouter.post('/transfer', authmiddleware  ,async (req,res)=>{
     
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




module.exports = accountRouter