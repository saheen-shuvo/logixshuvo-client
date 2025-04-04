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

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const [showPass, setShowPass] = useState(false);
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
        "Password must include at least one uppercase and one lowercase letter."
      );
      return;
    }

    try {
      setLoading(true);

      const result = await createUser(email, password);
      const user = result.user;

      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });

      setUser({ ...user, displayName: name, photoURL: photo });

      toast.success("Account created successfully!");

      const userInfo = { name, email, role, phone };
      console.log(userInfo);

      axiosPublic.post("/users", userInfo).then((res) => {
        if (res.data.insertedId) {
          form.reset();
          navigate("/");
        }
      });
    } catch (error) {
      console.error("Error creating account:", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPass(!showPass);

  return (
    <div className="auth-bg hero min-h-screen flex flex-col-reverse lg:flex-row lg:gap-28 items-center justify-center p-4">
      {/* Form Section */}
      <div className="card w-full max-w-sm lg:w-[70%] shadow-lg p-6 mt-8 lg:mt-20 bg-base-200">
        <h1 className="text-center text-2xl font-bold">Register Here!</h1>
        <form onSubmit={handleRegister} className="card-body space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Select User Role</span>
            </label>
            <select
              name="role"
              className="select select-bordered w-full max-w-xs"
              defaultValue="User"
            >
              <option value="user">User</option>
              <option value="deliveryman">Delivery Man</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">User Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Username"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="number"
              name="phone"
              placeholder="phone number"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="btn btn-xs absolute bottom-[9px] right-2"
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
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input type="checkbox" name="terms" className="checkbox" />
              <span className="label-text ml-1">
                Accept our terms and conditions
              </span>
            </label>
          </div>
          <div className="form-control mt-2">
            <button className="btn bg-[#8c87d7] border-0 text-white border-b-4 border-[#0076b6af] w-full">Sign up <GoSignIn /></button>
          </div>
          <div className="divider my-0">OR</div>
          <div className="flex justify-center">
            <SocialLogin />
          </div>
        </form>
        <p className="text-xs text-center mt-4">
          Already have an account?{" "}
          <Link className="underline" to="/signin">
            Sign in.
          </Link>
        </p>
      </div>
      <div className="w-full lg:w-[30%] flex justify-center mt-16 lg:mt-0">
        <img
          className="rounded-full border-8 border-dotted"
          src={authImg}
          alt=""
        />
      </div>
    </div>
  );
};

export default Register;
