import React from "react";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Home from "./screens/Home";
import Dashboard from "./screens/Dashboard";
import Activate from "./Auth/Activate";
import ForgetPassword from "./Auth/forgetPassword";
import NewPassword from "./Auth/NewPassword";
import Error from "./components/Error";
import AuthProvider from "./context/Context";
import LandingPage from "./screens/landPage/LandingPage";
import AdminUsers from './screens/AdminDashboard/AdminUsers'
import AdminProfile from './screens/AdminDashboard/AdminProfile'
import Footer from "./components/Footer";
import SellerProfile from "./screens/sellerDashboard/SellerProfile";
import MyPosts from "./screens/sellerDashboard/MyPosts";
import SellerDashboard from "./screens/sellerDashboard/SellerDashboard";
import ImageUploader from "./components/ImageUploading";
import AddPost from "./components/AddPost";
import UpdatePost from "./components/UpdatePost";
import UpdateUser from "./screens/sellerDashboard/UpdateProfile";
import MyFavourites from "./screens/sellerDashboard/MyFavourites";
import UsersPosts from "./screens/AdminDashboard/AllPosts";
import BuyerDashboard from "./screens/BuyerDashboard/BuyerDashboard";
import BuyerProfile from "./screens/BuyerDashboard/BuyerProfile";
import BuyerFavourites from "./screens/BuyerDashboard/BuyerFvt";
import PostDetails from "./components/PostDetails";
import BuyerReviews from "./screens/BuyerDashboard/BuyerReviews";
import { UserProvider } from "./context/UserContext";
import AddReview from "./components/Addreview";
import SellerReviews from "./screens/sellerDashboard/SellerReviews";
import AdminReviews from "./screens/AdminDashboard/AdminReviews";





// ⬇️ Layout stays the same
const Layout = ({ children }) => {
  const location = useLocation();
  const landPage = location.pathname === "/";
  

  return (
    <>
      <div className=" flex flex-col min-h-screen  bg-gradient-to-b from-violet-900 to-gray-900
       dark:bg-none dark:bg-white
       dark:text-black transition-colors ">
        <Header />
      <main className="flex-1">
        {landPage && <LandingPage />}
      {children}
      </main>
      <Footer/>
      
      </div>
    </>
  );
};

const AppContent = () => (
  <>
    <ToastContainer />
    <Layout>
      <Routes>
        <Route path="/" element={<div />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/activate/:token" element={<Activate />} />

        <Route path="/admin/dashboard" element={ <Dashboard />}>
              <Route index element={<AdminProfile  />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="allPosts" element={<UsersPosts />} />
              <Route path="allReviews" element={<AdminReviews/>} />
              
        </Route>
        <Route path="/seller/dashboard" element={ <SellerDashboard />}>
              <Route index element={<SellerProfile  />} />
              <Route path="posts" element={<MyPosts/>} />
              <Route path="profile" element={<SellerProfile />} />
              <Route path="myfavourites" element={<MyFavourites />} />
              <Route path="myreviews" element={<SellerReviews />} />
        </Route>
        <Route path="/buyer/dashboard" element={ <BuyerDashboard/>}>
              <Route index element={<BuyerProfile  />} />
              <Route path="profile" element={<BuyerProfile />} />
              <Route path="favourites" element={<BuyerFavourites />} />
              <Route path="reviews" element={<BuyerReviews />} />
        </Route>
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/edit-user" element={<UpdateUser />} />
        <Route path="/listings" element={<Home />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/newPassword/:resetToken" element={<NewPassword />} />
        <Route path="/error" element={<Error />} />
        <Route path="/upload-image" element={<ImageUploader />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/update-post/:id" element={<UpdatePost />} />
        <Route path="/add-review" element={<AddReview />} />
        
        
        
      </Routes>
    </Layout>
  </>
);

const App = () => (
  <AuthProvider>
    <UserProvider>
    <Router>
      <AppContent />
    </Router>
    </UserProvider>
  </AuthProvider>
);

export default App;
