import {
    createBrowserRouter
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import SignIn from "../pages/signin/SignIn";
import Register from "../pages/register/Register";
import Dashboard from "../layout/Dashboard";
import UserHome from "../pages/Dashboard/User/UserHome";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/signin',
            element: <SignIn></SignIn>
        },
        {
            path: '/register',
            element: <Register></Register>
        }
      ]
    },
    {
      path: "dashboard",
      element: (
          <Dashboard></Dashboard>
      ),
      children: [
        // NORMAL USER ROUTES
        {
          path: "userhome",
          element: <UserHome></UserHome>,
        },
        // ADMIN ROUTES
        {
          path: "allusers",
          element: (
              <AllUsers></AllUsers>
          ),
        },
      ],
    },
  ]);