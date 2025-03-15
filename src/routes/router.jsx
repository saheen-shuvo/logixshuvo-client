import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import SignIn from "../pages/signin/SignIn";
import Register from "../pages/register/Register";
import Dashboard from "../layout/Dashboard";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import AdminRoute from "./AdminRoute";
import BookParcel from "../pages/Dashboard/User/BookParcel";
import MyParcels from "../pages/Dashboard/User/MyParcels";
import UpdateParcel from "../pages/Dashboard/User/UpdateParcel";
import MyProfile from "../pages/Dashboard/User/MyProfile";
import AllParcels from "../pages/Dashboard/Admin/AllParcels";
import MyDeliveryList from "../pages/Dashboard/Delivery Man/MyDeliveryList";
import AllDeliveryMan from "../pages/Dashboard/Admin/AllDeliveryMan";
import MyReviews from "../pages/Dashboard/Delivery Man/MyReviews";
import Payment from "../pages/Dashboard/User/payment/Payment";
import Statistics from "../pages/Dashboard/Admin/Statistics";

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
      {
        path: "updateparcel/:id",
        element: <UpdateParcel></UpdateParcel>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "myprofile",
        element: <MyProfile></MyProfile>,
      },
      // DELIVERY MAN ROUTES
      {
        path: "mydeliverylist",
        element: <MyDeliveryList></MyDeliveryList>,
      },
      {
        path: "myreviews",
        element: <MyReviews></MyReviews>,
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
      {
        path: "allparcels",
        element: (
          <AdminRoute>
            <AllParcels></AllParcels>
          </AdminRoute>
        ),
      },
      {
        path: "statistics",
        element: (
          <AdminRoute>
            <Statistics></Statistics>
          </AdminRoute>
        ),
      },
    ],
  },
]);
