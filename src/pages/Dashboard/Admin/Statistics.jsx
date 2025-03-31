/* eslint-disable react/prop-types */
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { LineChart, Line, Tooltip, Legend } from "recharts";
import useAuth from "../../../hooks/useAuth";
import { FaCircleDollarToSlot, FaUsers } from "react-icons/fa6";
import { RiCaravanFill } from "react-icons/ri";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];

const Statistics = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: bookingStatsData = [], isLoading } = useQuery({
    queryKey: ["bookingStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookingStats");
      return res.data.bookingsByDate;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-28">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  console.log(bookingStatsData);

  // Custom shape for the bar chart
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
      y + height
    } ${x + width}, ${y + height}
        Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  return (
    <div>
      <h2 className="text-xl lg:text-3xl mb-4 font-bold uppercase">
        {" "}
        Hi, Welcome Back {user?.displayName ? user.displayName : "Back"}!
      </h2>
      <div className="stats shadow flex flex-col md:flex-row mt-8">
        <div className="stat">
          <div className="stat-title">Revenue</div>
          <div className="stat-value flex gap-2">
            $1280{" "}
            <div className="stat-figure text-[#ff6a00] text-2xl">
              <FaCircleDollarToSlot />
            </div>
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Users</div>
          <div className="stat-value flex gap-2">
            18{" "}
            <div className="stat-figure text-[#ff6a00] text-3xl">
              <FaUsers />
            </div>
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Delivery Man</div>
          <div className="stat-value flex gap-2">
            6{" "}
            <div className="stat-figure text-[#ff6a00] text-3xl">
              <FaUsers />
            </div>
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Booked Parcels</div>
          <div className="stat-value flex items gap-2">
            48{" "}
            <div className="stat-figure text-[#ff6a00] text-3xl">
              <RiCaravanFill />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col xl:flex-row justify-center items-center my-12 px-4 lg:px-0">
        {/* BAR CHART */}
        <div className="w-full lg:w-1/2 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={bookingStatsData}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                interval={0}
                angle={-20}
                tick={{ fontSize: 7 }}
              />
              <YAxis />
              <Bar
                dataKey="booked"
                fill="#8884d8"
                shape={<TriangleBar />}
                label={{ position: "top" }}
              >
                {bookingStatsData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* LINE CHART */}
        <div className="w-full lg:w-1/2 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={bookingStatsData}
              margin={{
                top: 20,
                right: 20,
                left: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                interval={0}
                angle={-20}
                tick={{ fontSize: 7 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="booked"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="delivered" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
