import React, { useEffect } from 'react'
import { useAuth } from '../../context/Context'
import { useNavigate,Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import SellerSideBar from './SellerSidebar'



const SellerDashboard = () => {
  const [auth,loading] = useAuth()
  const navigate  = useNavigate()
  useEffect(() => {
    
    if (!loading && !auth?.user) {
    navigate('/',  { replace: true });
  }
   
  
}, [auth?.user,loading, navigate]);



return (
    <div>
    

       <SellerSideBar/>
       <Outlet/>
      </div>
   
  )
}

export default SellerDashboard
