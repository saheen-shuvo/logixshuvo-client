import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const MyParcels = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [parcels, setParcels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/parcels?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setParcels(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching parcels:", error);
          setLoading(false);
        });
    }
  }, [user?.email]);

  const handleUpdate = (id) => {
    console.log(`Update parcel: ${id}`);
  };

  const handleCancel = (id) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, cancel it!",
        }).then((result) => {
          if (result.isConfirmed) {
            axiosPublic.delete(`/parcels/${id}`).then((response) => {
                console.log(response.data);
              if (response.data.success === true) {
                Swal.fire({
                  title: "Deleted!",
                  text: "The user has been deleted.",
                  icon: "success",
                });
              }
            });
          }
        });
  };

  const handleReview = (id) => {
    console.log(`Review parcel: ${id}`);
  };

  const handlePayment = (id) => {
    console.log(`Pay for parcel: ${id}`);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold my-4 text-center">MY PARCELS</h2>
      {parcels.length === 0 ? (
        <p>No parcels found.</p>
      ) : (
        <table className="border-collapse border w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Type</th>
              <th className="border p-2">Requested Date</th>
              <th className="border p-2">Approximate Date</th>
              <th className="border p-2">Booking Date</th>
              <th className="border p-2">Delivery Man ID</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel) => (
              <tr key={parcel._id} className="border">
                <td className="border p-2">{parcel.type}</td>
                <td className="border p-2">{parcel.deliveryDate}</td>
                <td className="border p-2">
                  {parcel.approximateDeliveryDate?.split("T")[0]}
                </td>
                <td className="border p-2">
                  {parcel.bookingDate?.split("T")[0]}
                </td>
                <td className="border p-2">
                  {parcel.deliveryManId || "Not Assigned"}
                </td>
                <td className="border p-2">{parcel.deliveryStatus}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleUpdate(parcel._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Update
                  </button>
                  {parcel.deliveryStatus === "pending" && (
                    <button
                      onClick={() => handleCancel(parcel._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  )}
                  {parcel.deliveryStatus === "delivered" && (
                    <button
                      onClick={() => handleReview(parcel._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Review
                    </button>
                  )}
                  <button
                    onClick={() => handlePayment(parcel._id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Pay
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyParcels;
