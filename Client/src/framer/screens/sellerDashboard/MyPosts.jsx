import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts,deletePostById} from "../../Redux/Actions/postActions";
import { Link, useNavigate } from "react-router-dom";
import PostsCard from "../../components/PostsCard";
import { useAuth } from "../../context/Context"; 
import { IoTrashBin } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import BigLoader from "../../components/BigLoader";


const MyPosts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [auth] = useAuth();
  const user = auth?.user;

  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <BigLoader />;
  if (error) return <p className="text-red-500">{error}</p>;

  const delHandler = (id)=> {
       const confirm = window.confirm("Are you sure you want to delete the post?")
      if(confirm){
        dispatch(deletePostById(id))
      }
  }

  // Filter posts by logged-in user correctly
  const userPosts =
    posts?.filter(
      (post) => post.postedBy?._id?.toString() === user?._id?.toString()
    ) || [];

  return (
    <div className="pt-[20vh] px-6 ml-[20vw]">
      {/* HEADER */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold">My Posts</h1>
      </div>
    {/* Add Post Button */}
      <div className="flex justify-end items-center m-3">
        <button
          onClick={() => navigate("/add-post")}
          className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
        >
          + Add New Post
        </button>
      </div>

      {/* POSTS LIST */}
      {userPosts.length === 0 ? (
        <div className="text-center">You have not created any posts yet.</div>
      ) : (
        <div className="ml-[5vw] grid grid-cols-1 gap-4">
          {userPosts.map((post) => (
            <div className="bg-white rounded-md ">
              <PostsCard key={post._id} details={post} />
              <div className="my-4 flex justify-end space-x-3 mr-4 ">
                <button
                  onClick={() => delHandler(post._id)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 hover:bg-red-200 transition text-red-500"
                  title="Delete"
                >
                  <IoTrashBin className="text-xl" />
                </button>
                <Link
                  to={`/update-post/${post._id}`}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 hover:bg-green-200 transition text-green-500"
                  title="Edit"
                >
                  <FaEdit className="text-xl" />
                </Link>
              </div>
            </div>
            
          ))}
        </div>
      )}

      
      
    </div>
  );
};

export default MyPosts;
