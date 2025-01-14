import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom'

export const InitialBalanceAmount = () => {

 const [email,setEmail] = useState("")
 const [balance,setbalance] = useState("")
 const navigate = useNavigate() 

  useEffect(()=>{

    async function sendData(){
      
        await axios.get("http://localhost:3000/user/name",{
        headers:{
          Authorization:"bearer " + localStorage.getItem("token")
        }
       }).then((res)=>{
          // console.log(res.data)
          setEmail(res.data.email)
       }) 
       
    }


    sendData()
  },[])

  function handleSubmit(){


    async function sendData(){
      
       await axios.post("http://localhost:3000/account/initialbalance",{
        balance
      },{
      headers:{
        Authorization:"bearer " + localStorage.getItem("token")
      }
     })

     navigate("/dashboard")
     
     
  }


  sendData()

  }
  
    return <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
          <div
              className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
          >
              <div className="flex flex-col space-y-1.5 p-6">
              <h2 className="text-3xl font-bold text-center">Enter the Initial Amount</h2>
              </div>
              <div className="p-6">
              <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-3xl font-semibold mb-2 text-white">{email[0]}</span>
                  </div>
                  <h3 className="text-2xl font-semibold">{email}😊</h3>
              </div>
              <div className="space-y-4">
                  <div className="space-y-2">
                  <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="amount"
                  >
                      Amount (in Rs)
                  </label>
                  <input
                      onChange={(e)=>{
                          setbalance(e.target.value)
                      }}
                      type="number"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      id="amount"
                      placeholder="Enter amount"
                  />
                  </div>
                  <button 
                  onClick={handleSubmit}
                  className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                      Initiate Transfer
                  </button>
              </div>
              </div>
      </div>
    </div>
  </div>
  
}
