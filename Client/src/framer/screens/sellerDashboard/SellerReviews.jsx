import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/Context";
import { successToast, errorToast } from "../../components/Toastify";
import { FaTrash, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import apis from "../../../config/Api";
import BigLoader from "../../components/BigLoader";
import { Link } from "react-router-dom";

const SellerReviews = () => {
  const [auth] = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);


  // Fetch reviews
  useEffect(() => {

    if (!auth?.user) {
    setLoading(false);
    return;
  }
    
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${apis.reviews}/get-All`);
        const userReviews = data.reviews.filter(
          (review) => review.name._id === auth?.user?._id
        );
        setReviews(userReviews);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        errorToast("Failed to fetch reviews.");
      } finally {
        setLoading(false);
      }
    };

    if (auth?.user) fetchReviews();
  }, [auth]);

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
    <div className="pt-[20vh] md:ml-[25vw] text-center text-xl text-white dark:text-gray-700">
      <p>
        Please <Link className="text-green-500 underline" to="/login">login</Link> to see your reviews.
      </p>
    </div>
  );
}

if (auth?.user.isBlocked)
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
    <div className="pt-[20vh] md:ml-[25vw]">
      {/* Show message if no reviews */}
      {reviews.length === 0 && (
        <p className="text-center dark:text-gray-700 text-white text-xl mb-5">
          You have not added any reviews yet.
        </p>
      )}

      {/* Reviews list */}
      {reviews.length > 0 && (
        <div className="w-[60%] space-y-4 mb-2">
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

      {/* Always show Add Review button */}
      <div className="my-5 flex justify-end mr-10">
        <Link to="/add-review">
          <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white
          font-semibold rounded-lg shadow-md transition transform hover:scale-105">
            Add Review
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SellerReviews;
