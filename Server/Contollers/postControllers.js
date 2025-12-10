import Post from "../Models/postSchema.js";



// Add New Post

export const addPost = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      images,
      mileage,
      city,
      brand,
      transmission,
      fuelType,
      engine,
      postedBy,
      phone,model,year,bodyType
    } = req.body;

    // Create new post
    const newPost = await Post.create({
      title,
      description,
      price,
      images,
      mileage,
      city,
      brand,
      transmission,
      fuelType,
      engine,
      phone,
      postedBy,model,year,bodyType
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: newPost
    });
  } catch (error) {
    console.error("Add Post Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};


// Get All Posts

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("images").populate("postedBy");
    

    return res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    console.error("Get All Posts Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};


// Get Single Post

export const getSinglePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId).populate("images").populate("postedBy");

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    console.error("Get Single Post Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};


// Update Post

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      req.body,
      { new: true } // return updated document
    );

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost
    });
  } catch (error) {
    console.error("Update Post Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};


// Delete Post

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully"
    });
  } catch (error) {
    console.error("Delete Post Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};


