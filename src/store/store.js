import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/posts/postSlice.jsx";
import CategorySlice from "../features/category/CategorySlice.jsx";
const store =configureStore(
    {
        reducer:{
            posts:postReducer,
            category:CategorySlice
        }
    }
)
export default store