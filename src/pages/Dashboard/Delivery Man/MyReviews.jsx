import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaStarHalfAlt } from "react-icons/fa";

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch user data to get deliveryManId
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      console.log("User Data:", res.data);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const deliveryManId = userData?._id;
  console.log(deliveryManId);

  // Fetch reviews only when deliveryManId is available
  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ["reviews", deliveryManId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${deliveryManId}`);
      return res.data;
    },
    enabled: !!deliveryManId,
  });

  if (userLoading || reviewsLoading)
    return (
      <div className="flex justify-center items-center mt-28">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );

    if (reviews.length === 0)
        return (
          <div className="flex justify-center items-center mt-28">
            <p>No reviews found.</p>
          </div>
        );

  return (
    <div>
      <h2 className="text-3xl font-bold my-4 text-center mb-8">MY REVIEWS</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review) => {
          const formattedDate = new Date(review.reviewDate).toLocaleDateString(
            "en-US",
            {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            }
          );
          return (
            <div className="card bg-base-100 shadow-xl" key={review._id}>
              <figure className="px-10 pt-10">
                <img
                  src={review.userImage}
                  alt={review.userName}
                  className="rounded-full w-36"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{review.userName}</h2>
                <p>{formattedDate}</p>
                <p className="flex justify-center items-center gap-1">{review.rating}<FaStarHalfAlt /></p>
                <p>{review.feedback}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyReviews;
