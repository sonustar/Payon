import axios from 'axios';
import { useState } from 'react';
import { useSearchParams} from 'react-router-dom';



export const SendMoney = () => {

    const [amount,setAmount] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();

    const email =searchParams.get('name');
    const sender = searchParams.get('userId')
    // console.log(sender)
    // setsend(sender)

    function handlesubmit(e){
        e.preventDefault()
        
        async function sendData() {

            await axios.post("http://localhost:3000/account/transfer",{
                to: sender,
                amount
            },{
                headers:{
                    Authorization:"bearer "+localStorage.getItem("token")
                }
            }).then((res)=>{
                console.log(res.data)
            })
            
        }




        sendData();

    }
    


  return <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
          <div
              className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
          >
              <div className="flex flex-col space-y-1.5 p-6">
              <h2 className="text-3xl font-bold text-center">Send Money</h2>
              </div>
              <div className="p-6">
              <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-3xl font-semibold mb-2 text-white">{email[0].toUpperCase()}</span>
                  </div>
                  <h3 className="text-2xl font-semibold">{email.substring(0,4)}</h3>
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
                      setAmount(e.target.value)
                  }}
                      type="number"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      id="amount"
                      placeholder="Enter amount"
                  />
                  </div>
                  <button
                  onClick={handlesubmit}
                  className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                      Initiate Transfer
                  </button>
              </div>
              </div>
      </div>
    </div>
  </div>
}