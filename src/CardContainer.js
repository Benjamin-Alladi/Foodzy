import { useState } from "react";

export default function CardContainer({restaurantList})
{
    let [showingAll, setShowingAll]= useState(true);
    let [resList, setResList]= useState(restaurantList);

    function handleClick()
    {
        setShowingAll(!showingAll);
        const newResList= showingAll==false?restaurantList: restaurantList.filter(resObj=> resObj.info.avgRating>=4);  
        setResList(newResList);
    }

    if(restaurantList.length===0)
    {
        return <h1>Loading...</h1>
    }

    return (
        <>
            <button className="showbtn" onClick={handleClick}>
                {showingAll?"Show Top Restaurants":"Show All"}
            </button>
            
            <div className="restaurant-container">
            {
                resList.map((restaurantObj)=>{
                        return <Card restaurant={restaurantObj}/>;
                    }
                )
            }
            </div>
        </>
    );
}

export function Card({restaurant})
{
    let {id,name,cloudinaryImageId,areaName,cuisines,costForTwo,sla,avgRating}= restaurant.info;

    return (
        <div key={id} className="restaurant-card">
            <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/"+cloudinaryImageId} alt="" className="card-img"/>
            <h3 className="res-name">{name}</h3>
            <h5 className="cuisine">{cuisines.join(", ")}</h5>
            <h5 className="area">{areaName}</h5>
            <ul className="details-box">
                <li> 
                    ⭐{avgRating}
                </li>
                <li>{sla.lastMileTravel} km</li>
                <li>{costForTwo}</li>
            </ul>
        </div>
    );
}