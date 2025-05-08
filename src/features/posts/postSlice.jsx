import { createSlice } from '@reduxjs/toolkit'
import React from 'react'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const initialState={
    posts:[],
    status:"idle",
    error:null
}


export const fetchPosts = createAsyncThunk("fetchposts",async(_,thunkAPI)=>{

    try{
        const response = await axios.get("http://localhost:3000/posts")
        return response.data
    }catch(error){
        return thunkAPI.rejectWithValue(error.message)
    }
})

export  const  addPost = createAsyncThunk("posts/addPost",async(post)=>{
    const response =await axios.post('http://localhost:3000/posts',post)
    return response.data
})

export const deletePost = createAsyncThunk("posts/deletePost",async(id)=>{
    const response = await axios.delete(`http://localhost:3000/posts/${id}`)
    return response.data
})

export const updatePost = createAsyncThunk("posts/updatePost",async(post)=>{
    const response = await axios.put(`http://localhost:3000/posts/${post.id}`,post)
    return response.data
})
const PostSlice = createSlice(
    {
        name:"post",
        initialState,
        reducers:{

        },
        extraReducers:(builder)=>{
                builder
                .addCase(fetchPosts.pending,(state)=>{
                    state.status="loading"
                })
                .addCase(fetchPosts.fulfilled,(state,action)=>{
                    state.status ="completed"
                    state.posts = action.payload
                })
                .addCase(fetchPosts.rejected,(state,action)=>{
                    state.status = "failed"
                    state.error = action.error
                })
                .addCase(addPost.fulfilled,(state,action)=>{
                    state.posts.push(action.payload)
                })
                .addCase(deletePost.fulfilled,(state,action)=>{
                    state.posts = state.posts.filter((post)=>post.id != action.payload)
                    state.status = "idle"
                })
                .addCase(updatePost.fulfilled,(state,action)=>{
                    state.posts = state.posts.map((post)=>post.id = action.payload.id? action.payload:post)
                    state.status = "idle"
                })
        }
    }
)
export const selectStatus =(state)=>state.posts.status
export const selectAllPosts =(state)=>state.posts.posts
export default PostSlice.reducer
