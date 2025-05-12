import React, { useState } from 'react'
import { addCategory } from './CategorySlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CategoryForm = () => {
    const [name,setName]=useState("")
    const dispatch = useDispatch()  
    const navigate = useNavigate()
    function handleSubmit(e){
        e.preventDefault()
        dispatch(addCategory({name:name}))
        navigate('/categories')
    }
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <form action="">
                            <div className="my-3">
                                <label htmlFor="" className='form-label'>Category Name</label>
                                <input type="text"className='form-control' name="category_name" value={name} onChange={(e)=>setName(e.target.value)}/>
                            </div>
                            <div>
                                <button className='btn btn-primary' onClick={(e)=>handleSubmit(e)}>Submit</button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryForm