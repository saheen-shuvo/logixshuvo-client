import { FaRegStarHalfStroke } from "react-icons/fa6";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import DeliveredCount from "../Dashboard/Admin/DeliveredCount";
import { motion } from "framer-motion";

// ✅ hardcoded images
const images = [
  "https://i.ibb.co.com/5XHSxH9p/dm-1.jpg",
  "https://i.ibb.co.com/PZqjCXCS/dm-2.jpg",
  "https://i.ibb.co.com/zHGzZHxT/dm-3.jpg",
];

const brandText = "text-[#0276b6]";
const brandBg = "bg-[#0276b6]";

const cardVariants = {
  hidden: { opacity: 0, y: 26 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: i * 0.12 },
  }),
};

const TopDeliveryMan = () => {
  const axiosPublic = useAxiosPublic();

  const { data: topDeliverymen = [], isLoading } = useQuery({
    queryKey: ["topDeliverymen"],
    queryFn: async () => {
      const res = await axiosPublic.get("/deliveryman/top-rated");
      return res.data;
    },
  });

  const top3 = topDeliverymen.slice(0, 3);

  return (
    <div id="top-deliveryman" className="mt-10 lg:mt-20 max-w-screen-xl mx-auto px-4 lg:px-0 scroll-mt-24">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight uppercase">
          Top Delivery Man
        </h2>
        <p className="mt-2 text-sm lg:text-base text-gray-500">
          Meet our top three heroes who keep deliveries fast, safe, and reliable.
        </p>
      </div>

      {/* Cards */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {top3.map((man, idx) => (
          <motion.div
            key={man?._id || idx}
            custom={idx}
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="group rounded-2xl bg-base-100 shadow-md hover:shadow-2xl transition overflow-hidden"
          >
            {/* Accent bar */}
            <div className={`${brandBg} h-1`} />

            <div className="p-6 text-center relative">
              {/* Rank badge */}
              <div className="absolute top-4 left-4 bg-[#0276b6]/10 text-[#0276b6] px-3 py-1 rounded-full text-xs font-bold">
                #{idx + 1}
              </div>

              {/* Avatar */}
              <div className="mx-auto w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden ring-4 ring-[#0276b6]/20">
                <img
                  src={images[idx]}
                  alt={`Delivery Man ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <h3 className="mt-6 text-2xl font-bold">
                {man?.name || "Delivery Man"}
              </h3>

              <div className="mt-3 space-y-2">
                <p className="text-sm font-semibold text-gray-700">
                  Parcels Delivered:{" "}
                  <span className={brandText}>
                    <DeliveredCount deliveryManId={man?._id} />
                  </span>
                </p>

                <p className="text-sm font-semibold flex justify-center items-center gap-1">
                  Rating:{" "}
                  <span className={`${brandText} font-bold`}>
                    {man?.averageRating ?? 0}
                  </span>
                  <FaRegStarHalfStroke className={brandText} />
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {isLoading && (
        <p className="text-center mt-10 text-sm text-gray-500">
          Loading top delivery men...
        </p>
      )}
    </div>
  );
};

export default TopDeliveryMan;
