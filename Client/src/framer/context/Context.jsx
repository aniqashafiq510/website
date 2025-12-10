import { createContext, useContext, useEffect, useState} from "react";

const AuthContext = createContext()


const AuthProvider = ({children}) => {
    const [auth,setAuth] = useState({
        ok:null,
        user: null,
        token : "",
        refreshToken: ""
    })
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        const userAuth = JSON.parse(localStorage.getItem("auth"))
        if (userAuth) {
      setAuth(userAuth); 
    }
        setLoading(false)
    }, [])
  return (
    <>
    <AuthContext.Provider value={[auth,setAuth,loading]}>
        {children}
    </AuthContext.Provider>
    </>
  )
}

export default AuthProvider

 export const useAuth = () => useContext(AuthContext)



