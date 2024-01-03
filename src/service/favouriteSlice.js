import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
    name: "favourites",
    initialState:
     {   modules: [],},
    reducers: {
        setFavourites : (state, action) => {
            return action.payload;
        },
        addToFavourite : (state, action) => {
            const {moduleName, cards, authorUsername} = action.payload;
            const existingItem = state.modules.find(item => item.moduleName === moduleName && item.authorUsername === authorUsername)
            if(!existingItem){
                state.modules.push({moduleName, cards, authorUsername});
            }

        },
        removeFromFavourites: (state, action) => {
            const {moduleName, authorUsername} = action.payload;
            state.modules = state.modules.filter(item => !(item.moduleName === moduleName && item.authorUsername === authorUsername ));
        },
    },
})

export const { setFavourites, addToFavourite, removeFromFavourites} = favouriteSlice.actions;
export const selectFavourites = (state) => state.favourites;
export default favouriteSlice.reducer;