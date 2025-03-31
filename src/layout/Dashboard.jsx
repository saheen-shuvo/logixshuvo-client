import { FaClipboardList, FaUserCircle, FaUsers } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { IoLogoDropbox, IoMdListBox } from "react-icons/io";
import { IoStatsChart } from "react-icons/io5";
import { PiUsersFourFill } from "react-icons/pi";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useDeliveryMan from "../hooks/useDeliveryMan";
import { FaBoxesPacking } from "react-icons/fa6";
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight, MdReviews } from "react-icons/md";
import { useState } from "react";
import logo from "../assets/image/logo.svg";
import Lottie from "lottie-react";
import loadingAnimation from '../.././public/Loading Animation.json'

const Dashboard = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isDeliveryMan, isDeliveryManLoading] = useDeliveryMan();
  const [expanded, setExpanded] = useState(true);

  if (isAdminLoading || isDeliveryManLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          className="w-24 h-24"
        />
      </div>
    );
  }

  return (
    <div className="flex">
      {/* SIDE BAR FOR LARGE SCREE*/}
      <aside
        className={`min-h-screen shadow-md transition-all duration-300 hidden lg:block text-white ${
          expanded ? "w-48 bg-[#0077B6]" : "w-14 bg-[#0077B6]"
        }`}
      >
        <nav className="h-full flex flex-col border-r border-gray-400 shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <Link to="/">
              {" "}
              <p
                className={`text-sm md:text-[17px] font-bold  flex items-center overflow-hidden transition-all ${
                  expanded ? "w-32" : "w-0"
                }`}
              >
                {" "}
                <img className="w-7" src={logo} alt="" />
                Logi<span className="text-[#ff6a00]">X</span>Shuvo
              </p>
            </Link>
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="btn bg-[#ff6a00] text-white font-bold btn-xs shadow border-0"
            >
              {expanded ? (
                <MdOutlineKeyboardDoubleArrowRight />
              ) : (
                <MdOutlineKeyboardDoubleArrowLeft />
              )}
            </button>
          </div>
          <ul className="menu w-full font-semibold flex flex-col gap-4 flex-1">
            {isAdmin && (
              <>
                <li>
                  <NavLink to="/dashboard/statistics">
                    <IoStatsChart />
                    <span
                      className={`overflow-hidden transition-all ${
                        expanded ? "w-32" : "w-0"
                      }`}
                    >
                      Statistics
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/allparcels">
                    <IoLogoDropbox />
                    <span
                      className={`overflow-hidden transition-all ${
                        expanded ? "w-32" : "w-0"
                      }`}
                    >
                      All Parcels
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/allusers">
                    <FaUsers></FaUsers>
                    <span
                      className={`overflow-hidden transition-all ${
                        expanded ? "w-32" : "w-0"
                      }`}
                    >
                      All Users
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/alldeliveryman">
                    <PiUsersFourFill />
                    <span
                      className={`overflow-hidden transition-all ${
                        expanded ? "w-32" : "w-0"
                      }`}
                    >
                      All Delivery Man
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {isDeliveryMan && (
              <>
                <li>
                  <NavLink to="/dashboard/mydeliverylist">
                    <FaClipboardList />
                    <span
                      className={`overflow-hidden transition-all ${
                        expanded ? "w-32" : "w-0"
                      }`}
                    >
                      My Delivery List
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/myreviews">
                    <MdReviews />
                    <span
                      className={`overflow-hidden transition-all ${
                        expanded ? "w-32" : "w-0"
                      }`}
                    >
                      My Reviews
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {!isAdmin && !isDeliveryMan && (
              <>
                <li>
                  <NavLink to="/dashboard/bookparcel">
                    <FaBoxesPacking />
                    <span
                      className={`overflow-hidden transition-all ${
                        expanded ? "w-32" : "w-0"
                      }`}
                    >
                      Book a Parcel
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/myparcels">
                    <IoMdListBox />
                    <span
                      className={`overflow-hidden transition-all ${
                        expanded ? "w-32" : "w-0"
                      }`}
                    >
                      My Parcels
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            <div className="divider"></div>

            {/* SHARED NAV LINKS */}
            <li>
              <NavLink to="/dashboard/myprofile">
                <FaUserCircle />
                <span
                  className={`overflow-hidden transition-all ${
                    expanded ? "w-32" : "w-0"
                  }`}
                >
                  My Profile
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/">
                <FiHome />
                <span
                  className={`overflow-hidden transition-all ${
                    expanded ? "w-32" : "w-0"
                  }`}
                >
                  Home
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* DASHBOARD CONTENT */}
      <div className="flex-1 p-2 lg:p-8">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
              {isAdmin && (
                <>
                  <li>
                    <NavLink to="/dashboard/statistics">
                      <IoStatsChart />
                      Statistics
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/allparcels">
                      <IoLogoDropbox />
                      All Parcels
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/allusers">
                      <FaUsers></FaUsers>
                      All Users
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/alldeliveryman">
                      <PiUsersFourFill />
                      All Delivery Man
                    </NavLink>
                  </li>
                </>
              )}

              {isDeliveryMan && (
                <>
                  <li>
                    <NavLink to="/dashboard/mydeliverylist">
                      <FaClipboardList />
                      My Delivery List
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/myreviews">
                      <MdReviews />
                      My Reviews
                    </NavLink>
                  </li>
                </>
              )}

              {!isAdmin && !isDeliveryMan && (
                <>
                  <li>
                    <NavLink to="/dashboard/bookparcel">
                      <FaBoxesPacking />
                      Book a Parcel
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/myparcels">
                      <IoMdListBox />
                      My Parcels
                    </NavLink>
                  </li>
                </>
              )}

              <div className="divider"></div>

              {/* SHARED NAV LINKS */}
              <li>
                <NavLink to="/dashboard/myprofile">
                  <FaUserCircle />
                  My Profile
                </NavLink>
              </li>

              <li>
                <NavLink to="/">
                  <FiHome />
                  Home
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
