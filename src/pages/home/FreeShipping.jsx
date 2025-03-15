import { NavLink } from "react-router-dom";
import FreeShippingImg from "../../assets/image/Free Shipping.jpg";

const FreeShipping = () => {
  return (
    <div className="mt-8 md:mt-16 max-w-7xl mx-auto px-4 md:px-0">
      <div>
        <h1 className="text-center text-red-400 font-extrabold text-2xl md:text-5xl">
          FREE SHIPPING
        </h1>
        <h3 className="text-center font-bold text-base md:text-lg">
          PROMO: LOGIX123
        </h3>
        <p className="text-center text-xs font-semibold mb-3">(Condition Applies)</p>
      </div>
      <div className="flex justify-center">
        <img
          className="border-4 border-blue-800 border-dotted"
          src={FreeShippingImg}
          alt=""
        />
      </div>
      <div className="flex justify-center mt-3">
        <NavLink to="/dashboard/bookparcel">
          <button className="btn btn-primary mt-[-62px] px-12">Claim Now</button>
        </NavLink>
      </div>
    </div>
  );
};

export default FreeShipping;
