import { FaClipboardList, FaUserCircle, FaUsers } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { IoLogoDropbox, IoMdListBox } from "react-icons/io";
import { IoStatsChart } from "react-icons/io5";
import { PiUsersFourFill } from "react-icons/pi";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useDeliveryMan from "../hooks/useDeliveryMan";
import { FaBoxesPacking } from "react-icons/fa6";
import { MdReviews } from "react-icons/md";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import { useState } from "react";
import logo from "../assets/image/logo.svg";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isDeliveryMan] = useDeliveryMan();
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="flex">
      <aside className="h-screen">
        <nav className="h-full flex flex-col border-r border-gray-400 shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <p
              className={`text-sm md:text-[17px] font-bold  flex items-center overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
              }`}
            >
              {" "}
              <img className="w-7" src={logo} alt="" />
              Logi<span className="text-[#ff6a00]">X</span>Shuvo
            </p>
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="btn btn-xs font-semibold"
            >
              {expanded ? (
                <LuChevronFirst></LuChevronFirst>
              ) : (
                <LuChevronLast></LuChevronLast>
              )}
            </button>
          </div>
          <ul className="menu w-full font-semibold flex flex-col gap-4 flex-1">
            {isAdmin && (
              <>
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
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
