import {useParams} from "react-router-dom";

import useRestaurantMenu from "./CustomHooks/useRestaurantMenu.js";
import MenuCategory from "./MenuCategory.js";
import { useState } from "react";

export default function Menu()
{
    const {resId}= useParams();

    const [showIndex, setShowIndex]= useState(0);

    // menu items key, card type key
    const MENU_ITEM_TYPE= "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";
    const RESTAURANT_TYPE ="type.googleapis.com/swiggy.presentation.food.v2.Restaurant";

    const resInfo= useRestaurantMenu(resId);
    // console.log("resInfo:",resInfo);

    let restaurant=null, categories=[];
    if(resInfo)
    {
      // restaurant= resInfo.cards[2].card.card.info;
      restaurant= resInfo?.cards?.find(card=> card.card?.card["@type"]===RESTAURANT_TYPE).card.card.info;

      categories=resInfo?.cards?.find(card=> card.groupedCard).groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c) =>
        c.card?.["card"]?.["@type"]===MENU_ITEM_TYPE
      );
    }

    // console.log("Restaurant:",restaurant);
    // console.log("Categories:", categories);

    return restaurant==null? <h1 className="text-center align-middle text-gray-500 animate-pulse text-2xl">Loading</h1>:(
      <>
        <ImageBox restaurant={restaurant}/>

        <div className="flex flex-col items-center">
          {
            categories.map((category,index)=>
              <MenuCategory data={category.card.card} index={index} showIndex={showIndex} setShowIndex={setShowIndex} key={index}/>
            )
          }
        </div>
      </>
    );
}

export function ImageBox({restaurant})
{
  const {id,name,costForTwoMessage,avgRating,cuisines,totalRatingsString,city,cloudinaryImageId}= restaurant;
  const url="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/";

  return(
      <div className="flex justify-start items-center w-[62%] mx-auto p-4 bg-slate-600 text-white font-[PT Sans, Calibri, sans-serif] mt-1 shadow-md" key={id}>
        <div className="w-[18rem] rounded-lg">
          <img src={url+cloudinaryImageId} alt="restaurant" />
        </div>

        <div className="pl-[0.8rem]">
          <h1 className="font-extralight text-[2.5rem]">{name}</h1>
          <p className="mt-[-0.5rem] text-[rgba(220, 220, 220, 0.637)] font-thin">{cuisines.join(", ")}</p>
          <h2 className="text-white mt-2 text-lg">{city}</h2>

          <ul className="flex items-center mt-4 ml-[-0.6rem] text-lg list-disc list-inside">
            <li className="list-none py-[3px] px-[0.4rem] pr-[0.8rem] flex justify-center items-center bg-[rgb(8, 184, 8)] rounded-sm">
              ⭐{avgRating}
            </li>
            <li className="ml-4">{totalRatingsString}</li>
            <li className="ml-4">{costForTwoMessage}</li>
          </ul>
        </div>
      </div>
  );
}