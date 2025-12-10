import Reviews from "../Models/reviewsModel.js"
import User from '../Models/userModel.js'


// ✅ Add new review

export const addReview = async (req, res) => {
  try {
    const { name, Rating, comment } = req.body;

    // Validation
    if (!name || !comment) {
      return res.status(400).json({ message: "User ID and comment are required" });
    }

    // Get user with their profile picture
    const user = await User.findById(name).populate("pp"); // pp -> profile picture reference

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create new review
    const newReview = await Reviews.create({
      name,
      Rating,
      comment,
      userImage: user.pp?._id || null, // Save image ObjectId if exists
    });

    // Properly populate name and userImage
    const populatedReview = await Reviews.findById(newReview._id)
      .populate("name", "name email")
      .populate("userImage", "url");

    res.status(201).json({
      message: "Review added successfully",
      review: populatedReview,
    });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get all reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Reviews.find()
      .populate("name", "name email")
      .populate("Rating", "value")
      .populate("userImage", "url") // Include only 'url'
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// ✅ Get single review by ID
export const getReviewById = async (req, res) => {
  try {
    const review = await Reviews.findById(req.params.id)
      .populate("name")
      .populate("Rating", "value")
      .populate("userImage");

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update review
export const updateReview = async (req, res) => {
  try {
    const updatedReview = await Reviews.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({
      message: "Review updated successfully",
      review: updatedReview,
    });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete review
export const deleteReview = async (req, res) => {
  try {
    const deletedReview = await Reviews.findByIdAndDelete(req.params.id);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
