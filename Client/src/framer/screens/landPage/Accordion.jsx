import React from 'react'
import * as A from '@radix-ui/react-accordion'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Accordion = () => {
  const sections = [
    {
      title: "City",
      list: ["Lahore","Multan","Wah Cantt","Raheem Yar Khan","Mansehra","Karachi","Gujranwala","Bahawalpur","Jhelum",
        "Mandi Bahauddin","Peshawar","Faisalabad","Quetta","Okara","Jhang","Islamabad","Sialkot","Gujrat","Sheikhupura","Swabi",
        "Rawalpindi","Sargodha","Mardan","Chakwal","Haripur"]
    },
    {
      title: "Make",
      list: ["Toyota","Honda","Suzuki","Kia","Hyundai","BMW","Mercedes","Audi","Nissan","Ford"]
    },
    {
      title: "Model",
      list: ["Corolla","Civic","Mehran","Picanto","Elantra","3 Series","C Class","A4","Altima","F-150"]
    },
    {
      title: "Year",
      list: ["2025","2024","2023","2022","2021","2020","2019","2018","2017","2016"]
    },
    {
      title: "Budget",
      list: ["< 1400000", "1400000 - 2800000","2800000 - 4200000","4200000 - 5600000","5600000 - 8400000",
       "> 8400000"]
    },
    {
      title: "Body Type",
      list: ["Sedan","SUV","Hatchback","Coupe","Convertible","Truck","Van","Crossover"]
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 1, stiffness: 30 }}
      className="mt-5 md:ml-8 ml-5 bg-transparent" id='cars'
    >
      <h1 className="md:text-4xl dark:text-violet-800 text-2xl font-semibold ml-5">Browse Cars</h1>

      {/* Accordion Root */}
      <motion.div
      initial={{opacity:0,y:40}}
      whileInView={{opacity:1, y:0}}
      transition={{delay:0.3, stiffness:20, duration:1.2}}
      viewport={{once:true}}
      >
        <A.Root type="single" collapsible defaultValue="item-1" className="mt-8 grid md:grid-cols-4 grid-cols-2 gap-8">
        
        {/* Left Column: Triggers */}
        <div className="flex flex-col justify-center items-center space-y-3 border-r border-gray-600 md:col-span-1">
          {sections.map((s, index) => (
            <A.Item key={index} value={`item-${index + 1}`}>
              <A.Header>
                <A.Trigger className="w-full text-left md:text-2xl text-[15px] font-medium dark:hover:text-gray-600 hover:text-violet-400 data-[state=open]:text-violet-400 dark:data-[state=open]:text-violet-700">
                  {s.title}
                </A.Trigger>
              </A.Header>
            </A.Item>
          ))}
        </div>

        {/* Right Column: Content */}
        <div className="md:col-span-3 px-4">
          {sections.map((s, index) => (
            <A.Item key={index} value={`item-${index + 1}`}>
              <A.Content
                className="data-[state=closed]:hidden data-[state=open]:block transition-all duration-300"
              >
                <div className="flex justify-center items-center min-h-[300px]">
                    <div className="grid md:grid-cols-5 grid-cols-3 gap-2 md:gap-5 text-[12px] md:text-lg text-center">
                      {s.list.map((sub, i) => (
                        <Link
                          key={i}
                          to={`/listings?${s.title.toLowerCase()}=${encodeURIComponent(sub)}`}
                          className="hover:text-gray-300 dark:hover:text-violet-900 dark:text-violet-700"
                        >
                          {sub}
                        </Link>
                      ))}
  </div>
</div>

              </A.Content>
            </A.Item>
          ))}
        </div>

      </A.Root>
      </motion.div>
    </motion.div>
  )
}

export default Accordion
