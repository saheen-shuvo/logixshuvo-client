import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/image/logo.svg";
// import { RiNotification3Line } from "react-icons/ri";
import AuthContext from "../context/AuthContext/AuthContext";
import { MdLogout } from "react-icons/md";
import useUserRole from "../hooks/useUserRole";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const userRole = useUserRole();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  let staticDashboardRoute = "";
  if (userRole === "admin") {
    staticDashboardRoute = "/dashboard/statistics";
  } else if (userRole === "deliveryman") {
    staticDashboardRoute = "/dashboard/mydeliverylist";
  } else {
    staticDashboardRoute = "/dashboard/bookparcel";
  }

  const links = (
    <>
      <li className="font-semibold">
        <NavLink to="/">Home</NavLink>
      </li>
      {user && (
        <li className="font-semibold">
          <NavLink to={staticDashboardRoute}>Dashboard</NavLink>
        </li>
      )}
    </>
  );

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("Successfully signed out");
      })
      .catch((error) => {
        console.log("Signout error", error);
      });
  };

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className="fixed z-10 navbar  bg-[#0076b6af]  flex justify-center">
      <div className="navbar z-10 fixed max-w-screen-xl">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn text-white btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div className="flex items-center gap-1">
            <Link to='/'>
              {" "}
              <p className="text-sm md:text-xl font-bold  text-[white] flex items-center">
                {" "}
                <img className="w-7" src={logo} alt="" />
                Logi<span className="text-[#ff6a00]">X</span>Shuvo
              </p>
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end px-2">
              <div tabIndex={0} role="button" className="">
                <img
                  className="w-10 h-10 object-cover rounded-full"
                  src={user.photoURL || "default-avatar.png"}
                  alt="User Avatar"
                />
              </div>
              <div
                tabIndex={0}
                className="dropdown-content  bg-base-100 z-[1] p-2 shadow rounded-lg"
              >
                <div className="">
                  <h3 className="font-semibold text-center">
                    {user.displayName || "Unknown User"}
                  </h3>
                  <p>
                    <NavLink
                      className="p-2 mt-2 font-semibold btn bg-[#8c87d7] border-0 text-white border-b-4 border-[#0076b6af] w-full"
                      to={staticDashboardRoute}
                    >
                      Dashboard
                    </NavLink>
                  </p>
                  <button
                    onClick={handleSignOut}
                    className="btn bg-[#c5a162] border-0 text-white border-b-4 border-[#0076b6af] flex items-center gap-2 w-28 my-2"
                  >
                    <MdLogout /> <span>Log out</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <NavLink className="btn btn-ghost" to="/signin">
                Sign in
              </NavLink>
            </>
          )}
        </div>
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            onChange={handleToggle}
            checked={theme === "light" ? false : true}
          />
          <svg
            className="swap-on h-5 md:h-7 w-5 md:w-7 fill-current m-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          <svg
            className="swap-off h-5 md:h-7 w-5 md:w-7 fill-current m-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
