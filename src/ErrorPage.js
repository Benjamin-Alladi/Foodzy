import {useRouteError} from "react-router-dom";

export default function ErrorPage()
{
    const err= useRouteError();
    console.log(err);

    const styleObj= {
        marginTop: "12%",
        marginLeft: "30%",
        fontFamily: "PT Sans, Calibri, sans-serif",
        fontSize: "larger",
        // border: "1px solid black",

        width: "30%",
        textAlign: "center"
    }
    return (
        <div className="error-box" style={styleObj}>
            <h1 style={{color:"red", fontWeight:"lighter"}}  className="loading-text">ERROR</h1>
            <p style={{color:"navy"}}>{err.data}</p>
            <p style={{color:"navy"}}>{err.status}: {err.statusText}</p>
        </div>
    );
}