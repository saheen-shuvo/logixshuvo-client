/* eslint-disable react/jsx-key */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DeliveredCount from "./DeliveredCount";
import AverageRating from "./AverageRating";

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
      <h2 className="text-3xl font-bold my-4 text-center">
        ALL DELIVERY MAN
      </h2>
      {/* TABLE */}
      {isLoading ? (
        <div className="flex justify-center items-center mt-28">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Parcel Delivered</th>
                <th>Average Rating</th>
              </tr>
            </thead>
            <tbody>
              {deliveryman.map((user, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <td className="font-semibold">{user.name}</td>
                  <td className="font-semibold">{user.phone}</td>
                  <th>
                    <DeliveredCount deliveryManId={user._id} />
                  </th>
                  <th>
                    <AverageRating deliveryManId={user._id} />
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllDeliveryMan;
