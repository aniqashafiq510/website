
import express from 'express'
import * as rev from '../Contollers/reviewController.js'

const reviewRouter = express.Router();

// ✅ Add a new review
reviewRouter.post("/add", rev.addReview);

// ✅ Get all reviews
reviewRouter.get("/get-All", rev.getAllReviews);

// ✅ Get a single review by ID
reviewRouter.get("/:id", rev.getReviewById);

// ✅ Update a review by ID
reviewRouter.put("/:id", rev.updateReview);

// ✅ Delete a review by ID
reviewRouter.delete("/:id", rev.deleteReview);






export default reviewRouter