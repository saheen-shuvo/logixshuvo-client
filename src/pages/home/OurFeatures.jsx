import img1 from "../../assets/image/safetyParcel.jpg";
import img2 from "../../assets/image/fastDelivery.jpg";
import img3 from "../../assets/image/doorDelivery.jpg";

import { AiFillSafetyCertificate } from "react-icons/ai";
import { FaDoorOpen, FaShippingFast } from "react-icons/fa";

const OurFeatures = () => {
  const features = [
    {
      img: img1,
      title: "Parcel Safety",
      desc: "Ensuring secure packaging, real-time tracking, and reliable delivery for every parcel.",
      Icon: AiFillSafetyCertificate,
      alt: "Parcel Safety",
    },
    {
      img: img2,
      title: "Super Fast Delivery",
      desc: "Lightning-fast shipping with efficient routes, real-time tracking, and on-time delivery.",
      Icon: FaShippingFast,
      alt: "Fast Delivery",
    },
    {
      img: img3,
      title: "Doorstep Delivery",
      desc: "Convenient doorstep delivery with speed, security, and reliability for every package.",
      Icon: FaDoorOpen,
      alt: "Doorstep Delivery",
    },
  ];

  return (
    <div id="features" className="mt-10 lg:mt-20 max-w-screen-xl mx-auto scroll-mt-24">
      {/* Section Header */}
      <div className="mb-8 lg:mb-14 text-center">
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight uppercase">
          Our Features
        </h2>
        <p className="mt-2 text-sm lg:text-base text-gray-500 px-4">
          Discover the key benefits that make our platform stand out.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 lg:px-0">
        {features.map(({ img, title, desc, Icon, alt }, idx) => (
          <div
            key={idx}
            className="group rounded-2xl overflow-hidden bg-base-100 shadow-md hover:shadow-2xl transition duration-300"
          >
            <div className="h-64 overflow-hidden">
              <img
                src={img}
                alt={alt}
                className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            <div className="p-6">
              <div className="flex items-center gap-3 text-[#0276b6]">
                <Icon className="text-3xl" />
                <h3 className="text-xl font-semibold">{title}</h3>
              </div>

              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurFeatures;
