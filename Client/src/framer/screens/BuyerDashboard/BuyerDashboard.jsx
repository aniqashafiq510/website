import React, { useEffect } from 'react'
import { useAuth } from '../../context/Context'
import { useNavigate,Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import BuyerSideBar from './BuyerSideBar'




const BuyerDashboard = () => {
  const [auth,loading] = useAuth()
  const navigate  = useNavigate()
  useEffect(() => {
    
    if (!loading && !auth?.user) {
    navigate('/',  { replace: true });
  }
   
  
}, [auth?.user,loading, navigate]);



return (
    <div>
    

       <BuyerSideBar/>
       <Outlet/>
      </div>
   
  )
}

export default BuyerDashboard
