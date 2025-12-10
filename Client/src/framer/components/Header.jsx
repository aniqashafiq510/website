import { motion } from "framer-motion"
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import {useUser} from '../context/UserContext'
import { useLocation } from 'react-router-dom'
import { useAuth } from "../context/Context";
import { warnToast } from "./Toastify";
import ThemeToggle from "../../Features/ToggleTheme";
import logo from '../components/images/logoImage.png'
import { HashLink as Link } from 'react-router-hash-link'
import { FaUserCircle } from "react-icons/fa";
import Loader from './Loader'






const Header = () => {


    const location = useLocation()
    const [auth, setAuth] = useAuth()
    const [user,loading] = useUser()
    const navArr = [{ value: "Home", path: "/" }, { value: "Listings", path: "/listings" },
    { value: "About", path: "#about" }, { value: "Contact", path: "#contact" }, { value: "Services", path: "#services" }
    ]
    // filtered navlinks
    const extraLink = auth.ok
        ? [{ value: "Dashboard", path: `/${auth.user.role}/dashboard` }]
        : [];

    const filteredNav = location.pathname === "/"
        ? [...navArr, ...extraLink]
        : [...navArr.slice(0, 2), ...extraLink];
    // mobile menu open/close

    const mobileNav = [{ value: "Home", path: "/" }, { value: "Listings", path: "/listings" },
    { value: "Dashboard", path: `/${auth?.user?.role}/dashboard` }
    ]
    const filteredmobileNav = auth.ok ? mobileNav : (mobileNav.slice(0, 2))

    const [isOpen, setisOpen] = useState(false);
    const toggleMenu = () => { setisOpen(!isOpen) }

    // when the isOpen is false it value becomes true so that the buttons can switch accordingly

    useEffect(() => {
        setisOpen(false)
    }, [location.pathname])
    const logOut = () => {
        localStorage.removeItem("auth")
        setAuth({ ok: null, user: null, token: "", refreshToken: "" })
        setTimeout(() => {
            warnToast("You are logged Out!")
        }, 2000);
    }



    return (
        <header className="fixed w-full md:h-20 h-[13vh] z-50 transition-all duration-300 bg-violet-950 dark:bg-gray-700">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
                {/* logo */}
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        type: 'spring',
                        stiffness: 100,
                        damping: 25,
                        delay: 0.3,
                        duration: 1.2
                    }}
                    // spring is animation like bounce, stiffness means the tightness/ the fastness is animation, higher its value higher the speed , damping is the speed at the ending of animation, delay means wait 0.3s to start, duration is the whole time take the animation
                    className="flex items-center">


                    <motion.div
                        className="mr-1"
                    //   animate={{rotate:360, color: ["#06b6d4", "#facc15", "#f472b6", "#06b6d4"]}}
                    //   transition={{
                    //     repeat: Infinity,
                    //     repeatType: "loop",
                    //     duration: 2,
                    //     ease: "linear"}}
                    >
                        <img src={logo} alt="logo" className="md:w-[40px] w-[30px]" />
                        {/* <GiCarWheel
                        
                    className="text-2xl "
                    /> */}

                    </motion.div>

                    <span className="text-xl font-bold text-purple-200">
                        WheelSpot
                    </span>
                </motion.div>
                {/* nav bar */}


                <nav className="lg:flex hidden space-x-8 ">
                    {filteredNav.map((item, index) => (
                        <motion.div key={index}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 100,
                                damping: 20,
                                delay: 0.7 + (index * 0.2),

                            }}>
                            <Link to={item.path}
                                key={index}

                                // delay: 0.7 + index * 0.2 , for index 0... 0.7 + (0 × 0.2) = 0.7 , for index 1..0.7 + (1 × 0.2) = 0.9
                                //  and so on, delay me index pass krany k liye map me b index pass krana ho ga
                                className="relative text-gray-200 hover:text-violet-600
                dark:hover:text-violet-400 font-medium transition-colors duration-300 group ">

                                {item.value}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-600
                    group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        </motion.div>

                    ))}
                    {/* parent ko class group dy den or child pr group:hover or group:focus likhen to parent k hover pr,child b hover ho ga */}

                </nav>

                {/* social icons */}
                <div className="md:flex hidden items-center space-x-3 ">

                    <motion.p
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            delay: 1.3,
                            duration: 0.8
                        }}
                    //              className="text-gray-300 hover:text-violet-600
                    //  dark:hover:text-violet-400 transition-colors duration-300" 
                    >
                        <ThemeToggle />
                    </motion.p>


                    {/* <Link to='/contact'>
                    <motion.p
                    
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            delay: 1.3,
                            duration: 0.8
                        }}

                     className="text-gray-700 dark:text-gray-300 hover:text-violet-600
             dark:hover:text-violet-400 transition-colors duration-300" >
                        <FiMessageSquare title="Contact_Us" className="w-5 h-5" />
                    </motion.p>
                    </Link> */}


                    {/* login/ signup button */}


                    {auth.ok ? (
                        <Link to={`/${auth.user.role}/dashboard`}>
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    delay: 1.5,
                                    duration: 0.8
                                }}
                                title="Profile"
                                className="">
                                {loading ? (
                                    <Loader/>
                                ) : user?.pp?.url ? (
                                    <img
                                        src={user.pp.url}
                                        alt="Profile"
                                        className="w-10 h-10 border-2 border-violet-600 rounded-full dark:border-black"
                                    />
                                ) : (
                                    <FaUserCircle className="text-[35px] mt-2 text-white" />
                                )}

                            </motion.button>
                        </Link>
                    ) : (
                        <div className="space-x-2">
                            <Link to='/login'>
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        delay: 1.5,
                                        duration: 0.8
                                    }}
                                    className=" px-4 py-2 rounded-xl bg-gray-800 hover:bg-violet-600 dark:bg-gray-400 dark:hover:bg-gray-500
                         ring-2 ring-violet-600 text-white transition-all duration-500 dark:ring-black">
                                    LogIn
                                </motion.button>
                            </Link>

                            <Link to='/signup'>
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{
                                        delay: 1.5,
                                        duration: 0.8
                                    }}
                                    className=" px-4 py-2 rounded-xl bg-gray-800 hover:bg-violet-600 ring-2 dark:bg-gray-400 dark:hover:bg-gray-500 ring-violet-600 text-white transition-all duration-500 dark:ring-black">
                                    SignUp
                                </motion.button>
                            </Link>
                        </div>
                    )}



                </div>

                {/* mobile menu button */}
                <div className="md:hidden flex items-center absolute -right-3">
                    <motion.p
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", delay: 0.5, duration: 0.7, stiffness: 30 }}
                        whileTap={{ scale: 0.7 }}>
                        <ThemeToggle />
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", delay: 0.5, duration: 0.7, stiffness: 30 }}
                        whileTap={{ scale: 0.7 }}
                        className="text-gray-300" onClick={toggleMenu}>
                        {isOpen ? <RxCross2 className='w-6 h-6 mr-10 ' /> : <IoIosMenu className='w-6 h-6 mr-10' />}
                    </motion.button>

                </div>
            </div>
            {/* mobile menu */}
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none', height: isOpen ? 'auto' : 0 }}
                transition={{ duration: 0.5 }}
                className="md:hidden shadow-lg text-center bg-violet-950 dark:bg-gray-700 border-2 border-white
            dark:border-black">
                <nav className="flex flex-col space-y-3  ">
                    {filteredmobileNav.map((item) => (
                        <Link to={item.path} onClick={toggleMenu} className="text-gray-300
                             hover:bg-gray-600 font-medium py-2 hover:rounded-md 
                              hover:text-gray-100 transition-colors duration-300 " key={item.path}>
                            {item.value}
                        </Link>

                    ))}
                </nav>
                <div>
                    <div className="absolute right-5 border-2 border-white dark:border-black rounded-md bg-violet-900 dark:bg-gray-600 dark:text-white
                     w-[30%]">


                        {/* buttons for login / sign up */}
                        {auth.token ? (
                            <Link to='/'>
                                <button
                                    onClick={logOut}
                                    className="p-1 hover:underline font-bold">Log Out</button>
                            </Link>
                        ) : (
                            <div className="flex">
                                <Link to='/login'>
                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className=" p-3 font-bold
                     hover:underline">Login</motion.button>
                                </Link>

                                <Link to='/signup'>
                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className=" p-3  font-bold
                     hover:underline">SignUp</motion.button>
                                </Link>
                            </div>
                        )}


                    </div>
                </div>
            </motion.div>
            {/* <AnimatePresence> is used to apply the exit animation of framer motion  */}
        </header>
    )
}

export default Header
