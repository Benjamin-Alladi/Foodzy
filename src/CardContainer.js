import { useState,useEffect } from "react";
import ShimmerContainer from "./ShimmerContainer";
import {Link} from "react-router-dom";

export default function CardContainer()
{
    const [restaurantList, setRestaurantList]= useState([]);

    let [showingAll, setShowingAll]= useState(true);
    let [resList, setResList]= useState(restaurantList);

    useEffect(() => {
        fetchData();
        setResList(restaurantList);
    },[]);

    // setting resList because after initial render fetchData() function updates restaurantList and react re-renders this component restaurantList gets updated after rerendering. But now we have to update resList also so after rerendering useEffect() will be called where I am updating resList
    useEffect(() => {
        console.log("useEffect inside CardContainer is called", restaurantList.length);
        if (restaurantList.length > 0) {
          setResList(restaurantList);
        }
      }, [restaurantList]);

    async function fetchData()
    {
        try
        {
            const response=await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.406498&lng=78.47724389999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

            const json=await response.json();

            console.log(json);

            setRestaurantList(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
            console.log("Data is fetched");
        }
        catch(e)
        {
            console.log("Error fetching restaurant list: "+e);
        }
    }

    function handleClick()
    {
        setShowingAll(!showingAll);
        const newResList= !(showingAll)?restaurantList : restaurantList.filter(resObj=> resObj.info.avgRating>=4);  
        setResList(newResList);
    }

    let [searchText, setSearchText]= useState("");
    function handleChange(e)
    {
        const text= e.target.value;
        setSearchText(text);
        handleSearchClick(text);
    }

    function handleSearchClick(text)
    {
        // console.log("handle called by handleChange", searchText+" "+ e.target.value);
        const matchings= text.length>0 && restaurantList.filter(res=> res.info.name.toLowerCase().includes(text.toLowerCase()));
        (text.length>0 && matchings.length>0)? setResList(matchings): setResList(restaurantList);
    }

    return restaurantList.length===0? <ShimmerContainer/> :(
        <>
            <label htmlFor="searchBox">
                <input type="text" id="search-box" name="searchBox" value={searchText} onInput={handleChange}/>
                <button className="search-btn" onClick={handleSearchClick}>
                    Search
                </button>
            </label>

            <button className="showbtn" onClick={handleClick}>
                {showingAll?"Show Top Restaurants":"Show All"}
            </button>
            
           
            <div className="restaurant-container">
            {
                (searchText.length==0 || (searchText.length>0 && resList.length!=restaurantList.length)) ? (
                    resList.map((restaurantObj)=>{
                        return <Card restaurant={restaurantObj} key={restaurantObj.info.id}/>;
                    })
                ) : <h1>Sorry, No such Restaurants are Found!</h1>
            }
            </div>
        </>
    );
}

export function Card({restaurant})
{
    let {id,name,cloudinaryImageId,areaName,cuisines,costForTwo,sla,avgRating}= restaurant.info;

    return (
        <Link to={"/restaurant/"+id}>
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
        </Link>
    );
}