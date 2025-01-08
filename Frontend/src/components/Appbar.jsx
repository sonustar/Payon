import React, { useState,useEffect } from 'react'
import axios from 'axios'

const Appbar = () => {

    const token = localStorage.getItem("token")

    const[user,setuser] = useState("")

    useEffect(()=>{
    
    async function sendData(){
      try {
          const result = await axios.get("http://localhost:3000/name",{
              headers: {
                Authorization: `bearer ${token}`, // Add Authorization header
              }
            });
        //   console.log(result.data); // Log the response data to verify
          setuser(result.data); // Update state with the result
        } catch (error) {
          console.error("Error fetching users:", error); // Handle errors if any
        }
    }
  
    
    sendData()
  
    },[])


  return (
   <div className="shadow h-14 flex justify-between">
    <div className="flex flex-col font-semibold  justify-center h-full ml-4">
        PayTM App
    </div>
    <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
            Hello {user?.email}
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
            <div className="flex flex-col justify-center h-full pb-2 text-2xl">
            {user?.email?.toUpperCase()[0]} 
            </div>
        </div>
    </div>
</div>
  )
}

export default Appbar