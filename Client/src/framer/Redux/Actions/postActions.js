import apis from '../../../config/Api'
import { 
  setLoading,
  setPost,
  setPosts,
  addPost,
  updatePost,
  delPost,
  setError
} from '../Slices/postSlice'
import axios from 'axios'



// Fetch all posts (with filters & pagination)

const fetchPosts = () => async (dispatch) => {
  dispatch(setLoading())
  try {
    const { data } = await axios.get(apis.posts)
    const { data: posts } = data 
    dispatch(setPosts(posts))
  } catch (error) {
    console.log(error.message)
    dispatch(setError(error.message))
  }
}


// Fetch single post by ID
const fetchPost = (id) => async (dispatch) => {
  dispatch(setLoading())
  try {
    const { data } = await axios.get(`${apis.posts}/${id}`)
    dispatch(setPost(data.data))  // assuming backend sends {data: post}
  } catch (error) {
    console.log(error.message)
    dispatch(setError(error.message))
  }
}


// Add new post
const addNewPost = (newPost) => async (dispatch) => {
  dispatch(setLoading())
  try {
    const { data } = await axios.post(`${apis.posts}/create`, newPost)
    dispatch(addPost(data.data)) // assuming backend sends {data: newPost}
  } catch (error) {
    console.log(error.message)
    dispatch(setError(error.message))
  }
}


// Delete post
const deletePostById = (id) => async (dispatch) => {
  dispatch(setLoading())
  try {
    const { data } = await axios.delete(`${apis.posts}/${id}`)
    dispatch(delPost(id))
    return data.success
  } catch (error) {
    console.log(error.message)
    dispatch(setError(error.message))
  }
}


// Update post

const updatePostById = (id, postData) => async (dispatch) => {
  dispatch(setLoading())
  try {
    const { data } = await axios.put(`${apis.posts}/${id}`, postData)
    dispatch(updatePost(data.data)) // assuming backend sends {data: updatedPost}
    return data.success
  } catch (error) {
    console.log(error.message)
    dispatch(setError(error.message))
  }
}

export {
  fetchPosts,
  fetchPost,
  addNewPost,
  deletePostById,
  updatePostById
}
