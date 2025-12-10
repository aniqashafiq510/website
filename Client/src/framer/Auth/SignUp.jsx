import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import apis from '../../config/Api'
import axios from 'axios'
import { errorToast, infoToast, successToast } from '../components/Toastify'
import { Link, useNavigate } from 'react-router-dom'
import { RxCross2 } from "react-icons/rx";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from '../context/Context'

const SignUp = () => {
  const [show, hide] = useState(false)
  const [auth] = useAuth()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(true)

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

  // 👇 include "role" in the user state
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "" // "seller" or "buyer"
  })

  const changeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleClose = () => {
    setVisible(false)
    setTimeout(() => {
      navigate(-1)
    }, 500)
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!user.role) {
      infoToast("Please select a role (Seller or Buyer)")
      return
    }

    try {
      const { data } = await axios.post(`${apis.User}/preSign`, user)
      
      const { error, message } = data
      if (error) {
        errorToast(error)
      } else {
        
        successToast(message)
      }
    } catch (err) {
      errorToast("Something went wrong during sign up")
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black/50 dark:bg-gray-400/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 200, damping: 30, duration: 0.8 }}
            className="bg-gray-800 dark:bg-gray-600 rounded-xl ring-2 dark:ring-black ring-purple-300 shadow-lg shadow-gray-500 w-full max-w-md p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-300">Register Yourself</h1>
              <motion.button
                whileTap={{ scale: 0.8 }}
                className='text-xl dark:text-white'
                onClick={handleClose}>
                <RxCross2 />
              </motion.button>
            </div>

            {/* signup form */}
            <form onSubmit={submitHandler} className="space-y-4">
              <div className="flex flex-col space-y-4">
                <input
                  value={user.email}
                  onChange={changeHandler}
                  name='email'
                  className="bg-gray-700 rounded-md px-4 py-2 outline-none"
                  type="email"
                  placeholder="Enter your email..."
                />

                <div className='bg-gray-700 flex justify-between rounded-md'>
                  <input
                    value={user.password}
                    onChange={changeHandler}
                    className="bg-gray-700 px-4 py-2 outline-none"
                    name='password'
                    type={show ? "text" : "password"}
                    placeholder="Enter your password.."
                  />
                  <button
                    type='button'
                    onClick={() => { hide(!show) }}
                  >
                    {show
                      ? <FaEyeSlash className='inline mr-2' />
                      : <FaEye className='inline mr-2' />}
                  </button>
                </div>

                {/* 👇 radio buttons for role */}
                <div className="flex justify-around text-gray-300 mt-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="role"
                      value="buyer"
                      checked={user.role === "buyer"}
                      onChange={changeHandler}
                    />
                    <span>Buyer</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="role"
                      value="seller"
                      checked={user.role === "seller"}
                      onChange={changeHandler}
                    />
                    <span>Seller</span>
                  </label>
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full font-bold rounded-md shadow-md hover:shadow-lg dark:text-white
                          hover:shadow-violet-600/50 px-4 py-2 bg-gradient-to-r from-violet-600 to-violet-400
                          hover:from-violet-700 hover:to-purple-700 transition-all duration-300"
              >
                Sign Up
              </motion.button>

              <div className='flex justify-between dark:text-gray-300'>
                <Link to='/login' className='hover:text-purple-300'>Already have an account?</Link>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SignUp
