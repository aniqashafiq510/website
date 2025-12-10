import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../../components/ImageUploading";
import { errorToast, successToast } from "../../components/Toastify";
import apis from "../../../config/Api";


const UpdateUser = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const user = auth?.user;

  // ----------- FORM STATE -----------
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    gender: "",
    dob: "",
  });

  // ----------- IMAGE STATE -----------
  const [imageIds, setImageIds] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // Populate form & existing image when user loads
  useEffect(() => {
    if (user) {
      setForm({
        name: user?.name || "",
        address: user?.address || "",
        city: user?.city || "",
        state: user?.state || "",
        country: user?.country || "",
        zipcode: user?.zipcode || "",
        gender: user?.gender || "",
        dob: user?.dob || "",
      });

      // Safely set previous profile picture
      if (user?.pp && user.pp._id) {
        setExistingImages([{ id: user.pp._id, url: user.pp.url || "" }]);
        setImageIds([user.pp._id]);
      }
    }
  }, [user]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Only send pp if it exists
      const payload = { ...form };
      if (imageIds[0]) payload.pp = imageIds[0];

      const res = await axios.put(
        `${apis.User}/update-profile/${user?._id}`,
        payload
      );

      if (res.data.ok) {
        successToast("Profile updated successfully!");

        // Update auth context & localStorage
        setAuth((prev) => ({ ...prev, user: res.data.user }));
        localStorage.setItem(
          "auth",
          JSON.stringify({ ...auth, user: res.data.user })
        );

        navigate(`/${user?.role}/dashboard/profile`);
      }
    } catch (err) {
      console.error(err);
      errorToast("Failed to update profile");
    }
  };

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="pt-[22vh] px-6 w-[60%] mb-5 mx-[25vw]">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Update Your Profile
      </h1>

      <form className="flex flex-col gap-4 text-black" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="City"
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="state"
          value={form.state}
          onChange={handleChange}
          placeholder="State"
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="country"
          value={form.country}
          onChange={handleChange}
          placeholder="Country"
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="zipcode"
          value={form.zipcode}
          onChange={handleChange}
          placeholder="Zipcode"
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          name="gender"
          value={form.gender}
          onChange={handleChange}
          placeholder="Gender"
          className="border rounded px-3 py-2"
        />
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />

        {/* Image Uploader */}
        <div className="mt-4">
          <ImageUploader
            existingImages={existingImages}
            onChangeUploadedIds={setImageIds}
            maxImages={1}
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
