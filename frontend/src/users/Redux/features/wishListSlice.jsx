import { createSlice } from "@reduxjs/toolkit"


const initialState={
    wishListItemsCount:0,
    wishListItems:[],
}

const wishListSlice = createSlice({

    name:"wishList",
    initialState,
    reducers:{
        addToWishList:(state,action)=>{

            state.wishListItemsCount+=1,
            state.wishListItems.push(action.payload);

        },
        removeFromWishList:(state,action)=>{

            const removedItem = state.wishListItems.find(item=>item.id === action.payload);

            state.wishListItems.filter(item=>item.id!==action.payload)

        }
    }

})

export const {addToWishList,removeFromWishList} = wishListSlice.actions;

export default wishListSlice;