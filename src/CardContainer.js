import { useState,useEffect } from "react";
import ShimmerContainer from "./ShimmerContainer";

export default function CardContainer({restaurantList})
{
    let [showingAll, setShowingAll]= useState(true);
    let [resList, setResList]= useState(restaurantList);

    useEffect(() => {
        console.log("useEffect inside CardContainer is called", restaurantList.length);
        if (restaurantList.length > 0) {
          setResList(restaurantList);
        }
      }, [restaurantList]);

    function handleClick()
    {
        setShowingAll(!showingAll);
        const newResList= !(showingAll)?restaurantList.map(res=>{return {...res}}) : restaurantList.filter(resObj=> resObj.info.avgRating>=4);  
        setResList(newResList);
    }

    let [searchText, setSearchText]= useState("");
    function handleChange(e)
    {
        setSearchText(e.target.value);
    }

    function handleSearchClick()
    {
        console.log("search button is clicked");
        const matchings= restaurantList.filter(res=> res.info.name.toLowerCase().includes(searchText.toLowerCase()));
        (searchText.length>0 && matchings.length>0)? setResList(matchings): setResList(restaurantList);    
    }

    return restaurantList.length===0? <ShimmerContainer/> :(
        <>
            <label htmlFor="searchBox">
                <input type="text" id="search-box" name="searchBox" value={searchText} onChange={handleChange}/>
                <button className="search-btn" onClick={handleSearchClick}>
                    Search
                </button>
            </label>

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
            <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/"+cloudinaryImageId} alt="" className="card-img" loading="lazy"/>
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