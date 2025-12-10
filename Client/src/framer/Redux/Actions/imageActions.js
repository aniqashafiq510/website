import axios from "axios";
import apis from '../../../config/Api';
import {
  fetchImagesStart,
  fetchImagesSuccess,
  fetchImagesFailure,
  uploadImagesStart,
  uploadImagesSuccess,
  uploadImagesFailure,
  deleteImageStart,
  deleteImageSuccess,
  deleteImageFailure,
} from "../Slices/imageSlice";

// ─── Fetch all images ────────────────────────────────
const getAllImagesAction = () => async (dispatch) => {
  try {
    dispatch(fetchImagesStart());
    const { data } = await axios.get(`${apis.image}/get-images`);
    dispatch(fetchImagesSuccess(data.data)); // assuming backend sends { data: [images] }
  } catch (err) {
    dispatch(fetchImagesFailure(err.message));
  }
};

// ─── Upload images ───────────────────────────────────
const uploadImagesAction = (files) => async (dispatch) => {
  try {
    dispatch(uploadImagesStart());
    const formData = new FormData();
    files.forEach((file) => formData.append("image", file));

    const { data } = await axios.post(`${apis.image}/upload-image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // backend should return array of images [{_id, url}, ...]
    dispatch(uploadImagesSuccess(data.data || data)); 
    return data.data || data; // return uploaded images to component
  } catch (err) {
    dispatch(uploadImagesFailure(err.message));
    return []; // return empty array on failure
  }
};

// ─── Delete image ────────────────────────────────────
const deleteImageAction = (id) => async (dispatch) => {
  try {
    dispatch(deleteImageStart());
    const { data } = await axios.delete(`${apis.image}/delete-image/${id}`);
    // dispatch deleted image id so Redux slice can remove it
    dispatch(deleteImageSuccess(id));
    return data.success; // return backend success status
  } catch (err) {
    dispatch(deleteImageFailure(err.message));
    console.error("Delete failed:", err.message);
  }
};

export { getAllImagesAction, deleteImageAction, uploadImagesAction };
