// sortProduct.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    originalList: [],
    sortList: [],
    sortBy: 'alphabetical',
};

export const SortProduct = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setSortList: (state, action) => {
            const { sortList, sortBy } = action.payload;
            state.originalList = sortList;
            state.sortList = [...sortList];
            state.sortBy = sortBy;
        },
        sortAlphabetical: (state) => {
            state.sortList.sort((a, b) => a.title.localeCompare(b.title));
            state.sortBy = 'alphabetical';
        },
        sortReverseAlphabetical: (state) => {
            state.sortList.sort((a, b) => b.title.localeCompare(a.title));
            state.sortBy = 'reverseAlphabetical';
        },
        sortPriceHighest: (state) => {
            state.sortList.sort((a, b) => b.price - a.price);
            state.sortBy = 'priceHighest';
        },
        sortPriceLowest: (state) => {
            state.sortList.sort((a, b) => a.price - b.price);
            state.sortBy = 'priceLowest';
        },
        filterByCategory: (state, action) => {
            const category = action.payload;
            if (category === '') {
                state.sortList = [...state.originalList];
            } else {
                state.sortList = state.originalList.filter(product => product.category === category);
            }
        },
        searchProducts: (state, action) => {
            const query = action.payload.toLowerCase();
            state.sortList = state.originalList.filter(product => product.title.toLowerCase().includes(query));
        }
    },
});

export const {
    setSortList,
    sortAlphabetical,
    sortReverseAlphabetical,
    sortPriceHighest,
    sortPriceLowest,
    filterByCategory,
    searchProducts
} = SortProduct.actions;

export const selectSortedList = (state) => state.sort.sortList;

export default SortProduct.reducer;
