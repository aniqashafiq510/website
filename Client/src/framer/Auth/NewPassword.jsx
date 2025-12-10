

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import apis from '../../config/Api'
import axios from 'axios'
import {errorToast,successToast} from '../components/Toastify'
import { useNavigate, useParams} from 'react-router-dom'
import { RxCross2 } from "react-icons/rx";
import { FaEye, FaEyeSlash  } from "react-icons/fa";
import Loader from '../components/Loader'




const NewPassword = () => {
    const [show, hide] = useState(false)
    const [showCnfrm, hideCnfrm] = useState(false)

    const { resetToken } = useParams()

    const navigate = useNavigate()


    const [user,setUser] = useState({
        password: "",
        confirm_password: ""
    })
    
    const [visible, setVisible] = useState(true)
    const handleClose = () => {
        setVisible(false) // trigger exit animation
        setTimeout(() => {
            navigate(-1) // navigate after animation finishes
        }, 500) // match your exit animation duration
    }
    const [isTokenValid, setIsTokenValid] = useState(false)
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    const validateToken = async () => {
      try {
        setLoading(true)
        const { data } = await axios.post(`${apis.User}/resetPassword`, {resetToken})
        if (data.ok) {
          setIsTokenValid(true)
        } else {
          errorToast("Invalid or expired reset link.")
          navigate('/error')
        }
      } catch (err) {
        errorToast("Something went wrong. Please request a new reset link.")
        navigate('/forgetPassword')
      } finally {
        setLoading(false)
      }
    }

    validateToken()
  }, [resetToken, navigate])

  const changeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${apis.User}/updatePassword/${resetToken}`, user)
      const { error, message } = data

      if (error) {
        errorToast(error)
      } else {
        successToast(message)
        setTimeout(() => {
          successToast(`Login using your new password!`)
          navigate('/login')
        }, 3000)
      }
    } catch (err) {
      errorToast("Failed to update password. Try again.")
    }
  }

  if (loading) {
   return  <Loader/>
  }

  if (!isTokenValid) return null
    
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
                className="bg-gray-800 dark:bg-gray-600 rounded-xl ring-2 ring-purple-300 shadow-lg shadow-gray-500 w-full 
                        max-w-md p-6 ">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-300 ">Reset Password</h1>
                    <motion.button
                    whileTap={{scale:0.8}}
                    className='text-xl dark:text-white'
                    onClick={handleClose}>
                        <RxCross2/></motion.button>

                </div>
                {/* login form */}
                <form onSubmit={submitHandler} className="space-y-4">
                    <div className="flex flex-col space-y-4">
                       <div className='bg-gray-700 flex justify-between rounded-md'>
                            <input value={user.password} onChange={changeHandler} className=" bg-gray-700  px-4 py-2 outline-none " name='password' type={show? "text" : "password"} placeholder="Enter your new password.." />
                            <button type='button' onClick={()=> {hide(!show)}}>{show ? <FaEyeSlash className='inline mr-2 '/> : <FaEye className='inline mr-2 '/>}</button>
                        </div>
                        <div className='bg-gray-700 flex justify-between rounded-md'>
                            <input value={user.confirm_password} onChange={changeHandler} className=" bg-gray-700  px-4 py-2 outline-none " name='confirm_password' type={showCnfrm? "text" : "password"} placeholder="Confirm your password.." />
                            <button type='button' onClick={()=> {hideCnfrm(!showCnfrm)}}>{showCnfrm ? <FaEyeSlash className='inline mr-2 '/> : <FaEye className='inline mr-2 '/>}</button>
                        </div>
                    </div>
                    <motion.button type="submit"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full font-bold rounded-md shadow-md hover:shadow-lg dark:text-white
                                hover:shadow-violet-600/50 px-4 py-2 bg-gradient-to-r from-violet-600 to-violet-400
                                hover:from-violet-700 hover:to-purple-700 transition-all duration-300">Update Password
                    </motion.button>
                    
                </form>
            </motion.div>

        </motion.div>
        )}
        </AnimatePresence>
    )
}

export default NewPassword
