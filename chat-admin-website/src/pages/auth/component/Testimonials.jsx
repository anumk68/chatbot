import React, { useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import "swiper/css";
import "swiper/css/pagination";

import test1 from "../../../assets/test-1.png";
import test2 from "../../../assets/test-2.png";

// Testimonial data
const testimonials = [
  {
    image: test1,
    role: "Web Developer",
    details:
      "I recently worked with Get Web on a custom WordPress plugin project. I was very impressed with their ability to deliver high-quality work on time.",
    name: "Larry Diamond",
  },
  {
    image: test2,
    role: "UI/UX Designer",
    details:
      "Get Web exceeded my expectations. Their team is professional, responsive, and highly skilled.",
    name: "Sarah Watson",
  },
  {
    image: test1,
    role: "Web Developer",
    details:
      "The project was handled very smoothly. Communication and delivery were excellent.",
    name: "James Carter",
  },
  {
    image: test1,
    role: "Product Manager",
    details:
      "Amazing experience working with Get Web. Highly recommended for any web project.",
    name: "Emily Brown",
  },
  {
    image: test2,
    role: "Marketing Lead",
    details:
      "Professional team with strong technical expertise. Will definitely work again.",
    name: "Daniel Smith",
  },
];

const Testimonial = () => {
  const swiperRef = useRef(null);

  const handlePrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Heading */}
        <h4 className="bg-blue-500 px-3 py-1 mb-3 rounded w-max text-white">
          Testimonials
        </h4>

        <div className="flex items-center justify-between mb-10">
          <h2 className="text-[48px] leading-[55px] font-bold text-gray-900">
            What Our Clients Say
          </h2>

          {/* Custom Navigation */}
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="h-12 w-12 rounded-full border-2
              flex items-center justify-center
              bg-blue-500 hover:text-white border-blue-500 text-white
              transition-all duration-300 hover:scale-110 cursor-pointer"
            >
              <MdKeyboardArrowLeft size={26} />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="h-12 w-12 rounded-full border-2
              flex items-center justify-center
              bg-blue-500 hover:text-white border-blue-500  text-white cursor-pointer
              transition-all duration-300 hover:scale-110"
            >
              <MdKeyboardArrowRight size={26} />
            </button>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay, Pagination]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          loop
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-14"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="h-full rounded-xl bg-white p-8 shadow-md hover:shadow-lg transition">
                <img
                  src={item.image}
                  alt={item.name}
                  className="mx-auto mb-4 h-20 w-20 rounded-full object-cover"
                />

                <h4 className="text-center text-[20px] font-semibold">
                  {item.name}
                </h4>

                <p className="mb-4 text-center text-sm text-gray-500">
                  {item.role}
                </p>

                {/* Stars */}
                <div className="flex justify-center mb-4 text-3xl text-blue-500">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                <p className="text-center text-gray-600 italic">
                  “{item.details}”
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
