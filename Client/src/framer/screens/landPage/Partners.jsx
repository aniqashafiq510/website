import { motion } from "framer-motion";
import alfalah from '../../components/svgs/alfalah.svg'
import bmw from '../../components/svgs/bmw.svg'
import hbl from '../../components/svgs/hbl.svg'
import honda from '../../components/svgs/honda.svg'
import hyundai from '../../components/svgs/hyundai.svg'
import kia from '../../components/svgs/kia.svg'
import mcb from '../../components/svgs/mcb.svg'
import meezan from '../../components/svgs/meezan.svg'
import sc from '../../components/svgs/sc.svg'
import suzuki from '../../components/svgs/suzuki.svg'
import toyota from '../../components/svgs/toyota.svg'
import ubl from '../../components/svgs/ubl.svg'

const Partners = () => {
  const brands = [
    { name: "Toyota", logo: toyota, white:true },
    { name: "Honda", logo: honda, white:true },
    { name: "Suzuki", logo: suzuki, white:true },
    { name: "Kia", logo: kia, white:true },
    { name: "Hyundai", logo: hyundai, white:true},
    { name: "BMW", logo: bmw, white:false },
    { name: "HBL", logo: hbl, white:false },
    { name: "UBL", logo: ubl, white:false },
    { name: "MCB", logo: mcb, white:false},
    { name: "Bank Alfalah", logo: alfalah, white:false},
    { name: "Standard Chartered", logo: sc, white:false },
    { name: "Meezan Bank", logo: meezan, white:false }
  ];

  return (
    <section className=" text-white py-5 md:py-10 md:mt-10 bg-transparent border-t border-white
     dark:border-purple-600 ">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8,delay:0.7 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl dark:text-violet-800 font-semibold mb-8"
        >
          Trusted by Leading Brands & Banks
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0,y:40 }}
          whileInView={{ opacity: 1,y:0 }}
          transition={{ delay:1, stiffness:20, duration:0.8 }}
          viewport={{ once: true }}
          className="text-gray-200 dark:text-purple-600 mb-12 max-w-2xl mx-auto"
        >
          We're proud to collaborate with some of the most respected automotive brands and financial 
          institutions in Pakistan.
        </motion.p>

        {/* Logo grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-10 items-center justify-center"
        >
          {brands.map((brand, i) => (
            <div
              key={i}
              className="flex justify-center items-center transition-all duration-300"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className={`w-10 h-auto md:w-[60px] hover:scale-110 transition duration-300
          ${
            brand.white
              ? "invert dark:invert-0"   // white in light mode, normal in dark
              : ""
          }`}
              />
            </div>
          ))}
        </motion.div>
      </div>
      
    </section>
  );
};

export default Partners;
