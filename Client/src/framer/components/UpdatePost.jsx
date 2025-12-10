import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPost, updatePostById } from "../Redux/Actions/postActions";
import ImageUploader from "./ImageUploading";
import { errorToast, successToast } from "./Toastify";

const UpdatePost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // post id from route

  const { post, loading, error } = useSelector((state) => state.posts);

  // Form state
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    mileage: "",
    engine: "",
    city: "",
    brand: "",
    model: "",
    year: "",
    bodyType: "Sedan",
    transmission: "automatic",
    fuelType: "petrol",
    phone: "",
  });

  // Images state
  const [imageIds, setImageIds] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // Populate form & images when post loads
  useEffect(() => {
    if (post && post._id === id) {
      setForm({
        title: post.title || "",
        description: post.description || "",
        price: post.price || "",
        mileage: post.mileage || "",
        engine: post.engine || "",
        city: post.city || "",
        brand: post.brand || "",
        model: post.model || "",
        year: post.year || "",
        bodyType: post.bodyType || "Sedan",
        transmission: post.transmission || "automatic",
        fuelType: post.fuelType || "petrol",
        phone: post.phone || "",
      });

      const imgs = post.images.map((img) => ({ id: img._id, url: img.url }));
      setExistingImages(imgs);
      setImageIds(imgs.map((img) => img.id));
    }
  }, [post, id]);

  // Fetch post by id
  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await dispatch(updatePostById(post._id, { ...form, images: imageIds }));
    successToast("Post updated successfully!");
    navigate("/seller/dashboard/posts");
  } catch (err) {
    errorToast("Failed to update post");
  }
};


  if (loading || !post) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-red-500 mt-10">{error}</p>;

  // Years for dropdown
  const years = [];
  for (let y = 2025; y >= 1990; y--) years.push(y);

  return (
    <div className="pt-[15vh] px-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-center">Update Post</h1>

      <form className="flex flex-col gap-4 text-black" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="border rounded px-3 py-2"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
          className="border rounded px-3 py-2"
        />

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="border rounded px-3 py-2"
        />

        <input
          type="text"
          name="mileage"
          value={form.mileage}
          onChange={handleChange}
          placeholder="Mileage"
          required
          className="border rounded px-3 py-2"
        />

        <input
          type="text"
          name="engine"
          value={form.engine}
          onChange={handleChange}
          placeholder="Engine capacity"
          required
          className="border rounded px-3 py-2"
        />

        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="City"
          required
          className="border rounded px-3 py-2"
        />

        <input
          type="text"
          name="brand"
          value={form.brand}
          onChange={handleChange}
          placeholder="Brand"
          required
          className="border rounded px-3 py-2"
        />

        <input
          type="text"
          name="model"
          value={form.model}
          onChange={handleChange}
          placeholder="Model"
          required
          className="border rounded px-3 py-2"
        />

        {/* Year */}
        <select
          name="year"
          value={form.year}
          onChange={handleChange}
          required
          className="border rounded px-3 py-2"
        >
          <option value="">Select Year</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        {/* Body Type */}
        <select
          name="bodyType"
          value={form.bodyType}
          required
          onChange={handleChange}
          className="border rounded px-3 py-2"
        >
          <option value="">Select Body Type</option>
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Hatchback">Hatchback</option>
          <option value="Coupe">Coupe</option>
          <option value="Convertible">Convertible</option>
          <option value="Truck">Truck</option>
          <option value="Van">Van</option>
          <option value="Crossover">Crossover</option>
        </select>

        {/* Transmission */}
        <select
          name="transmission"
          value={form.transmission}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        >
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
        </select>

        {/* Fuel Type */}
        <select
          name="fuelType"
          value={form.fuelType}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        >
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
          <option value="electric">Electric</option>
          <option value="CNG">CNG</option>
          <option value="LPG">LPG</option>
        </select>

        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone number"
          required
          className="border rounded px-3 py-2"
        />

        {/* Image Uploader */}
        <div className="mt-4">
          <ImageUploader
            existingImages={post.images}
            onChangeUploadedIds={setImageIds}
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
