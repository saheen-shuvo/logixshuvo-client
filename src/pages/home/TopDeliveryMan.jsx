import { FaRegStarHalfStroke } from "react-icons/fa6";

const TopDeliveryMan = () => {
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
        <div className="card bg-base-100 shadow-sm">
          <figure className="px-10 pt-10">
            <img
              src="https://i.ibb.co.com/5XHSxH9p/dm-1.jpg"
              alt="Shoes"
              className="rounded-full"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Emtiaz Abir</h2>
            <p className="text-base">
                Parcel Delivered: 7
            </p>
            <p className="text-base flex items-center gap-1">
                Rating: 5 <FaRegStarHalfStroke />
            </p>
          </div>
        </div>
        {/* Delivery Man 2 */}
        <div className="card bg-base-100  shadow-sm">
          <figure className="px-10 pt-10">
            <img
              src="https://i.ibb.co.com/PZqjCXCS/dm-2.jpg"
              alt="Shoes"
              className="rounded-full w-"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Shahneaz Rashid</h2>
            <p className="text-base">
                Parcel Delivered: 5
            </p>
            <p className="text-base flex items-center gap-1">
                Rating: 4.7 <FaRegStarHalfStroke />
            </p>
          </div>
        </div>
        {/* Delivery Man 3 */}
        <div className="card bg-base-100 shadow-sm">
          <figure className="px-10 pt-10">
            <img
              src="https://i.ibb.co.com/zHGzZHxT/dm-3.jpg"
              alt="Shoes"
              className="rounded-full"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Fahad Hossain</h2>
            <p className="text-base">
                Parcel Delivered: 2
            </p>
            <p className="text-base flex items-center gap-1">
                Rating: 4.3 <FaRegStarHalfStroke />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopDeliveryMan;
