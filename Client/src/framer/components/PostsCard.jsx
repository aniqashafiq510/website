import React, { useState, useEffect } from "react";
import ImageCarousel from "./ImageCarousel";
import { FaPhoneAlt, FaHeart, FaRegHeart, FaEye } from "react-icons/fa";
import { successToast, errorToast } from "../components/Toastify";
import { useAuth } from "../context/Context";
import { useDispatch } from "react-redux";
import { fetchPost } from "../Redux/Actions/postActions";
import { useNavigate } from "react-router-dom";

const PostsCard = ({ details }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [auth] = useAuth();
  const user = auth?.user;

  const {
    _id,
    title,
    price,
    city,
    transmission,
    fuelType,
    images,
    engine,
  } = details;

  const [showPhone, setShowPhone] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Load favorites for user
  useEffect(() => {
    if (!user) return;
    const favs = JSON.parse(localStorage.getItem("favorites")) || {};
    const userFavs = favs[user._id] || [];
    setIsFavorite(userFavs.includes(_id));
  }, [_id, user]);

  const toggleFavorite = () => {
    if (!user) return errorToast("Please login to add favorites");

    const favs = JSON.parse(localStorage.getItem("favorites")) || {};
    const userFavs = favs[user._id] || [];

    let updatedFavs;

    if (isFavorite) {
      updatedFavs = userFavs.filter((id) => id !== _id);
      errorToast("Post removed from favorites");
    } else {
      updatedFavs = [...userFavs, _id];
      successToast("Post added to favorites");
    }

    localStorage.setItem(
      "favorites",
      JSON.stringify({
        ...favs,
        [user._id]: updatedFavs,
      })
    );

    setIsFavorite(!isFavorite);
  };

  const openDetails = () => {
    dispatch(fetchPost(_id));
    navigate(`/post/${_id}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md hover:shadow-lg transition overflow-hidden w-full">
      
      {/* IMAGE */}
      <div className="w-full h-60 md:h-56 overflow-hidden rounded-t-xl">
        {images && <ImageCarousel images={images} />}
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col justify-between h-full">
        {/* Title + Price */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 truncate">
              {title}
            </h2>
            <p className="text-green-600 font-bold mt-1 text-sm md:text-base">
              Rs. {price?.toLocaleString()}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={openDetails}
              className="text-blue-600 hover:text-blue-700 transition"
              title="Details"
            >
              <FaEye size={20} />
            </button>
            <button
              onClick={toggleFavorite}
              className="text-red-500 hover:text-red-600 transition"
            >
              {isFavorite ? <FaHeart title="remove from favourites" size={20} /> : <FaRegHeart title="mark as favourite" size={20} />}
            </button>
          </div>
        </div>

        {/* Minimal Specs */}
        <div className="flex flex-wrap gap-2 mb-3">
          {city && <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium text-gray-800 dark:text-gray-200">{city}</span>}
          {transmission && <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium text-gray-800 dark:text-gray-200">{transmission}</span>}
          {engine && <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium text-gray-800 dark:text-gray-200">{engine}</span>}
          {!engine && fuelType && <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium text-gray-800 dark:text-gray-200">{fuelType}</span>}
        </div>

        {/* Contact Button */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mt-auto">
          <button
            onClick={() => setShowPhone(!showPhone)}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base rounded-lg transition font-medium"
          >
            <FaPhoneAlt />
            {showPhone ? "Hide Number" : "Contact Owner"}
          </button>
          {showPhone && (
            <span className="text-green-600 font-medium text-sm md:text-base">
              +{details.phone || "N/A"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostsCard;
