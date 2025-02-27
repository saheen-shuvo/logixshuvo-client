/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const DeliveredCount = ({ deliveryManId }) => {
  console.log(deliveryManId);
  const axiosSecure = useAxiosSecure();

  const fetchDeliveredCount = async () => {
    const res = await axiosSecure.get(`/parcelsDelivered/${deliveryManId}`);
    return res.data.count;
  };
  const { data: deliveredCount, isLoading } = useQuery({
    queryKey: ["deliveredCount", deliveryManId],
    queryFn: fetchDeliveredCount,
    enabled: !!deliveryManId,
  });

  if (isLoading) return <span>counting...</span>;

  return <span>{deliveredCount}</span>;
};

export default DeliveredCount;
