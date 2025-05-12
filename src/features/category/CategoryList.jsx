import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories, getAllCategories, getStatus,deleteCategory } from './CategorySlice';
import { Button } from 'bootstrap';
import { Link } from 'react-router-dom';

const CategoryList = () => {
    const dispatch = useDispatch();
    const categories = useSelector(getAllCategories);
    const status = useSelector(getStatus);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllCategories());
        }
    }, [dispatch, status]);

    function handleDelete(categoryId)
    {
        dispatch(deleteCategory(categoryId))
    }

    return (
    <div className="container mt-4">
    <div className="row">
        <div className="col-md-6">
            <Link to='create' className='btn btn-primary my-3'>Add Category</Link>
        </div>
    <div className="table-responsive">
        <table className="table table-bordered table-hover text-center align-middle">
            <thead className="table-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {categories.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>
                            <button 
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(item.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>

</div>
    );
};

export default CategoryList;
