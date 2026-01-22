import CountUp from "react-countup";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import { FaBoxesStacked, FaUsers } from "react-icons/fa6";
import { MdDeliveryDining } from "react-icons/md";

const brand = "text-[#0276b6]";

// eslint-disable-next-line react/prop-types
const StatCard = ({ icon: Icon, title, value, desc, delay = 0, startCount }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className="rounded-2xl bg-base-100 shadow-md hover:shadow-xl transition p-6 flex-1"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>

          <div className="mt-3 text-4xl md:text-5xl font-extrabold tracking-tight">
            {startCount ? (
              <CountUp start={0} end={value} duration={1.6} separator="," />
            ) : (
              0
            )}
            <span className="text-base font-semibold text-gray-400">+</span>
          </div>

          <p className="mt-2 text-xs text-gray-500">{desc}</p>
        </div>

        <div
          className={`rounded-2xl p-3 bg-[#0276b6]/10 ${brand}`}
          aria-hidden="true"
        >
          <Icon className="text-3xl" />
        </div>
      </div>
    </motion.div>
  );
};

const Counter = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [userCount, setUserCount] = useState(0);

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 });

  // Fetch booked parcels
  const { data: bookedParcels = [] } = useQuery({
    queryKey: ["bookedParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookedParcels");
      return res.data;
    },
  });

  // Fetch users count
  useEffect(() => {
    let mounted = true;
    axiosPublic
      .get("/users/count")
      .then((res) => {
        if (mounted) setUserCount(res.data.totalUsers ?? 0);
      })
      .catch((error) => console.error("Error fetching user count:", error));
    return () => {
      mounted = false;
    };
  }, [axiosPublic]);

  const deliveredCount = useMemo(() => {
    return bookedParcels.filter((p) => p.deliveryStatus === "delivered").length;
  }, [bookedParcels]);

  return (
    <div ref={ref} className="w-full mx-auto mt-10 lg:mt-20 max-w-screen-xl px-4 lg:px-0">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <StatCard
          icon={FaBoxesStacked}
          title="Total Parcels Booked"
          value={bookedParcels.length}
          desc="All-time booked parcels"
          delay={0}
          startCount={inView}
        />

        <StatCard
          icon={MdDeliveryDining}
          title="Total Parcels Delivered"
          value={deliveredCount}
          desc="Delivered successfully"
          delay={0.1}
          startCount={inView}
        />

        <StatCard
          icon={FaUsers}
          title="Total Registered Users"
          value={userCount}
          desc="All-time registered users"
          delay={0.2}
          startCount={inView}
        />
      </motion.div>
    </div>
  );
};

export default Counter;
