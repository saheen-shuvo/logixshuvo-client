import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AllParcels = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch booked parcels
  const { data: bookedParcels = [], refetch } = useQuery({
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
      toast.warn("Please Select Delivery Man and Delivery Date!")
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
      <h2 className="text-3xl font-bold my-4 text-center">
        ALL BOOKED PARCELS
      </h2>
      {/* Search Filters */}
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <label>From:</label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border p-2 rounded"
        />

        <label>To:</label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="border-collapse border w-full min-w-max">
          <thead>
            <tr className="bg-base-300 text-sm md:text-base">
              <th className="border p-2">Name</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Booked</th>
              <th className="border p-2">Requested</th>
              <th className="border p-2">Cost</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredParcels.map((parcel) => (
              <tr key={parcel._id} className="border text-xs md:text-sm">
                <td className="border p-2">{parcel.name}</td>
                <td className="border p-2">{parcel.phone}</td>
                <td className="border p-2">
                  {parcel.bookingDate?.split("T")[0]}
                </td>
                <td className="border p-2">{parcel.deliveryDate}</td>
                <td className="border p-2">{parcel.deliveryCharge}</td>
                <td className="border p-2">{parcel.deliveryStatus}</td>
                <td className="border p-2">
                  <button
                    onClick={() => {
                      setSelectedParcel(parcel);
                      document.getElementById("manage_modal").showModal();
                    }}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedParcel && (
        <dialog id="manage_modal" className="modal open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Assign Delivery</h3>
            <p>
              <strong>Parcel:</strong> {selectedParcel.name}
            </p>
            <p>
              <strong>Phone:</strong> {selectedParcel.phone}
            </p>
            <p>
              <strong>Current Status:</strong> {selectedParcel.deliveryStatus}
            </p>

            <label className="block mt-3">Select Deliveryman:</label>
            <select
              className="w-full border p-2 rounded"
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
              className="w-full border p-2 rounded"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
            />

            <button
              onClick={handleAssignDelivery}
              className="bg-green-500 text-white px-3 py-2 rounded mt-4 w-full"
            >
              Assign Delivery
            </button>

            <button
              onClick={() => setSelectedParcel(null)}
              className="bg-red-500 text-white px-3 py-2 rounded mt-2 w-full"
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
