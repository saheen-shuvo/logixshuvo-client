/* eslint-disable react/jsx-key */
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import LoadingAnimation from '../../../../public/Loading Animation.json'

const AllParcels = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch booked parcels
  const {
    data: bookedParcels = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["bookedParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookedParcels");
      return res.data;
    },
  });

  // Fetch deliverymen
  const { data: deliveryman = [] } = useQuery({
    queryKey: ["deliveryman"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/deliveryman");
      return res.data;
    },
  });

  const [selectedParcel, setSelectedParcel] = useState(null);
  const [selectedDeliveryman, setSelectedDeliveryman] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const updateParcelMutation = useMutation({
    mutationFn: async ({ parcelId, deliveryManId, date }) => {
      return await axiosSecure.patch(`/bookedParcels/${parcelId}`, {
        deliveryStatus: "On The Way",
        deliveryManId: deliveryManId,
        approximateDeliveryDate: date,
      });
    },
    onSuccess: () => {
      Swal.fire({
        title: "Successful!",
        text: "Delivery Assigned Successfully",
        icon: "success",
      });
      refetch();
      setSelectedParcel(null);
    },
  });

  const handleAssignDelivery = () => {
    if (!selectedParcel || !selectedDeliveryman || !deliveryDate) {
      toast.warn("Please Select Delivery Man and Delivery Date!");
      return;
    }
    updateParcelMutation.mutate({
      parcelId: selectedParcel._id,
      deliveryManId: selectedDeliveryman,
      date: deliveryDate,
    });
    document.getElementById("manage_modal").close();
  };

  const filteredParcels = bookedParcels.filter((parcel) => {
    if (!fromDate || !toDate) return true;
    const requestedDate = new Date(parcel.bookingDate);
    return (
      requestedDate >= new Date(fromDate) && requestedDate <= new Date(toDate)
    );
  });

  return (
    <div>
      <h2 className="text-xl lg:text-3xl font-bold my-0 lg:my-4 text-center">
        ALL BOOKED PARCELS
      </h2>
      {/* Search Filters */}
      <div className="flex my-8 gap-1 md:gap-2 items-center">
        <label className="text-sm font-semibold">From:</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border border-gray-300 p-2 rounded w-[120px] text-sm"
        />

        <label className="text-sm font-semibold">To:</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border border-gray-300 p-2 w-[120px] text-sm rounded"
        />
      </div>

      <div>
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
            {/* FOR LARGE SCREEN */}
            <div className="overflow-x-auto hidden lg:block">
              <table className="table w-full">
                {/* head */}
                <thead>
                  <tr className="text-xs">
                    <th>#</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Booked</th>
                    <th>Requested</th>
                    <th>Cost</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredParcels.map((parcel, index) => (
                    <tr className="text-xs">
                      <td className="font-semibold">{index + 1}</td>
                      <td className="font-semibold">{parcel.name}</td>
                      <td className="font-semibold">{parcel.phone}</td>
                      <td className="font-semibold">
                        {parcel.bookingDate?.split("T")[0]}
                      </td>
                      <td className="font-semibold">{parcel.deliveryDate}</td>
                      <td className="font-semibold">{parcel.deliveryCharge}</td>
                      <td className="uppercase font-semibold">{parcel.deliveryStatus}</td>
                      <td className="font-semibold">
                        {parcel.deliveryStatus === "pending" ? (
                          <>
                            <button
                              onClick={() => {
                                setSelectedParcel(parcel);
                                document
                                  .getElementById("manage_modal")
                                  .showModal();
                              }}
                              className="btn btn-sm bg-green-500 text-white px-2 py-1 rounded"
                            >
                              Manage
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className=" text-white px-2 py-1 rounded btn btn-sm"
                              disabled
                            >
                              Manage
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* FOR SMALL SCREEN */}
            <div className="overflow-x-auto block md:hidden">
              {filteredParcels.map((parcel, index) => (
                <table className="table table-zebra mb-4 border-2 border-gray-200 shadow-sm">
                  <tbody>
                    <tr>
                      <th >Serial</th>
                      <td className="font-semibold">{index + 1}</td>
                    </tr>
                    <tr>
                      <th>Name</th>
                      <td className="font-semibold">{parcel.name}</td>
                    </tr>
                    <tr>
                      <th>Phone</th>
                      <td className="font-semibold">{parcel.phone}</td>
                    </tr>
                    <tr>
                      <th>Booked</th>
                      <td className="font-semibold">{parcel.bookingDate?.split("T")[0]}</td>
                    </tr>
                    <tr>
                      <th>Requested</th>
                      <td className="font-semibold">{parcel.deliveryDate}</td>
                    </tr>
                    <tr>
                      <th>Cost</th>
                      <td className="font-semibold">{parcel.deliveryCharge}</td>
                    </tr>
                    <tr>
                      <th>Status</th>
                      <td className="font-semibold">{parcel.deliveryStatus}</td>
                    </tr>
                    <tr>
                      <th>Action</th>
                      <td className="font-semibold">
                        {parcel.deliveryStatus === "pending" ? (
                          <>
                            <button
                              onClick={() => {
                                setSelectedParcel(parcel);
                                document
                                  .getElementById("manage_modal")
                                  .showModal();
                              }}
                              className="bg-green-500 text-white px-2 py-1 rounded btn btn-sm"
                            >
                              Manage
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className=" text-white px-2 py-1 rounded btn btn-sm"
                              disabled
                            >
                              Manage
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      {selectedParcel && (
        <dialog id="manage_modal" className="modal open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Assign Delivery Man</h3>
            <p>
              <strong>Parcel:</strong> {selectedParcel.name}
            </p>
            <p>
              <strong>Phone:</strong> {selectedParcel.phone}
            </p>
            <p>
              <strong>Current Status:</strong>{" "}
              <span className="uppercase">{selectedParcel.deliveryStatus}</span>
            </p>

            <label className="block mt-3">Select Deliveryman:</label>
            <select
              className="w-full border p-2 rounded border-gray-400"
              value={selectedDeliveryman}
              onChange={(e) => setSelectedDeliveryman(e.target.value)}
            >
              <option value="">-- Choose a Deliveryman --</option>
              {deliveryman.map((man) => (
                <option key={man._id} value={man._id}>
                  {man.name}
                </option>
              ))}
            </select>

            <label className="block mt-3">Delivery Date:</label>
            <input
              type="date"
              className="w-full border border-gray-400 p-2 rounded"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
            />

            <button
              onClick={handleAssignDelivery}
              className="bg-green-500 text-white px-3 py-2 rounded mt-4 w-full btn"
            >
              Assign
            </button>

            <button
              onClick={() => setSelectedParcel(null)}
              className="bg-red-500 text-white px-3 py-2 rounded mt-2 w-full btn"
            >
              Close
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AllParcels;
