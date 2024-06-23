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
    },[]);

    // setting resList because after initial render fetchData() function updates restaurantList and react re-renders this component restaurantList gets updated after rerendering. But now we have to update resList also so after rerendering useEffect() will be called where I am updating resList
    useEffect(() => {
        // console.log("useEffect inside CardContainer is called", restaurantList.length);
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
            console.log("CardContainer Data is fetched");
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

    const PromotedCard= getLabelledCard(Card);
    return restaurantList.length===0? <ShimmerContainer/> :(
        <>
            <label htmlFor="searchBox">
                <input type="text" name="searchBox" value={searchText} className="ml-[33rem] mt-4 outline-none p-[0.35rem] border-[1px] border-[solid] border-black" onInput={handleChange}/>
                <button className="py-[0.2rem] px-[0.5rem] bg-[#ff4500] border-[2px] border-[solid] border-[#ff4500] rounded-sm ml-[0.3rem] text-white font-[PT Sans, Calibri, sans-serif] active:scale-95" onClick={handleSearchClick}>
                    Search
                </button>
            </label>

            <button className="my-[0.6rem] mx-[42%] text-white text-center w-[12rem] py-[5px] bg-[#ff4500] border-[2px] border-[solid] border-[#ff4500] rounded-sm active:scale-[0.98]" onClick={handleClick}>
                {showingAll?"Show Top Restaurants":"Show All"}
            </button>
            
           
            <div className="w-[88%] mx-auto my-4 flex flex-row flex-wrap justify-evenly gap-4">
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
    const swiggy_url="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/";

    return (
        <Link to={"/restaurant/"+id}>
        <div key={id} className="w-[15rem] h-[16rem] p-[0.6rem] rounded-lg shadow-lg cursor-pointer font-[PT Sans, Calibri, sans-serif] text-ellipsis overflow-hidden hover:scale-[0.98] hover:bg-gray-100 text-black decoration-[none]">
            <img src={swiggy_url+cloudinaryImageId} alt="" className="rounded-lg" loading="lazy"/>
            <h3 className="whitespace-nowrap overflow-hidden text-ellipsis mt-2 text-xl">{name}</h3>
            <h5 className="text-ellipsis font-light overflow-hidden mt-[-0.1rem] whitespace-nowrap text-sm">{cuisines.join(", ")}</h5>
            <h5 className="text-ellipsis font-light overflow-hidden mt-[0.2rem] whitespace-nowrap text-[0.9rem]">{areaName}</h5>

            <ul className="flex justify-evenly items-center mt-[0.2rem] ml-[-1.2rem] font-[PT Sans, Calibri, sans-serif] font-[1rem]">
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

// This is a HOC that takes another Component as argument and returns a new Component.
// HOC's are Pure Functions.
export function getLabelledCard(Card)
{
    return (props)=>{
        return(
            
            <div>
                <label htmlFor="">Promoted</label>
                <Card {...props}/>
            </div>
        );
    }
}