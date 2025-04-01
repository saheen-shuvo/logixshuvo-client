import { FaRegStarHalfStroke } from "react-icons/fa6";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import DeliveredCount from "../Dashboard/Admin/DeliveredCount";

const TopDeliveryMan = () => {
  const axiosPublic = useAxiosPublic();

  const { data: topDeliverymen = [] } = useQuery({
    queryKey: ['topDeliverymen'],
    queryFn: async () => {
      const res = await axiosPublic.get('/deliveryman/top-rated');
      return res.data;
    }
  });
  console.log(topDeliverymen)

  return (
    <div className="mt-8 lg:mt-16 max-w-screen-xl mx-auto">
      <h2 className="text-center text-3xl lg:text-5xl font-bold lg:py-2">
        TOP DELIVERY MAN
      </h2>
      <p className="text-center text-xs px-4">
          Meet our top three best hero that keeps our hopes alive and strong.
        </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 md:mx-0 mt-12">
        {/* Delivery Man 1 */}
        <div className="card bg-base-100 shadow-lg">
          <figure className="px-10 pt-10 relative">
            <img className="w-12 absolute top-2 left-0" src="https://img.icons8.com/?size=100&id=X6CJMckcVrBj&format=png&color=000000" alt="" />
            <img
              src="https://i.ibb.co.com/5XHSxH9p/dm-1.jpg"
              alt="Shoes"
              className="rounded-full w-52 h-52 object-cover"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl">{topDeliverymen[0]?.name}</h2>
            <p className="text-base font-semibold">
                Parcel Delivered: <DeliveredCount deliveryManId={topDeliverymen[0]?._id}></DeliveredCount>
            </p>
            <p className="text-base font-semibold flex items-center gap-1">
                Rating: {topDeliverymen[0]?.averageRating} <FaRegStarHalfStroke />
            </p>
          </div>
        </div>
        {/* Delivery Man 2 */}
        <div className="card bg-base-100  shadow-lg">
          <figure className="px-10 pt-10 relative">
            <img className="w-12 absolute top-2 left-0" src="https://img.icons8.com/?size=100&id=dgAxfaiZaNr6&format=png&color=000000" alt="" />
            <img
              src="https://i.ibb.co.com/PZqjCXCS/dm-2.jpg"
              alt="Shoes"
              className="rounded-full w-52 h-52 object-cover"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl">{topDeliverymen[1]?.name}</h2>
            <p className="text-base font-semibold">
                Parcel Delivered: <DeliveredCount deliveryManId={topDeliverymen[1]?._id}></DeliveredCount>
            </p>
            <p className="text-base font-semibold flex items-center gap-1">
                Rating: {topDeliverymen[1]?.averageRating} <FaRegStarHalfStroke />
            </p>
          </div>
        </div>
        {/* Delivery Man 3 */}
        <div className="card bg-base-100 shadow-lg">
          <figure className="px-10 pt-10 relative">
            <img className="w-12 absolute top-2 left-0" src="https://img.icons8.com/?size=100&id=lMwvkoCmvpSJ&format=png&color=000000" alt="" />
            <img
              src="https://i.ibb.co.com/zHGzZHxT/dm-3.jpg"
              alt="Shoes"
              className="rounded-full w-52 h-52 object-cover"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl">{topDeliverymen[2]?.name}</h2>
            <p className="text-base font-semibold">
                Parcel Delivered: <DeliveredCount deliveryManId={topDeliverymen[2]?._id}></DeliveredCount>
            </p>
            <p className="text-base font-semibold flex items-center gap-1">
                Rating: {topDeliverymen[2]?.averageRating} <FaRegStarHalfStroke />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopDeliveryMan;
