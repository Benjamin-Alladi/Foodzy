import "./tailwind.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

export default function AboutUs()
{
    const [showing, setShowing]= useState(false);
    const [profile, setProfile]= useState(null);

    useEffect(()=>{
        async function fetchData()
        {
            // console.log("called");
            try 
            {
                const response=await fetch('https://api.github.com/users/Benjamin-Alladi');
                const json=await response.json();

                console.log("User:", json);
                setProfile(json);
            } 
            catch (error) 
            {
                console.log("Error in fetching Profile data", error);
            }
        };
        fetchData();
    },[]);

    function handleClick()
    {
        setShowing(!showing);
    }

    return (
        <>
            <div className="text-center font-[PT Sans, Calibri, sans-serif]">
                <button onClick={handleClick} className="py-[0.4rem] px-4 rounded-sm cursor-pointer text-[1rem] bg-[#ff4500] text-white mt-4 mb-2">{showing?"Hide Profile":"Show Profile"}</button>

                {showing && profile &&
                    <div className="w-[60%] mx-auto shadow-lg flex flex-col items-center gap-4 my-8">
                        <h1 className="text-3xl font-medium">About Me</h1>
                        <img src={profile.avatar_url} alt="" className="w-40 rounded-[50%]" />
                        <h2 className="text-lg font-light text-gray-900">{profile.name}</h2>
                        
                        <div className="flex gap-10 mb-4">
                            <a href="https://www.linkedin.com/in/benjamin-alladi-383511223/" target="_new" title="Linkedin">
                                <FontAwesomeIcon icon={faLinkedin} className="scale-[2]"/>
                            </a>

                            <a href="https://github.com/Benjamin-Alladi" target="_new" title="Github">
                                <FontAwesomeIcon icon={faGithub} className="scale-[2]"/>
                            </a>
                        </div>
                    </div>
                }
            </div>

            <div className="flex justify-center items-center">
                <div>
                    <img src="https://foodfire-app.netlify.app/burgerImage.430940fb.png" alt="" />
                </div>
                <div className="flex flex-col text-5xl font-[PT Sans, Calibri, sans-serif] font-bold text-[#545454] leading-[4rem]">
                <span>Come</span>
                <span>fall in LOVE</span>
                <span className="leading-[5rem]">with our <span className="px-4 py-1 bg-orange-500 text-white rounded-xl">Delicious Food</span></span>
                </div>
            </div>
        </>
    );
}