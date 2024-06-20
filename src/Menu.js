import {useParams} from "react-router-dom";
import { useState, useEffect } from "react";

export default function Menu()
{
    const {resId}= useParams();

    const [restaurant, setRestaurant]= useState(null);
    const [menuItems, setMenuItems]= useState([]);

    const url= "https://foodfire.onrender.com/api/menu?page-type=REGULAR_MENU&complete-menu=true&lat=21.1702401&lng=72.83106070000001&&submitAction=ENTER&restaurantId=";

    // menu items api card type key
    const MENU_ITEM_TYPE_KEY = "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";
    const RESTAURANT_TYPE_KEY ="type.googleapis.com/swiggy.presentation.food.v2.Restaurant";

    useEffect(()=>{
        fetchData();
    },[]);

    async function fetchData()
    {
        const response= await fetch(url+resId);
        const json= await response.json();

        console.log("json is fetched: ",json);
        const restaurantData =
          json?.data?.cards
            ?.map((x) => x.card)
            ?.find((x) => x && x.card["@type"] === RESTAURANT_TYPE_KEY)?.card
            ?.info || null;

        setRestaurant(restaurantData);


        // Set menu item data
        const menuItemsData =
          json?.data?.cards
            .find((x) => x.groupedCard)
            ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.map(
              (x) => x.card?.card
            )
            ?.filter((x) => x["@type"] == MENU_ITEM_TYPE_KEY)
            ?.map((x) => x.itemCards)
            .flat()
            .map((x) => x.card?.info) || [];

        const uniqueMenuItems = [];
        menuItemsData.forEach((item) => {
          if (!uniqueMenuItems.find((x) => x.id === item.id)) {
            uniqueMenuItems.push(item);
          }
        });

        setMenuItems(uniqueMenuItems);
    }

    console.log("Restaurant:",restaurant);
    console.log("Menu:", menuItems);

    if(menuItems.length===0)
    {
        console.log("Loading");
        return <h1>Loading...</h1>;
    }

    const swiggy_url="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/";
    return (
        <>
        <img src={swiggy_url+ restaurant.cloudinaryImageId} alt="" />
        <div className="menu-box">
            {
                menuItems.map(item=> <p key={item.id}>{item.name}</p>)
            }
        </div>
        </>
    );
}