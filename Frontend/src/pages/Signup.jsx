import { useEffect, useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/Inputbox";
import {SubHeading} from "../components/SubHeading"
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export function Signup(){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate()



  useEffect(()=>{
    const token = localStorage.getItem("token")

    if(token){
      navigate("/dashboard")
    }
  },[])



  function handleSubmit(e){
    e.preventDefault();
    async function sendData() {
      
      const response = await axios.post("http://localhost:3000/signup",{
        email,
        password,
      })
      
      console.log(response.data)

      localStorage.setItem("token",response.data.token)

      navigate("/initialbalance" )
    } 


    sendData();
  }
  
   return (
    <div className="bg-slate-300 h-screen flex justify-center ">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
              
            <Heading label={"Sign Up"}/>
            <SubHeading label={"Enter Your Information to create an account"}/>
            <InputBox
            label={"First Name"}
            placeholder={"John"}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputBox
            label={"Last Name"}
            placeholder={"Doe"}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <InputBox
            label={"Email"}
            placeholder="example@gmail.com"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
          />
          <InputBox
            label={"Password"}
            placeholder="123456"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
            <div className="pt-4">
          <Button onClick={handleSubmit} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
      </div>
    </div>

   )







}