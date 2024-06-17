export default function ShimmerContainer()
{
    return(
        <div className="shimmer-container">
            {
                Array(10).fill(" ").map((value,index)=> <ShimmerCard ind={index}/>)
            }
        </div>
    );
}

export function ShimmerCard({ind})
{
    return (
        <div className="shimmer-card" key={ind}>
            <div className="shimmer-img"></div>

            <h3></h3>
            <h5></h5>
            <h5></h5>
            <h5></h5>

            <ul>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    );
}