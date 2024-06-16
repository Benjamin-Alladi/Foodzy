import { useState } from "react";

export default function CardContainer({restaurantList})
{
    let [showingAll, setShowingAll]= useState(true);
    let [resList, setResList]= useState(restaurantList);

    function handleClick()
    {
        setShowingAll(!showingAll);
        const newResList= showingAll==false?restaurantList: restaurantList.filter(resObj=> resObj.data.avgRating>=4);  
        setResList(newResList);
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
    let {id,name,cloudinaryImageId,area,cuisines,costForTwo,lastMileTravel,avgRating}= restaurant.data;
    const prefixURL= "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/";
    // console.log(id,name,cloudinaryImageId,cuisines,costForTwo);

    return (
        <div key={id} className="restaurant-card">
            <img src={prefixURL+cloudinaryImageId} alt="" className="card-img"/>
            <h3 className="res-name">{name}</h3>
            <h5 className="cuisine">{cuisines.join(", ")}</h5>
            <h5 className="area">{area}</h5>
            <ul className="details-box">
                <li> 
                    ⭐{avgRating}
                </li>
                <li>{(lastMileTravel+"").slice(0,3)} km</li>
                <li>₹{costForTwo/100} for two</li>
            </ul>
        </div>
    );
}