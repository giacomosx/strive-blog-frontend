import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = 'https://strive-blog-gsx-c679dec9e563.herokuapp.com/api' //process.env.REACT_APP_BASE_URL;

const initialState = {
    isLoading: false,
    data: null,
    isError: null,
    searchResults: null
}

export const getData = createAsyncThunk('posts/GET', async (options) => {
    try {
        const response = await axios.get(baseUrl + '/blogPosts')

        if (response.status === 200) {
            return response.data.posts;
        }

    } catch (e) {
        return e
    }
})

export const getDataById = createAsyncThunk('post/GET', async (options) => {
    try {
        const response = await axios.get(baseUrl + '/blogPosts/' + options)
        const data = await response.data

        return data.posts
    } catch (e) {
        console.error(e.message)
    }
})

const resultsSlice = createSlice({
    name : 'results',
    initialState,
    reducers: {
        resetSearchResults:  (state) => {
            state.searchResults = null
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getData.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getData.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload
            })
            .addCase(getDataById.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getDataById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.searchResults = action.payload;
            })
            .addCase(getDataById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = action.payload;
            })
    }
})

export const searchResultsLoading = state => state.searchResultsState.isLoading
export const searchResultsData = state => state.searchResultsState.data
export const searchResultByQuery = state => state.searchResultsState.searchResults
export const searchResultsError = state => state.searchResultsState.isError
export const {resetSearchResults} = resultsSlice.actions;
export default resultsSlice.reducer