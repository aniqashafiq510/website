
import { motion } from 'framer-motion';
import React from 'react'

const Comparison = () => {
    const features = ["Process Time", "Convenience", "Pricing","Safety", "Support"]
    const Us =["Get offers within minutes", "Everything online- from listing to payment", "Instant competitive offers from verified buyers", "Verified buyers, secure payment, inspection report", "24/7 chat & expert help"];
    const old = ["Takes weeks to find a buyer", "Requires phone calls, meetups, and paperwork", "Uncertain — depends on negotiations",
        "Risk of fraud or unsafe in-person meetings ", "Usually no assistance"
    ]
  return (
   <div id='services' className='md:mt-20 md:ml-8 mt-5 ml-5 bg-transparent'>
    <motion.h2
    initial={{opacity:0,y:40}}
    whileInView={{opacity:1,y:0}}
    transition={{delay:0.5, stiffness:20, duration:1}}
    viewport={{once:true}}
    className='md:text-3xl text-2xl font-semibold dark:text-violet-800'>Why Choose Us?</motion.h2>
     <div className='grid md:grid-cols-3 md:gap-5 md:mr-12 md:my-10 my-10'>
       
        {/* features */}
        <motion.div
        initial={{opacity:0, x:-100}}
        whileInView={{opacity:1, x:0}}
        transition={{type:"spring", delay:1,duration:1}}
        viewport={{once:true}}
        className='hidden md:flex flex-col space-y-2 '>
            <h1 className='md:text-xl  font-semibold text-center '>Features</h1>
            {features.map((feature, index)=> (
                
               <h2 className='text-center' key={index}>
                    {feature}
                </h2>
                
            ))}

        </motion.div>
        {/* Our marketplace */}
        <motion.div
        initial={{opacity:0, x:-100}}
        whileInView={{opacity:1, x:0}}
        transition={{type:"spring", delay:1.2,duration:1.2}}
        viewport={{once:true}}
        className='flex flex-col space-y-2 mx-auto md:mx-0'>
            <h1 className='text-xl font-semibold '>Our Marketplace</h1>
            {Us.map((u, index)=> (
                
               <h2 className='text-violet-300 dark:text-violet-700' key={index}>
                   ✅{u}
                </h2>
                
            ))}

        </motion.div>

        {/* old ways */}
        <motion.div
        initial={{opacity:0, x:-100}}
        whileInView={{opacity:1, x:0}}
        transition={{type:"spring", delay:1.4,duration:1.2}}
        viewport={{once:true}}
        className='flex flex-col space-y-2 my-5 md:my-0 mx-auto md:mx-0'>
            <h1 className='text-xl font-semibold  '>Old Ways</h1>
            {old.map((o, index)=> (
                
               <h2 className='text-gray-300 dark:text-gray-600' key={index}>
                    ❌{o}
                </h2>
                
            ))}

        </motion.div>

    </div>
   </div>
  )
}

export default Comparison