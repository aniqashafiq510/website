
import {  motion } from "framer-motion"
import { GiCarWheel } from "react-icons/gi";






const Herosection = () => {

  return (
    <section id="top" className="h-auto flex flex-row bg-transparent  items-center justify-between
    lg:px-24 px-10 relative ">
        {/* left section */}
        <div className="md:mt-5 md:ml-10 mt-10" >
            <motion.h1
            initial={{opacity:0,scale:0.5}}
            animate={{opacity:1,scale:1}}
            transition={{
                type:'spring', stiffness:30, delay:1.9, duration: 1.5
            }}
            className="text-4xl md:text-6xl lg:text-7xl dark:text-violet-800 font-bold z-10 md:mb-6 mb-3">Spot for every <br /> kind of Wheel</motion.h1>
            <motion.p
            initial={{opacity:0,scale:0.5}}
            animate={{opacity:1,scale:1}}
            transition={{
                type:'spring', stiffness:30, delay:1.9, duration: 1.5
            }}
            className="text-xl md:text-2xl lg:text-3xl text-purple-200 dark:text-purple-900 max-w-2xl "> Your Ultimate Destination for Cars & Bikes
            </motion.p>
        </div>
        {/* right wheel */}
        <motion.div
        initial={{opacity:0, x:-800, y:-50, scale:0.5}}
        animate={{opacity:1, x:-28, y:20, scale:1}}
        transition={{delay:1.2, duration:2, stiffness:3}}
        className="md:mb-[12vh] mt-2 ml-6 ">
           <motion.div
           animate={{rotate:360}}
           transition={{ duration:2,repeat:Infinity, repeatType:"loop",ease:'linear'}}>
            <GiCarWheel className=" md:text-[300px]  text-[125px] z-50 bg-gradient-to-b from-violet-950 to-black  text-gray-600 
           rounded-full ring-2 ring-purple-300 border-2 border-black hover:text-gray-700 transition-colors duration-300"/>
            
           </motion.div>

        </motion.div>

      

    </section>
  )
}

export default Herosection
