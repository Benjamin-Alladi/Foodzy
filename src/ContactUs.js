import { useState } from "react";

export default function ContactUs()
{
    const [submitted,setSubmitted]= useState(false);

    function handleSubmit(e)
    {
        e.preventDefault();
        permit();
        setSubmitted(true);
    }
    async function permit()
    {
        await new Promise((resolve,reject)=>{
            setTimeout(()=>resolve(1),20000);
        })
    }

    return (
        <div className="font-[PT Sans, Calibri, sans-serif] flex flex-col items-center text-xl mt-[-2rem]">

            <h1 className="text-4xl mt-12 text-blue-800">Contact Us</h1>
            <div className="flex justify-center mt-[1.8rem] shadow-lg w-[80%] border-1">
                <div className="contact-img">
                    <img src="https://foodfire-app.netlify.app/contactUs.13c5d28a.png" alt="" />
                </div>

                <form className="flex flex-col justify-center items-start gap-8 w-[50%]" onSubmit={handleSubmit}>
                    <input type="text" id="name" placeholder="Name" className="w-[60%] p-[6px] h-8 outline-none border-[1.5px] border-[solid] border-blue-800 focus:border-[1.8px] focus:border-blue-950 rounded-md text-sm" required/>
                    <input type="email" id="email" placeholder="Email" className="w-[60%] p-[6px] h-8 outline-none border-[1.5px] border-[solid] border-blue-800 focus:border-[1.8px] focus:border-blue-950  rounded-md text-sm" required/>
                    <textarea name="ta" id="text-area" rows="4" placeholder="Type your message here..." className="w-[100%] p-[6px] outline-none border-[1.5px] border-[solid] border-blue-800 focus:border-[1.8px] focus:border-blue-950  rounded-md text-sm" required></textarea>

                    <button className="mt-[-1.2rem] mb-5 border-[1px] border-[solid] border-blue-950 bg-blue-950 text-white font-[PT Sans, Calibri, sans-serif] px-[1rem] py-[0.1rem] font-light text-[0.95rem] active:scale-[0.98]">Submit</button>

                    {submitted && <span style={{marginTop:"-2.8rem", marginBottom:"0rem", fontSize:"1rem", color:"navy"}}>Thanks for contacting Foodzy, we will reply you shortly!</span>}
                </form>
            </div>
        </div>
    )
}