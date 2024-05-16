import { createSlice } from "@reduxjs/toolkit"


const initialState={

    cartItems:[],
    totalPrice:0

}

const cartSlice = createSlice({

    name:"cart",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            state.cartItems.push(action.payload);
            state.totalPrice+=action.payload.price;
        },
        removeFromCart:(state,action)=>{
            const removedItem = state.cartItems.find(item=>item.id === action.payload);

            state.cartItems = state.cartItems.filter(item=>item.id!==action.payload);

            state.totalPrice -= removedItem.price

        }
    }

})

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice;