
import { IoCarSportSharp } from "react-icons/io5";
import { FaLaptopMedical } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaCarSide } from "react-icons/fa";
import { IoPricetagsSharp } from "react-icons/io5";
import { BsCashCoin } from "react-icons/bs";

const Steps = () => {
  const steps = [
    {icon: <FaLaptopMedical className="mx-auto text-8xl text-violet-200 dark:text-purple-600"/>, h:"Sign Up or Log In", p: "Create your free account to get started. It only takes a minute — no long forms or hidden fees."},
    {icon: <FaCarSide className="mx-auto text-8xl text-violet-200 dark:text-purple-600"/>, h:"Upload Car Details", p: "Add your car's info — make, model, year, mileage — and upload clear photos.More details = faster offers!"},
    {icon: <IoPricetagsSharp className="mx-auto text-8xl dark:text-purple-600 text-violet-200"/>, h:"Get Instant Offers", p: "Our network of verified buyers and dealers will instantly send you the best offers for your car."},
    {icon: <BsCashCoin className="mx-auto text-8xl dark:text-purple-600 text-violet-200"/>, h:"Get Paid", p: "Accept an offer, choose pickup or delivery, and get paid quickly and securely."},
  ]
  return (
    <div className="mb-4 mt-20 md:ml-8 ml-5 bg-transparent">

      <motion.div
      initial={{opacity:0,y:40}}
      whileInView={{opacity:1, y:0}}
      transition={{delay:0.3, stiffness:20, duration:1.2}}
      viewport={{once:true}}
      className=" ml-5">
        <h2 className='md:text-4xl text-2xl dark:text-violet-800  font-semibold'>Sell your Car in 4 Easy Steps <IoCarSportSharp className="inline text-3xl md:text-5xl text-violet-200 dark:text-purple-600
        "/></h2>
        <h3 className="md:text-2xl text-xl text-violet-200 dark:text-purple-800">Quick. Transparent. Hassle-Free.</h3>
      </motion.div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6 mt-7 text-center ">
          {steps.map((step,index)=> (
            <motion.div 
            initial={{opacity:0,y:40,scale:0.5}}
            whileInView={{opacity:1,y:0,scale:0.9}}
            whileHover={{scale:1, transition: {duration:0.2}}}
            transition={{delay:0.5 + (index * 0.2),type: "spring", bounce:0.2}}
            viewport={{once:true}}
            key={index} className="text-center p-2 border-transparent shadow-[0px_0px_7px_white]  dark:shadow-[0px_0px_7px_purple]">
            {step.icon}
            <h2 className="text-xl">{step.h}</h2>
            <p className="text-violet-200 dark:text-purple-700" >{step.p}</p>
          </motion.div>
          ))}
          
          
        </div>
    </div>
  )
}

export default Steps
