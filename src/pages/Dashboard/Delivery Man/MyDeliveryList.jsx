/* eslint-disable react/jsx-key */
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import loadingAnimation from "../../../../public/Loading Animation.json";
import MapComponent from "./MapComponent";

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
      <h2 className="text-xl lg:text-3xl font-bold my-0 lg:my-4 text-center pb-4">
        MY DELIVERY LIST
      </h2>
      {/* TABLE */}
      {isLoading ? (
        <div className="flex justify-center items-center my-16">
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            className="w-24 h-24"
          />
        </div>
      ) : (
        <>
          {/* FOR LARGE SCREEN */}
          <div className="overflow-x-auto hidden xl:block">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr className="text-xs">
                  <th>#</th>
                  <th>Booked By</th>
                  <th>Receiver</th>
                  <th>Phone</th>
                  <th>Requested</th>
                  <th>Approximate</th>
                  <th>Receivers Phone</th>
                  <th>Delivery Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {deliveries.map((parcel, index) => (
                  <tr className="text-xs">
                    <th className="font-semibold">{index + 1}</th>
                    <td className="font-semibold">{parcel.name}</td>
                    <td className="font-semibold">{parcel.receiversName}</td>
                    <td className="font-semibold">{parcel.phone}</td>
                    <td className="font-semibold">
                      {parcel.deliveryDate?.split("T")[0]}
                    </td>
                    <td className="font-semibold">
                      {parcel.approximateDeliveryDate?.split("T")[0]}
                    </td>
                    <td className="font-semibold">{parcel.receiversPhone}</td>
                    <td className="font-semibold">{parcel.deliveryAddress}</td>
                    <td className="flex gap-1">
                      {" "}
                      {/* VIEW MAP BUTTON */}{" "}
                      <MapComponent
                        latitude={parcel.latitude}
                        longitude={parcel.longitude}
                        address={parcel.deliveryAddress}
                      ></MapComponent>
                      {/* Cancel Button */}
                      <button
                        onClick={() => handleCancel(parcel._id)}
                        disabled={parcel.deliveryStatus !== "pending"}
                        className={`btn btn-xs w-16 text-white ${
                          parcel.deliveryStatus === "canceled"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-500"
                        }`}
                      >
                        {parcel.deliveryStatus === "canceled"
                          ? "Canceled"
                          : "Cancel"}
                      </button>
                      {/* Deliver Button */}
                      <button
                        onClick={() => handleDeliver(parcel._id)}
                        disabled={parcel.deliveryStatus === "delivered"}
                        className={`btn btn-xs w-16 text-white ${
                          parcel.deliveryStatus === "delivered"
                            ? "bg-green-500 cursor-not-allowed"
                            : "bg-green-500"
                        }`}
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

          {/* FOR SMALL SCREEN */}
          <div className="overflow-x-auto block xl:hidden">
            {deliveries.map((parcel, index) => (
              <table className="table table-zebra mb-4 border-2 border-gray-200 shadow-sm">
                <tbody>
                  <tr>
                    <th>Serial</th>
                    <td className="font-semibold">{index + 1}</td>
                  </tr>
                  <tr>
                    <th>Booked By</th>
                    <td className="font-semibold">{parcel.name}</td>
                  </tr>
                  <tr>
                    <th>Receiver</th>
                    <td className="font-semibold">{parcel.receiversName}</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td className="font-semibold">{parcel.phone}</td>
                  </tr>
                  <tr>
                    <th>Requested</th>
                    <td className="font-semibold">
                      {parcel.deliveryDate?.split("T")[0]}
                    </td>
                  </tr>
                  <tr>
                    <th>Approximate</th>
                    <td className="font-semibold">
                      {parcel.approximateDeliveryDate?.split("T")[0]}
                    </td>
                  </tr>
                  <tr>
                    <th>Receivers Phone</th>
                    <td className="font-semibold">{parcel.receiversPhone}</td>
                  </tr>
                  <tr>
                    <th>Delivery Address</th>
                    <td className="font-semibold">{parcel.deliveryAddress}</td>
                  </tr>
                  <tr>
                    <th>Action</th>
                    <td className="flex gap-1">
                      {" "}
                      {/* VIEW MAP BUTTON */}{" "}
                      <MapComponent
                        latitude={parcel.latitude}
                        longitude={parcel.longitude}
                        address={parcel.deliveryAddress}
                      ></MapComponent>
                      {/* Cancel Button */}
                      <button
                        onClick={() => handleCancel(parcel._id)}
                        disabled={parcel.deliveryStatus !== "pending"}
                        className={`btn btn-xs text-white ${
                          parcel.deliveryStatus === "canceled"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-500"
                        }`}
                      >
                        {parcel.deliveryStatus === "canceled"
                          ? "Canceled"
                          : "Cancel"}
                      </button>
                      {/* Deliver Button */}
                      <button
                        onClick={() => handleDeliver(parcel._id)}
                        disabled={parcel.deliveryStatus === "delivered"}
                        className={`btn btn-xs text-white ${
                          parcel.deliveryStatus === "delivered"
                            ? "bg-green-500 cursor-not-allowed"
                            : "bg-green-500"
                        }`}
                      >
                        {parcel.deliveryStatus === "delivered"
                          ? "Delivered"
                          : "Deliver"}
                      </button>
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

export default MyDeliveryList;
