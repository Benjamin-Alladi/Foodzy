import React from "react";
import NavBar from "./NavBar.js";
import {Outlet} from "react-router-dom";

export default function App()
{
    return (
        <>
        <NavBar/>
        <Outlet/>
        </>
    );
}