

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import apis from '../../config/Api'
import axios from 'axios'
import {errorToast,infoToast,successToast} from '../components/Toastify'
import {Link, useNavigate} from 'react-router-dom'
import { RxCross2 } from "react-icons/rx";
import { FaEye, FaEyeSlash  } from "react-icons/fa";
import { useAuth } from '../context/Context'


const Login = () => {
    const [auth,setAuth] = useAuth()
    const [show, hide] = useState(false)
    const navigate = useNavigate()

    useEffect(()=> {
         if(auth?.user?.role){
            if(auth?.user?.role === "admin"){
                navigate("/admin/dashboard")
            }
            if(auth?.user?.role === "seller"){
                navigate("/seller/dashboard")
            }
            if(auth?.user?.role === "buyer"){
                navigate("/buyer/dashboard")
            }
         }
     },[auth,navigate])

     
    const [user,setUser] = useState({
        email: "",
        password: ""
    })
    const changeHandler = (e) => {
        setUser({...user,
            [e.target.name] : e.target.value
 }
        )
    }
    const [visible, setVisible] = useState(true)
    const handleClose = () => {
        setVisible(false) // trigger exit animation
        setTimeout(() => {
            navigate(-1) // navigate after animation finishes
        }, 500) // match your exit animation duration
    }
    const submitHandler =async (e) => {
        e.preventDefault()

        const {data} = await axios.post(`${apis.User}/login`, user)
        console.log(data)
        const {error} = data
        if(error){
            errorToast(error)
        }
        else{ 
            infoToast(`You will redirected to dashboard shortly!`)
            localStorage.setItem("auth", JSON.stringify(data))
            setAuth(data)
            setTimeout(()=> {
                successToast(`You are successfully logged in✅`)
                if(data?.user?.role === "admin"){
                    navigate('/admin/dashboard')
                }
                // if(data?.user?.role === "seller"){
                //     navigate('/seller/dashboard')
                // }
                
            },3000)
        }
    }

    return (
        <AnimatePresence>
        {visible && (
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{opacity:0}}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black/50 dark:bg-gray-400/50 backdrop-blur-sm z-50 flex items-center justify-center
                     p-4 "
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 30}}
                transition={{ type: 'spring', stiffness: 200, damping: 30, duration: 0.8 }}
                className=" bg-gray-800 dark:bg-gray-600 rounded-xl ring-2 ring-purple-300 dark:ring-black shadow-lg shadow-gray-500 w-full 
                        max-w-md p-6 ">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-300 ">Login!</h1>
                    <motion.button
                    whileTap={{scale:0.8}}
                    className='text-xl dark:text-white'
                    onClick={handleClose}>
                        <RxCross2/></motion.button>

                </div>
                {/* login form */}
                <form onSubmit={submitHandler} className="space-y-4">
                    <div className="flex flex-col space-y-4">
                        <input value={user.email} onChange={changeHandler} name='email' className=" bg-gray-700  rounded-md px-4 py-2 outline-none " type="email" placeholder="Enter your email..." />
                        <div className='bg-gray-700 flex justify-between rounded-md'>
                            <input value={user.password} onChange={changeHandler} className=" bg-gray-700  px-4 py-2 outline-none " name='password'
                             type={show? "text" : "password"} placeholder="Enter your password.." />
                            <button type='button' onClick={()=> {hide(!show)}}>{show ? <FaEyeSlash className='inline mr-2 '/> : <FaEye 
                            className='inline mr-2 '/>}</button>
                        </div>
                    </div>
                    <motion.button type="submit"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full font-bold rounded-md shadow-md hover:shadow-lg dark:text-white
                                hover:shadow-violet-600/50 px-4 py-2 bg-gradient-to-r from-violet-600 to-violet-400
                                hover:from-violet-700 hover:to-purple-700 transition-all duration-300">Login!
                    </motion.button>
                    <div className='flex justify-between dark:text-gray-300'>
                        <Link to='/signup' className='hover:text-purple-300'>Don't have an account?</Link>
                        <Link to='/forgetPassword' className='hover:text-purple-300'>Forget Password?</Link>
                    </div>
                </form>
            </motion.div>

        </motion.div>
        )}
        </AnimatePresence>
    )
}

export default Login
