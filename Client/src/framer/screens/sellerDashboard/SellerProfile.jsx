import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUserAlt, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import BigLoader from "../../components/BigLoader";
import { useUser } from "../../context/UserContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";


const SellerProfile = () => {
  
  const [user, loading] = useUser();
  const navigate = useNavigate();
  const [isZoomed, setIsZoomed] = useState(false);

  if (loading) return <BigLoader />;
  if (!user)
      return (
        <div className="pt-[20vh] md:ml-[25vw] text-center text-xl text-white dark:text-gray-700">
              <p>
                Please <Link className="text-green-500 underline" to="/login">login</Link> to see your profile.
              </p>
            </div>
      );

  if (user.isBlocked)
  return (
    <div className="min-h-screen ml-[15vw] pt-5 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800
     to-black px-4">
      <div className=" bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-2xl 
      shadow-2xl p-8 text-center">
        
        <div className="text-5xl mb-4">🚫</div>

        <h2 className="text-2xl font-semibold text-white mb-3">
          Account Restricted
        </h2>

        <p className="text-gray-300 mb-2">
          Your account has been blocked by an administrator.
        </p>

        <p className="text-sm text-gray-400 mb-6">
          If you believe this is a mistake, please contact support to request a review.
        </p>

        <Link to='/support'>
        <button
        className="w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 transition font-semibold text-white"
        >
          Contact Support
        </button>
        </Link>

      </div>
    </div>
  );


  return (
    <div>
      <motion.div
        key={user._id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex justify-center pt-[20vh] px-2 md:ml-[18vw] ml-3 mb-5"
      >
        <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 space-y-6">
          {/* Header */}
          <div className="flex items-center space-x-6">
            {user.pp?.url ? (
              <img
                src={user.pp.url}
                alt="Profile Picture"
                className="w-28 h-28 rounded-full object-cover border-2 border-indigo-500 cursor-pointer"
                onClick={() => setIsZoomed(true)}
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-indigo-200 flex items-center justify-center text-4xl text-indigo-600">
                <FaUserAlt />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
                {user.name || user.email.split("@")[0]}
              </h1>
              <p className="text-gray-500 dark:text-gray-300">{user.role}</p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-200">
            <div>
              <p className="font-bold">Email</p>
              <p>{user.email}</p>
            </div>
            <div>
              <p className="font-bold">Address</p>
              <p>{user.address || "Not provided"}</p>
            </div>
            <div>
              <p className="font-bold">City</p>
              <p>{user.city || "Not provided"}</p>
            </div>
            <div>
              <p className="font-bold">State</p>
              <p>{user.state || "Not provided"}</p>
            </div>
            <div>
              <p className="font-bold">Country</p>
              <p>{user.country || "Not provided"}</p>
            </div>
            <div>
              <p className="font-bold">Zipcode</p>
              <p>{user.zipcode || "Not provided"}</p>
            </div>
            <div>
              <p className="font-bold">Gender</p>
              <p>{user.gender || "Not provided"}</p>
            </div>
            <div>
              <p className="font-bold">Date of Birth</p>
              <p>{user.dob || "Not provided"}</p>
            </div>
          </div>

          {/* Update Button */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/edit-user")}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition-colors"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </motion.div>

      {/* Zoomed Image Modal */}
      {isZoomed && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <button
            className="absolute top-5 right-5 text-white text-3xl"
            onClick={() => setIsZoomed(false)}
          >
            <FaTimes />
          </button>
          <Swiper spaceBetween={20} slidesPerView={1}>
            <SwiperSlide>
              <img
                src={user.pp.url}
                alt="Zoomed Profile"
                className="max-h-[80vh] object-contain mx-auto"
              />
            </SwiperSlide>
            {/* You can add more slides here if needed */}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default SellerProfile;
