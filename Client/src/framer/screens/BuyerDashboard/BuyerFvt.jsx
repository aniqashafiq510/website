import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostsCard from "../../components/PostsCard";
import { useAuth } from "../../context/Context";
import { Link } from "react-router-dom";

const BuyerFavourites = () => {
  const { posts } = useSelector((state) => state.posts);
  const [auth] = useAuth(); // get user from context
  const user = auth?.user;

  const [favoritePosts, setFavoritePosts] = useState([]);

  useEffect(() => {
    if (!user || !posts) return;

    const favs = JSON.parse(localStorage.getItem("favorites")) || {};
    const userFavs = favs[user._id] || [];
    const filtered = posts.filter((p) => userFavs.includes(p._id));
    setFavoritePosts(filtered);
  }, [posts, user]);

  if (!user)
    return (
      <div className="pt-[20vh] md:ml-[25vw] text-center text-xl text-white dark:text-gray-700">
            <p>
              Please <Link className="text-green-500 underline" to="/login">login</Link> to see your favourite posts.
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

  if (favoritePosts.length === 0)
    return (
      <p className="text-center text-2xl pt-[20vh] mb-5">
        You have no favorite posts yet.
      </p>
    );

  return (
    <div className="pt-[20vh] px-4 md:ml-[25vw] grid grid-cols-1 gap-4 mb-5">
      {favoritePosts.map((post) => (
        <PostsCard key={post._id} details={post} />
      ))}
    </div>
  );
};

export default BuyerFavourites;
