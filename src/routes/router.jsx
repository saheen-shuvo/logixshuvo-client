import {
    createBrowserRouter
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/home/Home";
import SignIn from "../pages/signin/SignIn";
import Register from "../pages/register/Register";

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
  ]);