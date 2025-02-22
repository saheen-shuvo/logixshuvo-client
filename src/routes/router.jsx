import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import SignIn from "../pages/signin/SignIn";
import Register from "../pages/register/Register";
import Dashboard from "../layout/Dashboard";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import AdminRoute from "./AdminRoute";
import AllDeliveryMan from "../pages/Dashboard/Admin/AllDeliveryMan";
import BookParcel from "../pages/Dashboard/User/BookParcel";
import MyParcels from "../pages/Dashboard/User/MyParcels";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      // NORMAL USER ROUTES
      {
        path: "bookparcel",
        element: <BookParcel></BookParcel>,
      },
      {
        path: "myparcels",
        element: <MyParcels></MyParcels>,
      },
      // ADMIN ROUTES
      {
        path: "allusers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "alldeliveryman",
        element: (
          <AdminRoute>
            <AllDeliveryMan></AllDeliveryMan>
          </AdminRoute>
        ),
      },
    ],
  },
]);
