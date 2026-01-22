import banner1 from "../../assets/image/bannerImage/b1.webp";
import banner2 from "../../assets/image/bannerImage/mainB.webp";
import banner3 from "../../assets/image/bannerImage/b3.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";

const Banner = () => {
  const banners = [banner2, banner1, banner3];

  return (
    <div className="relative bg-black pt-16 lg:pt-0">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        slidesPerView={1}
        className="w-full"
      >
        {banners.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="">
              <img
                src={img}
                className="h-[80%] lg:h-screen w-full object-cover object-center"
                alt=""
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
