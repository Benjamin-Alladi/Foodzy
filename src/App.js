import React from "react";
import NavBar from "./NavBar.js";
import Footer from "./Footer.js";
import {Outlet} from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function App()
{
    let cartItems= useSelector((state)=> state.cart.items);

    useEffect(()=>{
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <div className="app flex flex-col justify-between min-h-[100vh]">
            {console.log("App rendered")}
            <NavBar/>
            <Outlet/>
            <Footer/>
        </div>
    );
}