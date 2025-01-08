import { useEffect, useState } from 'react'
import { BrowserRouter,Navigate,Route,Routes, useNavigate } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import DashBoard from './pages/DashBoard'
import { SendMoney } from './pages/SendMoney'
import { InitialBalanceAmount } from './pages/InitialBalanceAmount'


function App() {
  
  return (
    <>
     <BrowserRouter>
     <Routes>
     <Route path='/' element={<Navigate to="/signup" />}/>
     <Route path='/signup' element={<Signup/>} />
     <Route path='/signin' element={<Signin/>} />
     <Route path='/sendmoney' element={<SendMoney/>}/>
     <Route path='/dashboard' element={<DashBoard/>}/>
     <Route path='/initialbalance' element={<InitialBalanceAmount/>}    />
     </Routes>
     </BrowserRouter>
    </>
  )
}


export default App
