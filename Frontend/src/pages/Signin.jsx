import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/Inputbox";
import {SubHeading} from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom";



export function Signin(){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()
  
  function handleSubmit(e){
    e.preventDefault();
    async function sendData() {
      
      await axios.post("http://localhost:3000/signin",{
        email,
        password,
  
      }).then((response)=>{

        if(response.data.token){
          localStorage.setItem("token",response.data.token)
        }
        
        if(response.status != 200){
          navigate("/signup")
        }else{
          navigate("/dashboard")
        }

      })
      
  
    } 


    sendData();
  }

  
   return (
    <div className="bg-slate-300 h-screen flex justify-center ">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
              
            <Heading label={"Sign In"}/>
            <SubHeading label={"Enter Your Information to login your account"}/>
            <InputBox 
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            placeholder="example@gmail.com" label={"Email"} />
            <InputBox
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            placeholder="123456" label={"Password"} />
            <div className="pt-4">
          <Button
          onClick={handleSubmit}
           label={"Sign In"} />
        </div>
        <BottomWarning label={"If you don't have Account ?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </div>

   )

  }