import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import {HashLink as Link} from 'react-router-hash-link'
import { FaArrowUp } from "react-icons/fa6";

const Footer1 = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-6 flex flex-col">
      <div>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">

        {/* Brand / Logo */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold">WheelSpot</h1>
          <p className="text-gray-400">
            Discover, buy, and sell cars with confidence.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-2 ">
          <h2 className="text-xl font-semibold mb-2">Quick Links</h2>
          
          <Link to="#cars" className="hover:text-violet-400 transition-colors duration-200">Browse Cars</Link>
          <Link to="#about" className="hover:text-violet-400 transition-colors duration-200">About Us</Link>
          <Link to="#contact" className="hover:text-violet-400 transition-colors duration-200">Contact</Link>
          <Link to="#services" className="hover:text-violet-400 transition-colors duration-200">Services</Link>
        </div>

        {/* Social Links */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold mb-2">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-violet-400 transition-colors duration-200">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-violet-400 transition-colors duration-200">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-violet-400 transition-colors duration-200">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-violet-400 transition-colors duration-200">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      
      </div>
      <div className="absolute right-5 rounded-full bg-violet-500 hover:bg-violet-700 p-2">
        <Link to="#top"  title="Back to Top"><FaArrowUp/></Link>
      </div>
    </footer>
  );
};

export default Footer1;
