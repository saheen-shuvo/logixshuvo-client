/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const DeliveredCount = ({ deliveryManId }) => {
  const axiosPublic = useAxiosPublic();

  const fetchDeliveredCount = async () => {
    const res = await axiosPublic.get(`/parcelsDelivered/${deliveryManId}`);
    return res.data.count;
  };
  const { data: deliveredCount, isLoading } = useQuery({
    queryKey: ["deliveredCount", deliveryManId],
    queryFn: fetchDeliveredCount,
    enabled: !!deliveryManId,
  });

  if (isLoading) return <span>...</span>;

  return [deliveredCount];
};

export default DeliveredCount;
