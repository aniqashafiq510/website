import { createSlice } from "@reduxjs/toolkit";


const Initial = {
     images: [""],
    loading: false,
    error: null
}

const imageSlice = createSlice({
  name: "images",
  initialState: Initial,

  reducers: {
    // ---- Fetch all images ----
    fetchImagesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchImagesSuccess: (state, action) => {
      state.loading = false;
      state.images = action.payload;
    },
    fetchImagesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ---- Upload images ----
    uploadImagesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    uploadImagesSuccess: (state, action) => {
      state.loading = false;
      state.images = [...state.images, ...action.payload];
    },
    uploadImagesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ---- Delete image ----
    deleteImageStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteImageSuccess: (state, action) => {
      state.loading = false;
      state.images = state.images.filter((img) => img._id !== action.payload);
    },
    deleteImageFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export actions
export const  {
  fetchImagesStart,
  fetchImagesSuccess,
  fetchImagesFailure,
  uploadImagesStart,
  uploadImagesSuccess,
  uploadImagesFailure,
  deleteImageStart,
  deleteImageSuccess,
  deleteImageFailure,
} = imageSlice.actions;

// Reducer export
export default imageSlice.reducer;