import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Bounce, toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../context/AuthContext/AuthContext";
import SocialLogin from "../../shared/SocialLogin";
import authImg from "../../assets/image/authentication.gif";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { GoSignIn } from "react-icons/go";
import { motion } from "framer-motion";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const [showPass, setShowPass] = useState(false);
  const [loadingLocal, setLoadingLocal] = useState(false);

  const navigate = useNavigate();
  const { createUser, setLoading, setUser } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;
    const role = form.role.value;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const password = form.password.value;
    const photo = form.photo?.value || "";
    const terms = form.terms.checked;

    if (!terms) {
      toast.warn("Please accept our terms and conditions.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    if (password.length < 6) {
      toast.warn("Password must be at least 6 characters.");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.warn(
        "Password must include at least one uppercase and one lowercase letter.",
      );
      return;
    }

    try {
      setLoading(true);
      setLoadingLocal(true);

      const result = await createUser(email, password);
      const user = result.user;

      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });

      setUser({ ...user, displayName: name, photoURL: photo });

      toast.success("Account created successfully!");

      const userInfo = { name, email, role, phone };

      const res = await axiosPublic.post("/users", userInfo);
      if (res.data?.insertedId) {
        form.reset();
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating account:", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
      setLoadingLocal(false);
    }
  };

  const togglePasswordVisibility = () => setShowPass(!showPass);

  return (
    <div className="auth-bg hero min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center p-4 lg:gap-28">
      {/* FORM SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
        className="card w-full max-w-sm lg:w-[70%] shadow p-6 bg-white/10 mb-8 lg:mb-0 mt-8 lg:mt-24 rounded-2xl"
      >
        <h1 className="text-center text-3xl font-bold mb-4">Register Here!</h1>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Role */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Select User Role</span>
            </label>
            <select
              name="role"
              className="select select-bordered w-full"
              defaultValue="user"
            >
              <option value="user">User</option>
              <option value="deliveryman">Delivery Man</option>
            </select>
          </div>

          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">User Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Username"
              className="input input-bordered"
              required
            />
          </div>

          {/* Phone */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Phone Number</span>
            </label>
            <input
              type="number"
              name="phone"
              placeholder="phone number"
              className="input input-bordered"
              required
            />
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
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
              onClick={togglePasswordVisibility}
              className="btn btn-xs absolute right-2 bottom-[9px] mr-4"
              aria-label="Toggle Password Visibility"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>

            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="input input-bordered"
              required
            />
          </div>

          {/* Photo */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Photo URL</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              className="input input-bordered"
              required
            />
          </div>

          {/* Terms */}
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-2">
              <input type="checkbox" name="terms" className="checkbox" />
              <span className="label-text">
                Accept our terms and conditions
              </span>
            </label>
          </div>

          {/* Submit */}
          <div className="form-control mt-2">
            <button
              disabled={loadingLocal}
              className="btn bg-[#8c87d7] border-0 text-white border-b-4 border-[#0076b6af] w-full hover:brightness-95 disabled:opacity-60"
            >
              {loadingLocal ? (
                "Creating..."
              ) : (
                <>
                  Sign up <GoSignIn />
                </>
              )}
            </button>
          </div>

          <div className="divider my-0">OR</div>

          <div className="flex justify-center mt-2">
            <SocialLogin />
          </div>
        </form>

        <p className="text-xs text-center mt-4">
          Already have an account?{" "}
          <Link className="text-[#0276b6] font-semibold underline" to="/signin">
            Sign in.
          </Link>
        </p>
      </motion.div>

      {/* SIDE IMAGE SECTION (match SignIn) */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full lg:w-[30%] flex justify-center mt-16 lg:mt-0 mb-6 lg:mb-0"
      >
        <img
          className="rounded-full border-8 border-dotted"
          src={authImg}
          alt="Authentication"
        />
      </motion.div>
    </div>
  );
};

export default Register;
