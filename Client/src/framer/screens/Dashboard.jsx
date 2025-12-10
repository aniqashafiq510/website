import React, { useEffect } from 'react'
import { useAuth } from '../context/Context'
import { useNavigate,Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import SideBar from '../components/SideBar'
import { div } from 'framer-motion/client'



const Dashboard = () => {
  const [auth,loading] = useAuth()
  const navigate  = useNavigate()
  useEffect(() => {
    
    if (!loading && !auth?.user) {
    navigate('/',  { replace: true });
  }
   
  
}, [auth?.user,loading, navigate]);



return (
    <motion.div
    key={auth?.user}
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{delay:1.6}}
    className='pt-[20vh] ml-5'>
       {/* <h1 className=' text-4xl text-center '>Welcome {auth?.user?.name || auth?.user?.email?.split('@')[0]}!</h1> */}

       <SideBar/>
       <Outlet/>
      </motion.div>
   
  )
}

export default Dashboard
