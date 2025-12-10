import React from "react";
import { useAuth } from "../../context/Context";
import { motion } from "framer-motion";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";


const AdminProfile = () => {
  const [auth] = useAuth();
  const user = auth?.user;
  const navigate = useNavigate();

  if (!user) {
    return <div className="text-center pt-[20vh] text-gray-400"><Loader/></div>;
  }

  return (
    <motion.div
      key={user._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex justify-center px-2 md:ml-[18vw] ml-3 mb-5"
    >
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-6">
          {user.pp?.url ? (
            <img
              src={user?.pp?.url}
              alt="Profile Picture"
              className="w-28 h-28 rounded-full object-cover border-2 border-indigo-500"
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
            <p className=" font-bold">Email</p>
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
  );
};

export default AdminProfile;
