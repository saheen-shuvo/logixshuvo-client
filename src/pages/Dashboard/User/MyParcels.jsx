import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyParcels = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
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
        axiosSecure.delete(`/parcels/${id}`).then((response) => {
          console.log(response.data);
          if (response.data.success === true) {
            Swal.fire({
              title: "Canceled!",
              text: "The has been canceled Successfully.",
              icon: "success",
            });
            setParcels((prevParcels) =>
              prevParcels.filter((parcel) => parcel._id !== id)
            );
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
        <p className="text-center">No parcels found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="border-collapse border w-full min-w-max">
            <thead>
              <tr className="bg-gray-200 text-sm md:text-base">
                <th className="border p-2 whitespace-nowrap">Type</th>
                <th className="border p-2 whitespace-nowrap">Requested Date</th>
                <th className="border p-2 whitespace-nowrap">Approx. Date</th>
                <th className="border p-2 whitespace-nowrap">Booking Date</th>
                <th className="border p-2 whitespace-nowrap">
                  Delivery Man ID
                </th>
                <th className="border p-2 whitespace-nowrap">Status</th>
                <th className="border p-2 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel) => (
                <tr key={parcel._id} className="border text-xs md:text-sm">
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
                  <td className="border p-2">
                    <div className="flex flex-wrap gap-2">
                      <Link to={`/dashboard/updateparcel/${parcel._id}`}>
                        <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs md:text-sm">
                          Update
                        </button>
                      </Link>

                      {parcel.deliveryStatus === "pending" ? (
                        <button
                          onClick={() => handleCancel(parcel._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded text-xs md:text-sm"
                        >
                          Cancel
                        </button>
                      ) : (
                        <button
                          disabled
                          className="bg-gray-400 text-white px-2 py-1 rounded text-xs md:text-sm cursor-not-allowed opacity-50"
                        >
                          Cancel
                        </button>
                      )}

                      {parcel.deliveryStatus === "delivered" ? (
                        <button
                          onClick={() => handleReview(parcel._id)}
                          className="bg-green-500 text-white px-2 py-1 rounded text-xs md:text-sm"
                        >
                          Review
                        </button>
                      ) : (
                        <button
                          disabled
                          className="bg-gray-400 text-white px-2 py-1 rounded text-xs md:text-sm cursor-not-allowed opacity-50"
                        >
                          Review
                        </button>
                      )}

                      <button
                        onClick={() => handlePayment(parcel._id)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded text-xs md:text-sm"
                      >
                        Pay
                      </button>
                    </div>
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

export default MyParcels;
