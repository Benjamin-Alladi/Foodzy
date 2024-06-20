import {useRouteError} from "react-router-dom";

export default function ErrorPage()
{
    const err= useRouteError();
    console.log(err);

    return (
        <div className="error-box">
            <h1>Error</h1>
            <p>{err.status}: {err.statusText}</p>
        </div>
    );
}