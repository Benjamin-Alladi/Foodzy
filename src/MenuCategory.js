export default function MenuCategory({data, index, showIndex, setShowIndex})
{
    // const [show, setShow]= useState(index===showIndex);
    // console.log("Data:",data);

    function handleClick()
    {
        setShowIndex(index===showIndex?null:index);
    }

    return (
        // Accordion
        <div className="w-[62%] mx-auto my-4 bg-gray-50 shadow-md p-4 cursor-pointer font-[PT Sans, Calibri, sans-serif] border-b-4">

            <div className="flex justify-between">
                <span className="font-medium">{data.title} ({data.itemCards.length})</span>
                <span className="text-xl" onClick={handleClick} onMouseOver={(e)=>e.target.style.transform= "scale(1.1)"} onMouseOut={(e)=>e.target.style.transform="scale(1)"}>⬇️</span>
            </div>
            
            {index===showIndex && <ItemList itemCardsList={data.itemCards}/>}
        </div>
    );
}

export function ItemList({itemCardsList})
{
    // console.log(itemCardsList);
    const cdn_url="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/";
    // Accordion Body
    return(
        <div>
            {
                itemCardsList.map(itemCard =>

                    <div key={itemCard.card.info.id} className="p-2 m-2 border-b-2 flex justify-between">
                        <div className="flex flex-col w-[70%]">
                            <span className="font-medium">{itemCard.card.info.name}</span>
                            <span> ₹{itemCard.card.info.price?itemCard.card.info.price/100: itemCard.card.info.defaultPrice/100}</span>

                            <p className="text-xs text-gray-500">{itemCard.card.info.description}</p>
                        </div>

                        <div className="w-[24%] mb-6 relative">
                            <img src={cdn_url+itemCard.card.info.imageId} className="rounded-lg"/>
                            <button className="bg-[#ff4500] text-white px-8 py-1 rounded-md absolute left-11 bottom-[-14] shadow-lg active:scale-[0.96]">Add</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}