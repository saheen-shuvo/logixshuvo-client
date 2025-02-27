import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const MyDeliveryList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: deliveries = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myDeliveries", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(
        `/myassignedparcels?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDeliver = async (id) => {
    try {
      const response = await axiosSecure.patch(`/updateStatus/${id}`, {
        deliveryStatus: "delivered",
      });
      if (response.data.success) {
        Swal.fire({
          title: "Delivered!",
          text: "You have delivered successfully!",
          icon: "success",
        });
        refetch();
      } else {
        toast.error("Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleCancel = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.patch(`/updateStatus/${id}`, {
            deliveryStatus: "canceled",
          });
  
          if (response.data.success) {
            Swal.fire({
              title: "Canceled!",
              text: "The parcel has been canceled.",
              icon: "success",
            });
            refetch();
          } else {
            toast.error("Failed to cancel parcel.");
          }
        } catch (error) {
          console.error("Error canceling parcel:", error);
          toast.error("Something went wrong!");
        }
      }
    });
  };
  

  return (
    <div>
      <h2 className="text-3xl font-bold my-4 text-center">MY DELIVERY LIST</h2>
      {isLoading ? (
        <div className="flex justify-center items-center mt-28">
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
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
                    <button
                      onClick={() => handleCancel(parcel._id)}
                      disabled={parcel.deliveryStatus === "canceled"}
                      className={`px-2 py-1 rounded text-white ${
                        parcel.deliveryStatus === "canceled"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500"
                      }`}
                    >
                      {parcel.deliveryStatus === "canceled"
                        ? "Canceled"
                        : "Cancel"}
                    </button>
                    <button
                      onClick={() => handleDeliver(parcel._id)}
                      disabled={parcel.deliveryStatus === "delivered"}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      {parcel.deliveryStatus === "delivered"
                        ? "Delivered"
                        : "Deliver"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyDeliveryList;
