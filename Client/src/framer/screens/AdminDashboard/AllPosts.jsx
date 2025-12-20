import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts,deletePostById} from "../../Redux/Actions/postActions";
import PostsCard from "../../components/PostsCard";
import { IoTrashBin } from "react-icons/io5";
import BigLoader from "../../components/BigLoader";
import { useAuth } from "../../context/Context";
import { successToast } from "../../components/Toastify";




const UsersPosts = () => {
  const [auth] = useAuth()
  const dispatch = useDispatch();
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
        successToast("Post deleted successfully!")
      }
  }
  if (!auth?.user) {
  return (
    <div className="pt-[20vh] md:ml-[25vw] text-center text-xl text-red-400 dark:text-gray-700">
      <p>
        Only admin can access this page!
      </p>
    </div>
  );}

return (
    <div className=" px-6 ml-[15vw]">
      {/* HEADER */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold">All Posts</h1>
      </div>
    {/* Add Post Button */}
      

      {/* POSTS LIST */}
      {posts.length === 0 ? (
        <div className="text-center">You have not created any posts yet.</div>
      ) : (
        <div className="ml-[5vw] grid grid-cols-1 gap-4 ">
          {posts.map((post) => (
            <div className="bg-white rounded-md">
              <PostsCard key={post._id} details={post} />
              <div className="my-4 flex justify-end space-x-3 mr-4 ">
                <button
                className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 hover:bg-red-200 transition text-red-500"
                title="delete" onClick={() => delHandler(post._id)}><IoTrashBin className="text-xl"/></button>
                
              </div>
            </div>
            
          ))}
        </div>
      )}

      
      
    </div>
  );
};

export default UsersPosts;
