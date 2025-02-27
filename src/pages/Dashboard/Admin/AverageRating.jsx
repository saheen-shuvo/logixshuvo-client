/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaStarHalfAlt } from "react-icons/fa";

const fetchAverageRating = async(deliveryManId, axiosSecure) => {
    const res = await axiosSecure.get(`/reviews/average/${deliveryManId}`);
    return res.data.averageRating;
  }

const AverageRating = ({ deliveryManId }) => {
  const axiosSecure = useAxiosSecure();
  const { data: averageRating, isLoading } = useQuery({
    queryKey: ["averageRating", deliveryManId],
    queryFn: () => fetchAverageRating(deliveryManId, axiosSecure),
    enabled: !!deliveryManId,
  });
  if (isLoading) return <span>Loading...</span>;
  return <span className="flex items-center gap-1">{averageRating ? averageRating.toFixed(2) : "No Reviews"}<FaStarHalfAlt /></span>;
};

export default AverageRating;
