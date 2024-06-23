import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import CardContainer from "./CardContainer.js";
import AboutUs from "./AboutUs.js";
import ContactUs from "./ContactUs.js";
import ErrorPage from "./ErrorPage.js";
import Menu from "./Menu.js";

import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router= createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <CardContainer /> // Assuming CardContainer is the home page content
      },
      {
        path: '/about',
        element: <AboutUs />
      },
      {
        path: '/contact',
        element: <ContactUs />
      },
      {
        path: "/restaurant/:resId",
        element: <Menu/>
      }
    ],
  },
])
const root= ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
      <RouterProvider router={router}/>
    // </React.StrictMode>
);