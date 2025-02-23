import { FaUserCircle, FaUsers } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { IoLogoDropbox, IoMdListBox } from "react-icons/io";
import { IoStatsChart } from "react-icons/io5";
import { PiUsersFourFill } from "react-icons/pi";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useDeliveryMan from "../hooks/useDeliveryMan";
import { FaBoxesPacking } from "react-icons/fa6";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isDeliveryMan] = useDeliveryMan();

  return (
    <div className="flex">
      {/* DASHBOARD SIDE BAR */}
      <div className="w-64 min-h-screen bg-[#0077B6]">
        <ul className="menu w-full font-semibold flex flex-col gap-4 text-white">
          {isAdmin && (
            <>
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

              <li>
                <NavLink to="/dashboard/statistics">
                  <IoStatsChart />
                  Statistics
                </NavLink>
              </li>
            </>
          )}

          {isDeliveryMan && (
            <>
              <li>
                <NavLink to="/dashboard/add">
                  <IoStatsChart />
                  Statistics
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

              <li>
                <NavLink to="/dashboard/myprofile">
                <FaUserCircle />
                  My Profile
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>

          {/* SHARED NAV LINKS */}
          <li>
            <NavLink to="/">
              <FiHome />
              Home
            </NavLink>
          </li>
        </ul>
      </div>
      {/* DASHBOARD CONTENT */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
