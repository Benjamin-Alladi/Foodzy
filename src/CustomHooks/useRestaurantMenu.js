import { useState, useEffect} from "react";

export default function useRestaurantMenu(resId)
{
    const [resInfo, setResInfo]= useState(null);
    const menu_api= "https://foodfire.onrender.com/api/menu?page-type=REGULAR_MENU&complete-menu=true&lat=21.1702401&lng=72.83106070000001&&submitAction=ENTER&restaurantId=";

    useEffect(()=>{
        fetchData();
    },[]);

    async function fetchData()
    {
        const response= await fetch(menu_api+resId);
        const json= await response.json();

        // console.log(json.data);
        setResInfo(json.data);
    }

    return resInfo;
}