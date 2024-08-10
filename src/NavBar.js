import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NavBar()
{
    const [loggedIn, setLoggedIn]= useState(false);
    function handleClick()
    {
        setLoggedIn(!loggedIn);
    }

    const cartItems= useSelector((state)=> state.cart.items);

    return (
        <nav className="nav bg-[#282c34] p-[1.2rem] flex items-center justify-between text-white shadow-lg relative" id="navbar">
            {/* {console.log("navbar rendered")} */}
            
            <img className="nav-logo ml-4 mb-4 h-14 rounded-[50%]" src="https://i.pinimg.com/564x/86/05/d4/8605d49f3a5e7824f0c75e1f0ff5f346.jpg" alt="Foodzy"/>
            <span className="absolute mt-16 left-8 text-lg font-[cursive]"> <b>Foodzy</b></span>

            <ul className="flex gap-6 items-center decoration-[none] mr-2">
                {/* {console.log("ul in navbar rendered")} */}
                <li className="hover:cursor-pointer hover:scale-105 hover:font-[400]">
                    <Link to="/">Home</Link>
                </li>
                <li className="hover:cursor-pointer hover:scale-105 hover:font-[400]">
                    <Link to="/about">About Us</Link>
                </li>
                <li className="hover:cursor-pointer hover:scale-105 hover:font-[400]">
                    <Link to="/contact">Contact Us</Link>
                </li>
                <li className="hover:cursor-pointer hover:scale-105 hover:font-[400]">
                    <Link to="/cart">
                        <FontAwesomeIcon icon={faShoppingCart} className="rounded-md"/>
                        <span className="text-[0.7rem] align-top ml-[0.1rem]">{cartItems.length}</span>
                    </Link>
                </li>
                <li className="hover:cursor-pointer hover:scale-105 hover:font-[400]">
                    <button onClick={handleClick} className="ml-[0.5rem] py-[0.4rem] px-4 rounded-sm cursor-pointer text-[1rem] bg-[#ff4500]">
                        {loggedIn?"Logout":"Login"}
                    </button>
                </li>
            </ul>
        </nav>
    );
}