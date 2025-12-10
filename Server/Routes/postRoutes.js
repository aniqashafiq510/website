import express from "express";
import { addPost,getAllPosts,getSinglePost,updatePost,deletePost } from "../Contollers/postControllers.js";

const postRouter = express.Router();

postRouter.post("/create", addPost);                 // Add Post
postRouter.get("/", getAllPosts);              // Get All Posts (with pagination + filters)
postRouter.get("/:id", getSinglePost);         // Get Single Post
postRouter.put("/:id", updatePost);            // Update Post
postRouter.delete("/:id", deletePost);         // Delete Post


export default postRouter;
