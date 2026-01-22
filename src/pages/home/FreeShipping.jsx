import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

import AuthContext from "../../context/AuthContext/AuthContext";
import FreeShippingImg from "../../assets/image/FreeShipping.png";

const FreeShipping = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

const handleClaimNow = () => {
  if (!user) {
    toast.warn("Please log in first!", {
      position: "top-right",
      autoClose: 2000,
      transition: Bounce,
    });

    navigate("/signin", { replace: true });
    window.scrollTo(0, 0); // ✅ instant jump, not scroll
    return;
  }

  navigate("/dashboard/bookparcel");
};


  return (
    <div className="mt-12 md:mt-20 max-w-7xl mx-auto px-4 md:px-0">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative flex justify-center"
      >
        {/* Image */}
        <img
          src={FreeShippingImg}
          alt="Free Shipping"
          className="w-full max-w-5xl rounded-2xl shadow-lg"
        />

        {/* Button pinned on image (no negative margin) */}
        <motion.button
          onClick={handleClaimNow}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute bottom-5 md:bottom-7 rounded-xl bg-[#8c87d7] px-10 md:px-12 py-3 text-white font-semibold border-b-4 border-[#0076b6af] shadow-lg hover:brightness-95 transition"
        >
          Claim Now
        </motion.button>
      </motion.div>
    </div>
  );
};

export default FreeShipping;
