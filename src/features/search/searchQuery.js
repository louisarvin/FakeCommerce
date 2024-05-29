import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchQuery: '',
};

export const searchBar = createSlice({
    name: 'query',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        validateSearchQuery: (state) => {
            const searchQuery = state.searchQuery.trim();
            if (!searchQuery) {
                return;
            }
            // Add your validation logic here
            // For example, you can check if the search query contains only alphanumeric characters
            const regex = /^[a-zA-Z0-9]+$/;
            if (!regex.test(searchQuery)) {
                // If the search query is invalid, set an error message
                state.error = 'Invalid search query';
            } else {
                // If the search query is valid, clear the error message
                delete state.error;
            }
        },
    },
});

export const { setSearchQuery, validateSearchQuery } = searchBar.actions;