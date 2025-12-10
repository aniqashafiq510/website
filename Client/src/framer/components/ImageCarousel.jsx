import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImageCarousel = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const showNext = (e) => {
    e.stopPropagation(); // Prevent closing modal
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const showPrev = (e) => {
    e.stopPropagation(); // Prevent closing modal
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* --- CAROUSEL --- */}
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        className="w-full h-64 rounded-lg"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img.url}
              alt="Car"
              onClick={() => openModal(index)}
              className="w-full h-full object-cover rounded-lg cursor-pointer"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* --- FULLSCREEN MODAL --- */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          {/* Image */}
          <img
            src={images[currentIndex].url}
            alt="Full"
            className="max-w-[90%] max-h-[90%] rounded-lg"
          />

          {/* Previous Button */}
          <button
            onClick={showPrev}
            className="absolute left-5 text-white text-4xl font-bold"
          >
            ❮
          </button>

          {/* Next Button */}
          <button
            onClick={showNext}
            className="absolute right-5 text-white text-4xl font-bold"
          >
            ❯
          </button>

          {/* Close Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
            className="absolute top-5 right-5 text-white text-3xl"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
};

export default ImageCarousel;
