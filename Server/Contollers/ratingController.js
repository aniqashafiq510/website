import Rating from "../Models/ratingSchema.js";



export const addRating = async (req, res) => {
  try {
    const { value } = req.body;

    if (!value || value < 0.5 || value > 5) {
      return res.status(400).json({ message: "Rating value must be between 0.5 and 5" });
    }

    const newRating = await Rating.create({ value });

    res.status(201).json({
      message: "Rating added successfully",
      rating: newRating,
    });
  } catch (error) {
    console.error("Error adding rating:", error);
    res.status(500).json({ message: "Server error while adding rating", error: error.message });
  }
};


export const updateRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;

    if (!value || value < 0.5 || value > 5) {
      return res.status(400).json({ message: "Rating value must be between 0.5 and 5" });
    }

    const updatedRating = await Rating.findByIdAndUpdate(
      id,
      { value },
      { new: true }
    );

    if (!updatedRating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    res.status(200).json({
      message: "Rating updated successfully",
      rating: updatedRating,
    });
  } catch (error) {
    console.error("Error updating rating:", error);
    res.status(500).json({ message: "Server error while updating rating", error: error.message });
  }
};

// DELETE RATING
export const deleteRating = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRating = await Rating.findByIdAndDelete(id);

    if (!deletedRating) {
      return res.status(404).json({ message: "Rating not found" });
    }

    res.status(200).json({
      message: "Rating deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting rating:", error);
    res.status(500).json({ message: "Server error while deleting rating", error: error.message });
  }
};
