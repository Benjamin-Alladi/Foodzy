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
        <div className="contact-box">

            <h1>Contact Us</h1>
            <div className="contact-main">
                <div className="contact-img">
                    <img src="https://foodfire-app.netlify.app/contactUs.13c5d28a.png" alt="" />
                </div>

                <form className="contact-form" onSubmit={handleSubmit}>
                    <input type="text" id="name" placeholder="Name" required/>
                    <input type="email" id="email" placeholder="Email" required/>
                    <textarea name="ta" id="text-area" rows="5" placeholder="Type your message here..." required></textarea>

                    <button className="submit-btn">Submit</button>

                    {submitted && <span style={{marginTop:"-1.5rem", fontSize:"1.1rem", color:"navy"}}>Thanks for contacting Foodzy, we will reply you shortly!</span>}
                </form>
            </div>
        </div>
    )
}