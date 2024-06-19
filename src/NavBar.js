import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

export default function NavBar()
{
    return (
        <nav className="nav" id="navbar">
            <img className="nav-logo" src="https://i.pinimg.com/564x/86/05/d4/8605d49f3a5e7824f0c75e1f0ff5f346.jpg" alt="Foodzy"/>
            <span className="name"> <b>Foodzy</b></span>

            <ul className="nav-list">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About Us</Link>
                </li>
                <li>
                    <Link to="/contact">Contact Us</Link>
                </li>
                <li>
                    <FontAwesomeIcon icon={faShoppingCart} className="icon-white"/>
                </li>
                <li>
                    <button className="login-btn btn">Login</button>
                </li>
            </ul>
        </nav>
    );
}