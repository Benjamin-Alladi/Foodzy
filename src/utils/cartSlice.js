// import { createSlice } from "@reduxjs/toolkit";
const { createSlice } = require('@reduxjs/toolkit');

const cartSlice= createSlice({
    name: "cart",

    initialState: {
        items:[]
    },

    reducers: {
        addItem: (state, action)=>{
            state.items.push(action.payload);
        },

        removeItem: (state, action)=>{
            state.items= state.items.filter((item)=> item.card.info.id!= action.payload);
        },

        clearCart: (state, action)=>{
            // state.items.length=0;

            return {
                items: []
            }
        }
    }
});

export const cartActions= cartSlice.actions;
export const cartReducer= cartSlice.reducer;

console.log(cartSlice);
console.log(cartActions);
console.log(cartReducer.toString());

// {
//     name: 'cart',
//     reducer: [Function: reducer],
//     actions: {
//       addItem: [Function: actionCreator] {
//         toString: [Function (anonymous)],
//         type: 'cart/addItem',
//         match: [Function (anonymous)]
//       },
//       removeItem: [Function: actionCreator] {
//         toString: [Function (anonymous)],
//         type: 'cart/removeItem',
//         match: [Function (anonymous)]
//       },
//       clearCart: [Function: actionCreator] {
//         toString: [Function (anonymous)],
//         type: 'cart/clearCart',
//         match: [Function (anonymous)]
//       }
//     },
//     caseReducers: {
//       addItem: [Function: addItem],
//       removeItem: [Function: removeItem],
//       clearCart: [Function: clearCart]
//     },
//     getInitialState: [Function: getInitialState],
//     reducerPath: 'cart',
//     getSelectors: [Function: getSelectors],
//     selectors: {},
//     selectSlice: [Function: selectSlice],
//     injectInto: [Function: injectInto]
//   }