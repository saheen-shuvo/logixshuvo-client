/* eslint-disable react/jsx-key */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DeliveredCount from "./DeliveredCount";
import AverageRating from "./AverageRating";
import Lottie from "lottie-react";
import LoadingAnimation from "../../../../public/Loading Animation.json";

const AllDeliveryMan = () => {
  const axiosSecure = useAxiosSecure();
  const { data: deliveryman = [], isLoading } = useQuery({
    queryKey: ["deliveryman"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/deliveryman");
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-xl lg:text-3xl font-bold my-0 lg:my-4 text-center pb-4">
        ALL DELIVERY MAN
      </h2>
      {/* TABLE */}
      {isLoading ? (
        <div className="flex justify-center items-center my-16">
          <Lottie
            animationData={LoadingAnimation}
            loop={true}
            className="w-24 h-24"
          />
        </div>
      ) : (
        <>
          {/* LARGE SCREEN */}
          <div className="overflow-x-auto hidden md:block">
            <table className="table w-full">
              {/* head */}
              <thead className="text-xs">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Delivered</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {deliveryman.map((user, index) => (
                  <tr className="text-xs">
                    <th>{index + 1}</th>
                    <td className="font-semibold">{user.name}</td>
                    <td className="font-semibold">{user.phone}</td>
                    <td className="font-semibold">
                      <DeliveredCount deliveryManId={user._id} />
                    </td>
                    <td className="font-semibold">
                      <AverageRating deliveryManId={user._id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* FOR SMALL SCREEN */}
          <div className="overflow-x-auto block md:hidden">
            {deliveryman.map((user, index) => (
              <table className="table table-zebra mb-4 border-2 border-gray-200 shadow-sm">
                <tbody>
                  <tr>
                    <th>Serial</th>
                    <td className="font-semibold">{index + 1}</td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <td className="font-semibold">{user.name}</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td className="font-semibold">{user.phone}</td>
                  </tr>
                  <tr>
                    <th>Delivered</th>
                    <td className="font-semibold">
                      {" "}
                      <DeliveredCount deliveryManId={user._id} />
                    </td>
                  </tr>
                  <tr>
                    <th>Rating</th>
                    <td className="font-semibold">
                      {" "}
                      <AverageRating deliveryManId={user._id} />
                    </td>
                  </tr>
                </tbody>
              </table>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllDeliveryMan;
