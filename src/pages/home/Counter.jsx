import CountUp from "react-countup";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaBoxesStacked, FaUsers } from "react-icons/fa6";
import { MdDeliveryDining } from "react-icons/md";
import { useEffect, useState } from "react";

const Counter = () => {
    const axiosPublic = useAxiosPublic();
    const [userCount, setUserCount] = useState(0);

    // Fetch booked parcels
    const { data: bookedParcels = []} = useQuery({
      queryKey: ["bookedParcels"],
      queryFn: async () => {
        const res = await axiosPublic.get("/bookedParcels");
        return res.data;
      },
    });

    // Fetch Users
    useEffect(() => {
        axiosPublic.get('/users/count')
          .then((res) => 
            {
                console.log(res.data) 
                setUserCount(res.data.totalUsers)
            })
          .catch((error) => console.error("Error fetching user count:", error));
      }, [axiosPublic]);

    const deliveredCount = bookedParcels.filter(parcel => parcel.deliveryStatus === "delivered").length

  return (
    <div className="w-full mx-auto flex justify-center">
      <div className="stats shadow mt-8 lg:mt-16 max-w-screen-xl mx-auto w-full">
        <div className="stat">
          <div className="stat-figure text-blue-800 text-3xl">
          <FaBoxesStacked />
          </div>
          <div className="stat-title font-semibold">Total Parcels Booked</div>
          <div className="stat-value">
            {" "}
            <CountUp start={0} end={bookedParcels.length} delay={0}>
              {({ countUpRef }) => (
                <div>
                  <span ref={countUpRef} />+
                </div>
              )}
            </CountUp>
          </div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="stat">
          <div className="stat-figure  text-blue-800 text-4xl">
          <MdDeliveryDining />
          </div>
          <div className="stat-title font-semibold">Total Parcels Delivered</div>
          <div className="stat-value">
            {" "}
            <CountUp start={0} end={deliveredCount} delay={0}>
              {({ countUpRef }) => (
                <div>
                  <span ref={countUpRef} />+
                </div>
              )}
            </CountUp>
          </div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-blue-800 text-3xl">
          <FaUsers />
          </div>
          <div className="stat-title font-semibold">Total Registed Users</div>
          <div className="stat-value">
            {" "}
            <CountUp start={0} end={userCount} delay={0}>
              {({ countUpRef }) => (
                <div>
                  <span ref={countUpRef} />+
                </div>
              )}
            </CountUp>
          </div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
