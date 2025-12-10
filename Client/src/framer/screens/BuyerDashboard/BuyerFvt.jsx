import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostsCard from "../../components/PostsCard";
import { useAuth } from "../../context/Context";

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
      <p className="text-center text-2xl pt-[20vh] mb-5">
        Please login to see your favorite posts.
      </p>
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
