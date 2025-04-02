import { NavLink } from "react-router-dom";
import FreeShippingImg from "../../assets/image/FreeShipping.png";

const FreeShipping = () => {
  return (
    <div className="mt-12 md:mt-20 max-w-7xl mx-auto px-4 md:px-0">
      <div className="flex justify-center">
        <img
          src={FreeShippingImg}
          alt=""
        />
      </div>
      <div className="flex justify-center mt-3">
        <NavLink to="/dashboard/bookparcel">
          <button className="btn bg-[#8c87d7]  mt-[-57px] px-12 border-0 text-white border-b-4 border-[#0076b6af]">Claim Now</button>
        </NavLink>
      </div>
    </div>
  );
};

export default FreeShipping;
