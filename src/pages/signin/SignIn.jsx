/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext/AuthContext";
import { toast } from "react-toastify";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import SocialLogin from "../../shared/SocialLogin";
import authImg from "../../assets/image/authentication.gif";
import { GoSignIn } from "react-icons/go";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

const SignIn = () => {
  const { signInUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [disabled, setDisabled] = useState(true); // disabled until captcha ok
  const [loading, setLoading] = useState(false);

  const captchaRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  // Load captcha
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const resetCaptcha = () => {
    // reload new captcha + reset input + lock button again
    loadCaptchaEnginge(6);
    setDisabled(true);
    if (captchaRef.current) captchaRef.current.value = "";
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (disabled) {
      toast.warn("Please validate captcha first.");
      return;
    }

    try {
      setLoading(true);

      const result = await signInUser(email, password);
      // eslint-disable-next-line no-unused-vars
      const user = result.user;

      toast.success("Logged in successfully!");
      resetCaptcha();

      setEmail("");
      setPassword("");

      navigate(from, { replace: true });
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.warn("Wrong credentials. Try again.");
      resetCaptcha();
    } finally {
      setLoading(false);
    }
  };

  const handleValidateCaptcha = (e) => {
    e.preventDefault();

    const userValue = captchaRef.current?.value || "";
    if (!userValue.trim()) {
      toast.warn("Please type the captcha text.");
      return;
    }

    if (validateCaptcha(userValue)) {
      setDisabled(false);
      toast.success("Captcha matched!");
    } else {
      toast.warn("Captcha didn't match. Try again.");
      resetCaptcha();
    }
  };

  // Demo Login for Testing
  const handleTestLogin = (role) => {
    if (role === "admin") {
      setEmail("shuvo@gmail.com");
      setPassword("Sa123456");
    } else if (role === "deliveryman") {
      setEmail("dipto@gmail.com");
      setPassword("Sa123456");
    } else {
      setEmail("bickrom@gmail.com");
      setPassword("Sa123456");
    }

    // lock until captcha verified for every new demo fill
    resetCaptcha();
    setTimeout(() => captchaRef.current?.focus(), 0);
  };

  return (
    <div className="auth-bg hero min-h-screen flex flex-col lg:flex-row-reverse items-center justify-center p-4 lg:gap-28">
      {/* SIDE IMAGE SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full lg:w-[30%] flex justify-center mt-14 lg:mt-0 mb-6 lg:mb-0"
      >
        <img
          className="rounded-full border-8 border-dotted"
          src={authImg}
          alt="Authentication"
        />
      </motion.div>

      {/* FORM SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
        className="card w-full max-w-sm lg:w-[70%] shadow p-6 bg-white/10  mb-8 lg:mb-0 mt-0 lg:mt-24 rounded-2xl"
      >
        <h1 className="text-center text-3xl font-bold mb-4">Sign in now!</h1>

        {/* Demo Buttons */}
        <div className="mb-4">
          <h2 className="text-base font-semibold">Demo Login for Testing:</h2>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <button
              type="button"
              onClick={() => handleTestLogin("admin")}
              className="btn bg-[#DC2626] text-white border-0 hover:brightness-95"
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => handleTestLogin("deliveryman")}
              className="btn bg-[#16A34A] text-white border-0 hover:brightness-95"
            >
              Deliveryman
            </button>
            <button
              type="button"
              onClick={() => handleTestLogin("user")}
              className="btn bg-[#2563EB] text-white border-0 hover:brightness-95"
            >
              User
            </button>
          </div>
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>

          {/* Password */}
          <div className="form-control relative">
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>

            <button
              type="button"
              onClick={() => setShowPass((p) => !p)}
              className="btn btn-xs absolute right-2 bottom-[32px] mr-4"
              aria-label="Toggle password visibility"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>

            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered"
              required
            />

            <label className="label">
              <p className="text-sm">
                Don't have an account?{" "}
                <Link className="text-[#0276b6] font-semibold underline" to="/register">
                  Register
                </Link>
              </p>
            </label>
          </div>

          {/* Captcha */}
          <div className="form-control">
            <label className="label">
              <LoadCanvasTemplate />
            </label>

            <input
              type="text"
              name="captcha"
              ref={captchaRef}
              placeholder="type the text above"
              className="input input-bordered"
              required
            />

            <div className="flex items-center gap-2 mt-2">
              <button
                type="button"
                onClick={handleValidateCaptcha}
                className="btn btn-xs shadow-sm bg-[#8ce28aad] border-0"
              >
                Validate
              </button>

              <button
                type="button"
                onClick={resetCaptcha}
                className="btn btn-xs shadow-sm bg-gray-200 border-0"
              >
                Refresh
              </button>

              {!disabled && (
                <span className="text-xs text-green-600 font-semibold">
                  Verified 
                </span>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="form-control mt-6">
            <button
              disabled={disabled || loading}
              className="btn bg-[#8c87d7] border-0 text-white border-b-4 border-[#0076b6af] w-full hover:brightness-95 disabled:opacity-60"
            >
              {loading ? "Signing in..." : <>Sign in <GoSignIn /></>}
            </button>
          </div>
        </form>

        <div className="divider">OR</div>
        <div className="flex justify-center">
          <SocialLogin />
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
