import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories, getAllCategories, getStatus } from './CategorySlice';

const CategoryList = () => {
    const dispatch = useDispatch();
    const categories = useSelector(getAllCategories);
    const status = useSelector(getStatus);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllCategories());
        }
    }, [dispatch, status]);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryList;
