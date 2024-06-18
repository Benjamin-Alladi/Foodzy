import React from "react";
import NavBar from "./NavBar.js";
import CardContainer from "./CardContainer.js";
import { useState, useEffect } from "react";

export default function App()
{
    const [restaurantList, setRestaurantList]= useState([]);

    useEffect(()=>{
        fetchData();
    }, []);
    
    async function fetchData()
    {
        try
        {
            const response=await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.406498&lng=78.47724389999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

            const json=await response.json();

            console.log(json);

            setRestaurantList(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);
            console.log("Data if fetched");
        }
        catch(e)
        {
            console.log("Error fetching restaurant list: "+e);
        }
    }
    return (
        <>
        <NavBar/>
        <CardContainer restaurantList={restaurantList}/>
        </>
    );
}