import React from "react";
import NavBar from "./NavBar.js";
import CardContainer from "./CardContainer.js";
import { restaurantList } from "./data.js";

export default function App()
{
    return (
        <>
        <NavBar/>
        <CardContainer restaurantList={restaurantList}/>
        </>
    );
}