import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Context";
import { addNewPost } from "../Redux/Actions/postActions";
import ImageUploader from "../components/ImageUploading";
import { errorToast, successToast } from "../components/Toastify";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const AddPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [auth] = useAuth();
  const user = auth?.user;

  // Generate years 1990 → 2025
  const years = [];
  for (let y = 2025; y >= 1990; y--) years.push(y);

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

  const [imageIds, setImageIds] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?._id) return errorToast("User not logged in");

    if (!imageIds || imageIds.length === 0) {
    return errorToast("Please upload at least one image!");
  }
    const postData = {
      ...form,
      images: imageIds,
      postedBy: user._id,
    };

    await dispatch(addNewPost(postData));
    successToast("Post created successfully!");
    navigate("/seller/dashboard/posts");
  };

  return (
    <div className="pt-[15vh] px-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-center">Add New Post</h1>

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
          placeholder="Mileage (e.g., 13km/L)"
          required
          className="border rounded px-3 py-2"
        />

        <input
          type="text"
          name="engine"
          value={form.engine}
          onChange={handleChange}
          placeholder="Engine capacity (e.g., 1000 cc)"
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
          placeholder="Brand (e.g., Toyota)"
          required
          className="border rounded px-3 py-2"
        />

        <input
          type="text"
          name="model"
          value={form.model}
          onChange={handleChange}
          placeholder="Model (e.g., Corolla)"
          required
          className="border rounded px-3 py-2"
        />

        {/* YEAR DROPDOWN */}
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

        {/* BODY TYPE */}
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

        {/* TRANSMISSION */}
        <select
          name="transmission"
          value={form.transmission}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        >
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
        </select>

        {/* FUEL TYPE */}
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

        <PhoneInput
          country={'pk'}                  // default Pakistan
          value={form.phone}
          onChange={(phone) =>
            setForm((prev) => ({ ...prev, phone }))
          }

          // Remove label
          specialLabel=""

          // Show dropdown of ALL countries
          enableSearch={true}
          disableDropdown={false}

          placeholder="Phone number"

          // Styling
          containerClass="w-full"
          inputClass="border rounded px-3 py-2 w-full"
          buttonClass="border"
          required
        />



        {/* IMAGE UPLOADER */}
        <div className="mt-4">

          <ImageUploader onChangeUploadedIds={setImageIds}
          maxImages={10} />
        </div>

        <button
          type="submit"
          className="mt-4 bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
        >
          Submit Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
