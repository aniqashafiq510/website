import axios from 'axios'
import React, { useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import apis from '../../config/Api'
import {errorToast,infoToast,successToast} from '../components/Toastify'
import { useEffect } from 'react'
import { useAuth } from '../context/Context'




const Activate = () => {
  const navigate = useNavigate()
  const [auth,setAuth] = useAuth()
 const {token} = useParams()
    const [loading,setLoading] = useState(true)

    useEffect(()=> {
        token && creatAccount()
    },[token])

    const creatAccount =async ()=> {
        try {
          
          const {data} = await axios.post(`${apis.User}/signup`, {token} )
          const {error} = data
          

          if(error) {
            errorToast(error)
          }
          else{
            localStorage.setItem("auth", JSON.stringify(data))
            setAuth(data)
            infoToast(`You will redirected to dashboard shortly`)
                    setTimeout(()=> {
                            successToast(`You are logged in successfully!`)
                            navigate('/dashboard')
                        },2000)
            
           
            
          }
        } catch (error) {
          console.log(error.message)
            
        }
        finally {
          setLoading(false)
        }
    }

    
  return (
    <div>
      {loading ? 'Account activating....' : <p>Account activation completed!</p>}
    </div>
  )
}

export default Activate
