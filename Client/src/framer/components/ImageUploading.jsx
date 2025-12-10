import React, { useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";
import { useDispatch, useSelector } from "react-redux";
import { uploadImagesAction, deleteImageAction } from "../Redux/Actions/imageActions";
import { AiOutlineClose } from "react-icons/ai";
import Loader from "./Loader";

const ImageUploader = ({ onChangeUploadedIds, existingImages = [], maxImages = 10 }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.imgSlice || {});
  const [images, setImages] = useState([]);

  // Initialize with existing images
  useEffect(() => {
    if (existingImages && existingImages.length) {
      const imgs = existingImages.map((img) => ({
        id: img._id || img.id,
        url: img.url,
      }));
      setImages(imgs);
      if (onChangeUploadedIds) onChangeUploadedIds(imgs.map((img) => img.id));
    }
  }, [existingImages, onChangeUploadedIds]);

  // Update parent with current image IDs
  const updateParent = (imagesArr) => {
    if (onChangeUploadedIds) {
      onChangeUploadedIds(imagesArr.map((img) => img.id));
    }
  };

  // Handle file selection and upload
  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    // Limit new files based on maxImages
    const allowedFiles = files.slice(0, maxImages - images.length);

    for (let file of allowedFiles) {
      try {
        const resizedFile = await new Promise((resolve) => {
          Resizer.imageFileResizer(file, 1080, 720, "JPEG", 90, 0, resolve, "file");
        });

        const uploadedArray = await dispatch(uploadImagesAction([resizedFile]));
        if (!uploadedArray || !uploadedArray.length) throw new Error("Upload failed");

        const { _id, url } = uploadedArray[0];

        setImages((prev) => {
          const next = [...prev, { id: _id, url }];
          updateParent(next);
          return next;
        });
      } catch (err) {
        console.error("Upload error:", err);
      }
    }

    e.target.value = ""; // Reset input
  };

  // Delete image
  const handleDelete = async (id, e) => {
    e.stopPropagation();
    try {
      await dispatch(deleteImageAction(id));
      setImages((prev) => {
        const next = prev.filter((img) => img.id !== id);
        updateParent(next);
        return next;
      });
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Upload Button */}
      {images.length < maxImages && (
        <label className="inline-block w-32 bg-blue-600 text-white p-1 rounded cursor-pointer hover:bg-blue-700">
          Choose Images
          <input
            type="file"
            hidden
            accept="image/*"
            multiple={maxImages > 1} // allow multiple only if maxImages > 1
            onChange={handleFiles}
          />
        </label>
      )}

      {/* Image Thumbnails */}
      <div className="flex flex-wrap gap-3 mt-2">
        {images.map((img) => (
          <div key={img.id} className="relative w-24 h-24">
            <img
              src={img.url}
              alt="uploaded"
              className="w-24 h-24 object-cover rounded border"
            />
            <button
              type="button"
              onClick={(e) => handleDelete(img.id, e)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              <AiOutlineClose size={14} />
            </button>
          </div>
        ))}
      </div>

      {loading && <p className="text-gray-500 mt-2"><Loader /></p>}
    </div>
  );
};

export default ImageUploader;
