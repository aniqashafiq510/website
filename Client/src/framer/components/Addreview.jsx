import { useState } from "react";
import axios from "axios";
import apis from "../../config/Api";
import { useAuth } from "../context/Context";
import { successToast, errorToast, infoToast } from "./Toastify";
import { FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


const AddReview = () => {
  const [auth] = useAuth(); 
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0); // 0-5
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const stars = [1, 2, 3, 4, 5];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment || rating === 0) return infoToast("Please provide both a rating and a comment!");

    try {
      setLoading(true);

      // 1️⃣ Call Rating API
      const { data } = await axios.post(`${apis.rating}/add`, { value: rating });
      const ratingId = data.rating._id;

      // 2️⃣ Call Review API
      await axios.post(`${apis.reviews}/add`, {
        name: auth?.user?._id,
        comment,
        Rating: ratingId,
      });

      successToast("Thank you! Your review has been submitted.");
      setComment("");
      setRating(0);
      setHoverRating(0);
      navigate(`/${auth?.user?.role}/dashboard`)

    } catch (err) {
      console.error("Error submitting review:", err);
      errorToast("Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {auth.ok ? ( 
        <div className="md:pt-[25vh] flex flex-col items-center">
          <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-[68%]  p-5  bg-white dark:bg-gray-800 shadow-md rounded-xl mb-10"
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Share Your Experience with the Marketplace
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Star Rating */}
            <div className="flex space-x-1">
              {stars.map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer text-2xl ${
                    (hoverRating || rating) >= star ? "text-yellow-500" : "text-gray-300"
                  }`}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                >
                  <FaStar />
                </span>
              ))}
            </div>

            {/* Comment */}
            <textarea
              className="w-full p-3 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="How was your experience using the marketplace? Any suggestions?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              required
            />

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium 
              transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>
        </motion.div>
        </div>
      ) : (
        <div className="pt-8 flex justify-center">
          <Link to="/login" className="text-red-500 font-medium">
            Please log in to submit your feedback.
          </Link>
        </div>
      )}
    </>
  );
};

export default AddReview;
