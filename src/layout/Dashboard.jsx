import { FaUsers } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { IoLogoDropbox } from "react-icons/io";
import { IoStatsChart } from "react-icons/io5";
import { PiUsersFourFill } from "react-icons/pi";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();

  return (
    <div className="flex">
      {/* DASHBOARD SIDE BAR */}
      <div className="w-64 min-h-screen bg-[#0077B6]">
        <ul className="menu w-full font-semibold flex flex-col gap-4 text-white">
          {isAdmin ? (
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
          ) : (
            <></>
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
