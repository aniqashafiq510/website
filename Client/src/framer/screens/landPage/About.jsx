import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="mt-10 py-10 px-6 md:px-16 text-white bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1,delay:0.5 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-violet-800">About Us</h2>
        <p className="text-gray-200 dark:text-purple-600 md:text-lg leading-relaxed">
          We are Pakistan’s premier online marketplace for used cars, helping buyers and sellers connect with confidence.
          Our mission is to make buying and selling vehicles transparent, easy, and trustworthy.
        </p>
        <p className="text-gray-200 dark:text-purple-600 md:text-lg mt-4 leading-relaxed">
          Partnered with leading banks and automotive brands, we ensure secure transactions and a seamless experience for everyone.
        </p>
      </motion.div>
    </section>
  );
};

export default About;
