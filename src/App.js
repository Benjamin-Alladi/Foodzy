import React from "react";
import NavBar from "./NavBar.js";
import Footer from "./Footer.js";
import {Outlet} from "react-router-dom";

export default function App()
{
    return (
        <div className="app flex flex-col justify-between min-h-[100vh]">
        <NavBar/>
        <Outlet/>
        <Footer/>
        </div>
    );
}