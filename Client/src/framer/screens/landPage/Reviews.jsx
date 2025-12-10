import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { RiUserHeartFill } from "react-icons/ri";
import axios from "axios";
import apis from "../../../config/Api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";

const Reviews = () => {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  

  // 🔥 Counter State
  const [currentIndex, setCurrentIndex] = useState(1);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`${apis.reviews}/get-All`);
      setReviews(data.reviews);
      console.log(data.reviews)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 dark:text-black">Loading reviews...</div>
    );
  }

  return (
    <div className="md:mt-20 md:ml-8 mt-5 ml-5 bg-transparent">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, stiffness: 20, duration: 1.2 }}
        viewport={{ once: true }}
        className="md:text-3xl text-2xl font-semibold dark:text-violet-800"
      >
        Our Happy Customers
      </motion.h2>

      {/* 🔥 REVIEW COUNTER */}
      <div className="text-right mr-[10vw] text-lg font-semibold mt-2">
        {currentIndex} / {reviews.length}
      </div>

      <div className="w-[70%] mx-auto mt-10">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          centeredSlides={true}
          spaceBetween={30}
          slidesPerView={1}
          onSlideChange={(swiper) => {
            // swiper.realIndex = correct index even when looped
            setCurrentIndex(swiper.realIndex + 1);
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {reviews.map((r, index) => (
            <SwiperSlide key={r._id || index}>
              <motion.div
                initial={{ opacity: 0.6, scale: 0.85 }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.4 },
                }}
                viewport={{ once: true }}
                className="bg-white/20 dark:bg-black/20 backdrop-blur-md p-5 rounded-xl h-full"
              >
                <p className="italic">"{r.comment}"</p>

                <div className="mt-4">
                  <div className="rounded-full bg-violet-400 flex p-3">
                    {r?.userImage ? (
                      <img
                        src={r.userImage?.url}
                        alt={r.name}
                        className="w-[30%] rounded-full"
                      />
                    ) : (
                      <RiUserHeartFill className="text-6xl text-black" />
                    )}

                    <div className="flex flex-col justify-center items-center mx-auto">
                      <h2>{r.name?.name || r.name?.email}</h2>

                      <div className="flex mt-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-300">
                            {i < (r.Rating?.value || 0) ? (
                              <FaStar />
                            ) : (
                              <FaRegStar />
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;
