
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Link, useLocation } from "react-router-dom";
import { MdReviews } from "react-icons/md";
import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaUsers,
  FaCar,
  FaCog,
} from "react-icons/fa";
import { useAuth } from "../context/Context";

const SideBar = () => {
  const [auth,setAuth] = useAuth()
  const [isOpen, setIsOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const location = useLocation();

  // Track screen size changes
  useEffect(() => {
    const handleResize = () => {
      const large = window.innerWidth >= 1024;
      setIsLargeScreen(large);
      if (large) setIsOpen(true); // keep sidebar open on large screens
      else setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const logOut = ()=> {
        localStorage.removeItem("auth")
        setAuth({ ok: null, user: null, token: "", refreshToken: "" })
        setTimeout(() => {
            warnToast("You are logged Out!")
          }, 2000);
    }

  const navItems = [
    { name: "Users", icon: <FaUsers />, path: "users" },
    { name: "Posts", icon: <FaCar />, path: "allPosts" },
    { name: "Profile", icon: <FaUserCircle />, path: "profile" },
    { name: "Reviews", icon: <MdReviews />, path: "allReviews" }
  ];

  const handleLinkClick = () => {
    if (!isLargeScreen) setIsOpen(false); // only close on small screens
  };

  return (
    <>
      {/* Toggle Button (visible only on small screens) */}
      {!isLargeScreen && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-[11vh] left-6 z-50 bg-gray-800 ring-2 ring-violet-600 text-white p-2 
          rounded-md hover:bg-violet-600 transition dark:bg-gray-400 dark:hover:bg-gray-500 dark:ring-black"
        >
          {isOpen ? <FaTimes size={14} /> : <FaBars size={14} />}
        </button>
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || isLargeScreen) && (
          <motion.aside
            key="sidebar"
            initial={isLargeScreen ? false : { x: -250, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -250, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`fixed top-0 left-0 h-full w-64 bg-gray-800 dark:bg-gray-600 
            text-white shadow-lg flex flex-col justify-between z-40
            ring-2 ring-violet-700 dark:ring-black ${isLargeScreen ? "relative lg:fixed" : ""}`}
          >
            {/* Sidebar Header */}
            <div className="p-5  text-center">
              <h2 className="text-xl font-semibold text-white">Admin Panel</h2>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                    location.pathname === item.path
                      ? "bg-violet-900 text-white"
                      : "text-white hover:bg-violet-800 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            <div className=" mb-[25vh] mx-auto">
                {auth.ok ? (
                        <Link to='/'>
                        <motion.button
                        onClick={logOut}
                    initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            
                            duration: 0.8
                        }}
                        className=" px-4 py-2 rounded-xl bg-gray-800 hover:bg-violet-600 ring-2 ring-violet-600 text-white transition-all duration-500 dark:bg-gray-400 dark:hover:bg-gray-500 dark:ring-black">
                        Log Out
                    </motion.button>
                        </Link>
                   ): (
                        <div className="space-x-2">
                            <Link to='/login'>
                        <motion.button
                        initial={{ opacity: 0}}
                        animate={{ opacity: 1}}
                        transition={{
                            
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
                            
                            duration: 0.8
                        }}
                        className=" px-4 py-2 rounded-xl bg-gray-800 hover:bg-violet-600 ring-2 dark:bg-gray-400 dark:hover:bg-gray-500 ring-violet-600 text-white transition-all duration-500 dark:ring-black">
                        SignUp
                    </motion.button>
                        </Link>
                        </div>
                   )}
            </div>

            {/* Footer */}
            <div className="p-4 text-center text-xs text-violet-200 border-t border-violet-800 dark:border-black">
              © {new Date().getFullYear()} WheelSpot Admin
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Optional: dim background when sidebar is open on mobile */}
      {!isLargeScreen && isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
        />
      )}
    </>
  );
};

export default SideBar;
