import { useEffect, useState } from "react";
import axios from "axios";
import { successToast, errorToast } from "../../components/Toastify";
import { FaTrash, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import apis from "../../../config/Api";
import BigLoader from "../../components/BigLoader";
import { useAuth } from "../../context/Context";



const AdminReviews = () => {
  const [auth] = useAuth()
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch all reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${apis.reviews}/get-All`);
        setReviews(Array.isArray(data.reviews) ? data.reviews : []);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        errorToast("Failed to fetch reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Delete review
  const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      setDeletingId(reviewId);
      await axios.delete(`${apis.reviews}/${reviewId}`);
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      successToast("Review deleted successfully!");
    } catch (err) {
      console.error("Error deleting review:", err);
      errorToast("Failed to delete review.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <BigLoader />;
  if (!auth?.user) {
  return (
    <div className="pt-[20vh] md:ml-[25vw] text-center text-xl text-red-400 dark:text-gray-700">
      <p>
        Only admin can access this page!
      </p>
    </div>
  );}

  return (
    <div className=" md:ml-[20vw] px-4">
      {/* Show message if no reviews */}
      {reviews.length === 0 && (
        <p className="text-center dark:text-gray-700 text-white text-xl">
          No reviews available.
        </p>
      )}

      {/* Reviews list */}
      {reviews.length > 0 && (
        <div className="w-full md:w-3/5 space-y-4 mb-2 mx-auto">
          {reviews.map((review) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex justify-between items-start"
            >
              <div>
                {/* Star Rating */}
                <div className="flex items-center mb-2">
                  {[...Array(review.Rating?.value || 0)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500 text-lg" />
                  ))}
                </div>
                {/* Comment */}
                <p className="text-gray-800 dark:text-gray-200">{review.comment}</p>
                {/* Reviewer Name */}
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  By: {review.name?.name || "Unknown"}
                </p>
              </div>

              {/* Delete Button */}
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDelete(review._id)}
                disabled={deletingId === review._id}
              >
                {deletingId === review._id ? "Deleting..." : <FaTrash />}
              </button>
            </motion.div>
          ))}
        </div>
      )}

    </div>
  );
};

export default AdminReviews;
