import React, { useState } from "react";
import { motion } from "framer-motion";
import apis from "../../../config/Api";
import axios from 'axios'
import {errorToast,successToast} from '../../components/Toastify'


const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const {data} = await axios.post(`${apis.contact}/contact`, form)

      if(data?.error){
        errorToast(data.error)
      }

      if (data?.success) {
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
        successToast(data.message)
      }
    } catch (error) {
      console.error("Error sending message:", error);
      errorToast(error)
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="my-5 bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className="w-[50%] mt-14 mx-auto text-center rounded-md bg-gray-700 py-10 px-6 md:px-16 text-white"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Us</h2>
        <p className="text-gray-200 md:text-lg mb-8">
          Have questions or want to sell your car? Reach out to us and our team
          will get back to you quickly.
        </p>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 mx-auto max-w-md"
        >
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="px-3 py-2 rounded-md bg-transparent text-white text-sm outline-none ring-2 ring-white"
          />

          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="px-3 py-2 rounded-md bg-transparent text-white text-sm outline-none ring-2 ring-white"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            rows={3}
            required
            className="px-3 py-2 rounded-md bg-transparent text-white text-sm outline-none ring-2 ring-white"
          />

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="text-white font-semibold px-4 py-2 w-[50%] rounded-md hover:bg-violet-900 hover:scale-110 transition duration-300 text-sm outline-none ring-2 ring-white"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>

        {success && (
          <p className="text-green-400 text-sm mt-4">
            Message sent successfully!
          </p>
        )}

        <div className="mt-8 text-gray-300 space-y-2 text-sm">
          <p className="hover:underline">Email: wheeelspot@gmail.com</p>
          <p className="hover:underline">Phone: +92 300 1234567</p>
          <p>Address: Lahore, Pakistan</p>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
