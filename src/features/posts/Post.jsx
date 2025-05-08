import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, selectAllPosts, selectStatus,addPost, deletePost ,updatePost} from './postSlice'
import { nanoid } from '@reduxjs/toolkit'

const Post = () => {

    let count = 0;
    const [isEditing,setIsEditing]=useState(false)
    const [updatePostId,setUpdatedPostId]=useState(null)

    const [post,setPost] = useState({

    })
    const dispatch = useDispatch()
    const status = useSelector(selectStatus)
    const posts = useSelector(selectAllPosts)

    useEffect(()=>{
        if(status == 'idle'){
            dispatch(fetchPosts())
        }
       
    },[dispatch,status])

    function handleSubmit(e)
    {
        e.preventDefault()
        if(isEditing){
            dispatch(updatePost({id:updatePostId,title:post.title,body:post.body}))
            setPost({title:"",body:""})
        }
        else{
            
            dispatch(addPost({id:nanoid(),...post}))
            setPost({title:"",body:""})
        }
       
    }

    function handleDelete(postId)
    {
        dispatch(deletePost(postId))
    }

    function handleEdit(post)
    {
        setPost(post)
        setIsEditing(true)
        setUpdatedPostId(post.id)
    }
  return (
    <>

    <div className="container">
        <div className="row">
            <div className="col-md-6">
                <form action="">
                    <div>
                        <label htmlFor="" className='form-label'>
                            Title
                        </label>
                        <input type="text"  name="title" className='form-control' value={post.title}  onChange={(e)=>{setPost({...post,title:e.target.value})}}/>
                    </div>
                    <div>

                    <label htmlFor="" className='form-label'>
                            Body
                        </label>
                        <input type="text"  name="body" className='form-control'value={post.body} onChange={(e)=>{setPost({...post,body:e.target.value})}}/>
                    </div>
                    <div>
                         <button className="btn btn-dark p-3" onClick={(e)=>handleSubmit(e)}> {isEditing?"Update":"Submit"}</button>
                    </div>
                </form>
            </div>
            <div className="col-md-6">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Post</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map((post)=>(
                                <tr key={post.id}>
                                    <td>{++count}</td>
                                    <td>{post.title}</td>
                                    <td>{post.body}</td>
                                    <td>
                                        <button className='btn btn-warning mx-3' onClick={()=>handleEdit(post)}>Edit</button>
                                        <button className='btn btn-danger' onClick={()=>handleDelete(post.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    </div>

    </>
  )
}

export default Post