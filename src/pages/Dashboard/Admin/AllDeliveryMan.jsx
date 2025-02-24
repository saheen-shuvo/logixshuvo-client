/* eslint-disable react/jsx-key */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdDeleteForever } from "react-icons/md";

const AllDeliveryMan = () => {

    const axiosSecure = useAxiosSecure();
    const { data: deliveryman = [] } = useQuery({
      queryKey: ["deliveryman"],
      queryFn: async () => {
        const res = await axiosSecure.get("/users/deliveryman");
        return res.data;
      },
    });

    return (
            <div>
      <div className="flex justify-evenly my-4">
        <h2 className="text-2xl font-semibold">All Delivery Man</h2>
        <h2 className="text-2xl font-semibold">Total Delivery Man: {deliveryman.length}</h2>
      </div>
      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Parcel Delivered</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {deliveryman.map((user, index) => (
              <tr>
                <th>{index + 1}</th>
                <td className="font-semibold">{user.name}</td>
                <td className="font-semibold">{user.phone}</td>
                <th>
                <button>
                    {user.role}
                  </button>
                </th>
                <th>
                  <button
                    className="text-3xl text-red-600"
                  >
                    <MdDeleteForever />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default AllDeliveryMan;