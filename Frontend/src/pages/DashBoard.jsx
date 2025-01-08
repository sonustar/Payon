import React, { useEffect, useState } from 'react'
import Appbar from '../components/Appbar'
import { Balance } from '../components/Balance'
import { Users } from '../components/Users'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const DashBoard = () => {

  const [value,setValue] = useState(100)
  const token = localStorage.getItem("token")
  const navigate = useNavigate();

  
  useEffect(()=>{
    // Scenario : If the user doesn't have token : 
    if(!token){
      navigate("/signin")
    }

    // User have token : 
    // He is signed in :
    async function sendData(){
      try {
          const result = await axios.get("http://localhost:3000/balance",{
              headers: {
                Authorization: `bearer ${token}`, // Added Authorization header
              }
            });
            setValue(result.data.balance)
        } catch (error) {
          console.error("Error fetching users:", error); 
        }
    }
  
    
    sendData()
  
    },[])



  return (
    <div>
      <Appbar/>
      <Balance value={value}/>
      <Users/>
    </div>
  )
}

export default DashBoard