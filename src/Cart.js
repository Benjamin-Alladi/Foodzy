import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ItemList } from './MenuCategory';
import { cartActions } from './utils/cartSlice';

export default function Cart() {

    const cartItems= useSelector((state)=> state.cart.items);
    // console.log(cartItems);

    const dispatch= useDispatch();
    function handleClearCart()
    {
        // dispatch({
        //     type: "cart/clearCart"
        // });

        dispatch(cartActions.clearCart());
        // console.log("clicked");
    }

    return (
        <div className="w-6/12 mx-auto mt-1 flex flex-col justify-evenly items-center">
            <h1 className="text-lg font-semibold">Cart</h1>
            
            <button type="button" className="text-white bg-gray-800 hover:bg-black focus:outline-none font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 mt-1"
            onClick={handleClearCart}>
                Clear Cart
            </button>

            {cartItems.length>0 && <ItemList itemCardsList={cartItems}/>}
            {cartItems.length===0 && <h1 className="mt-[3.8rem] text-lg font-semibold">Your Cart is Empty!</h1>}
        </div>
    );
};
