import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export default function NavBar()
{
    return (
        <nav className="nav">
            <img className="nav-logo" src="https://i.pinimg.com/564x/86/05/d4/8605d49f3a5e7824f0c75e1f0ff5f346.jpg" alt="Foodzy"/>
            <span className="name"> <b>Foodzy</b></span>

            <ul className="nav-list">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
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