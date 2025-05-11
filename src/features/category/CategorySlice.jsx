import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    categories:[],
    status: 'idle',
    error: null
};



export const fetchAllCategories = createAsyncThunk(
  'categories/fetchAllCategories',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:8383/categories/all");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

 const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCategories.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllCategories.fulfilled, (state, action) => {
                state.status = "completed";
                state.categories = action.payload;
            })
            .addCase(fetchAllCategories.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
           
    }
});

export const getStatus = (state) => state.category.status;
export const getAllCategories =(state)=>state.category.categories
export default categorySlice.reducer;
