import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../Redux/Actions/postActions";
import { useParams } from "react-router-dom";
import ImageCarousel from "./ImageCarousel";
import BigLoader from "./BigLoader";
import { Link } from "react-router-dom";


const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { post, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);

  if (loading) return <BigLoader/>
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!post) return null;

  return (
    <div className="w-full min-h-screen pt-[20vh] pb-20 mx-auto max-w-4xl px-4">

      {/* ====== TOP IMAGES ====== */}
      <div className=" mb-2">
        <ImageCarousel images={post.images} />
      </div>

      {/* ====== DETAILS + DESCRIPTION (merged) ====== */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">

        {/* Title & Price */}
        <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
        <p className="text-2xl font-semibold text-green-700 mt-1">
          Rs. {post.price?.toLocaleString()}
        </p>

        {/* Grid Details */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-800 mt-4">
          <p><strong>City:</strong> {post.city}</p>
          <p><strong>Transmission:</strong> {post.transmission}</p>
          <p><strong>Mileage:</strong> {post.mileage}</p>
          <p><strong>Fuel:</strong> {post.fuelType}</p>
          <p><strong>Body:</strong> {post.bodyType}</p>
          <p><strong>Model:</strong> {post.model}</p>
          <p><strong>Year:</strong> {post.year}</p>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-lg leading-relaxed mt-6">
          {post.description}
        </p>

      </div>

      <div className="mt-4"><Link className=" hover:underline" to="/listings">Back to listings</Link></div>
    </div>
  );
};

export default PostDetails;
