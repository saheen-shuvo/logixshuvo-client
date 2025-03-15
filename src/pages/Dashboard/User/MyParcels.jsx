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
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://logixshuvo-server-saheen-alam-shuvos-projects.vercel.app/parcels?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setParcels(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Error fetching parcels:", error);
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

  const handleReview = (parcel) => {
    setSelectedParcel(parcel);
  };

  const submitReview = () => {
    if (!rating || !feedback) {
      Swal.fire("Error", "Please fill out all fields!", "error");
      return;
    }

    if (rating < 1 || rating > 5) {
      Swal.fire("Error", "Rating must be between 1 and 5", "error");
      return;
    }

    const reviewData = {
      userName: user?.displayName,
      userImage: user?.photoURL,
      rating,
      feedback,
      deliveryManId: selectedParcel.deliveryManId,
      reviewDate: new Date().toISOString(),
    };

    axiosSecure.post("/reviews", reviewData).then((response) => {
      console.log(response);
      if (response.data.success) {
        Swal.fire("Success", "Review submitted successfully!", "success");
        setSelectedParcel(null);
        setFeedback("");
        setRating(5);
      }
    });
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
                          onClick={() => handleReview(parcel)}
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

                      {parcel.paymentStatus === "paid" ? (
                        <button
                          disabled
                          className="bg-green-500 text-white px-2 py-1 rounded text-xs md:text-sm cursor-not-allowed"
                        >
                          Paid
                        </button>
                      ) : parcel.deliveryStatus === "pending" ? (
                        <Link to="/dashboard/payment" state={{ parcel }}>
                          <button className="bg-yellow-500 text-white px-2 py-1 rounded text-xs md:text-sm">
                            Pay
                          </button>
                        </Link>
                      ) : (
                        <button
                          disabled
                          className="bg-gray-400 text-white px-2 py-1 rounded text-xs md:text-sm cursor-not-allowed opacity-50"
                        >
                          Pay
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedParcel && (
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
              <div className="bg-blue-200  p-5 rounded-lg w-96">
                <h3 className="text-xl font-bold mb-4">Give Review</h3>
                <p>
                  <strong>Name:</strong> {user.displayName}
                </p>
                <p>
                  <strong>Image:</strong>{" "}
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-10 h-10 rounded-full inline-block ml-2"
                  />
                </p>
                <p>
                  <strong>Delivery Man ID:</strong>{" "}
                  {selectedParcel.deliveryManId}
                </p>
                <div className="mt-2">
                  <label>Rating:</label>
                  <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    min="1"
                    max="5"
                    className="border p-2 w-full"
                  />
                </div>
                <div className="mt-2">
                  <label>Feedback:</label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="border p-2 w-full"
                  />
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={() => setSelectedParcel(null)}
                    className="bg-gray-500 text-white px-3 py-1 btn rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitReview}
                    className="bg-blue-500 text-white px-3 py-1 rounded btn"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyParcels;
