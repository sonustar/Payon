import {useEffect, useState} from "react"
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([]);
  const [filter,setFilter] = useState("")
  
  
  const token = localStorage.getItem("token")

  useEffect(()=>{
  
  async function sendData(){
    try {
        const result = await axios.get("http://localhost:3000/user/allist?filter=" + filter,{
            headers: {
              Authorization: `bearer ${token}`, 
            }
          });
        // console.log(result.data); // Log the response data to verify
        setUsers(result.data); 
      } catch (error) {
        console.error("Error fetching users:", error); 
      }
  }

  
  sendData()

  },[])


  return <>
      <div className=" ml-4 font-bold mt-6 text-lg">
          Users
      </div>
      <div className="my-2">
          <input
          onChange={(e)=>{
            setFilter(e.target.value)
          }} 
          type="text" placeholder="Search users..." className=" ml-4 w-1/2 px-2 py-1 border rounded border-slate-200"></input>
          <button onClick={(e)=>{
            e.preventDefault();
             
            async function sendData(){
              const result = await axios.get("http://localhost:3000/user/list?filter=" + filter,{
                headers: {
                  Authorization: `bearer ${token}`, // Add Authorization header
                }
              });
            // console.log(result.data); 
            setUsers(result.data);
            }



            sendData();



          }} className="ml-28 text-white py-1 bg-blue-400 w-auto px-4 rounded-lg">Search</button>
      </div>
      
      <div>
        {users.length > 0 ? (
          users.map((user,index) => <User key={index} user={user} />) 
        ) : (
          <div className="ml-4">No users found</div>
        )}
      </div>
  </>
}

function User({user}) {
   
    const navigate = useNavigate();

  return <div className="ml-4 hover:bg-gray-200 flex justify-between">
    
      <div className="flex">
          <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.email?.[0]} 
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>{user.email}</div>
        </div>
      </div>

      <div className="flex flex-col justify-center pt-3 h-full mr-5">
          <Button 
          onClick={()=>{
            navigate("/sendmoney?userId="+ user._id + "&name="+user.email)
          }}
          label={"Send Money"} />
      </div>
  </div>
}