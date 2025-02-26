import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyDeliveryList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    if (!user?.email) return;
    const fetchDeliveries = async () => {
      try {
        const response = await axiosSecure.get("/bookedParcels", {
          params: { email: user.email },
        });
        console.log("API RESPONSE:", response.data);
        setDeliveries(response.data);
      } catch (error) {
        console.log("ERROR fetching deliveries", error.response?.data || error);
      }
    };
    fetchDeliveries();
  }, [user?.email, axiosSecure]);

  return (
    <div>
      <h2 className="text-3xl font-bold my-4 text-center">
        MY DELIVERY LIST
      </h2>
      <div className="overflow-x-auto">
        <table className="border-collapse border w-full min-w-max">
          <thead>
            <tr className="bg-gray-200 text-sm md:text-base">
              <th className="border p-2">Booked By</th>
              <th className="border p-2">Receiver</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Requested</th>
              <th className="border p-2">Approximate</th>
              <th className="border p-2">Receivers Phone</th>
              <th className="border p-2">Delivery Address</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((parcel) => (
              <tr key={parcel._id} className="border text-xs md:text-sm">
                <td className="border p-2">{parcel.name}</td>
                <td className="border p-2">{parcel.receiversName}</td>
                <td className="border p-2">{parcel.phone}</td>
                <td className="border p-2">
                  {parcel.deliveryDate?.split("T")[0]}
                </td>
                <td className="border p-2">
                  {parcel.approximateDeliveryDate?.split("T")[0]}
                </td>
                <td className="border p-2">{parcel.receiversPhone}</td>
                <td className="border p-2">{parcel.deliveryAddress}</td>
                <td className="border p-2 space-x-1">
                  {" "}
                  <button className="bg-yellow-500 text-white px-4 py-1 rounded">
                    Map
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">
                    Cancel
                  </button>
                  <button className="bg-green-500 text-white px-2 py-1 rounded">
                    Deliver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyDeliveryList;
