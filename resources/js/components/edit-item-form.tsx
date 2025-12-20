import React, { useState, useEffect, ChangeEvent } from 'react';
import apiClient from '@/components/api.tsx';
import '../../css/edit-item-form.css';

export function EditItemForm({ object }) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState({
        name: object.name,
        description: object.description,
        price: object.price
    });

    const handleChange = (e) => {
        setItem({ ...item, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await apiClient.put(`/item/${object.id}`, {name: item.name, description: item.description, price: item.price});
            setLoading(false);
        } catch (err) {
            setError(err);
            console.log('Error updating item.');
            setLoading(false);
        }
    };

    // if (loading) return <div id="edit-item-loading">Loading Item...</div>;

    if (error) return <p id="edit-item-error">Error: {error.message}</p>;

    return (
        <form id="edit-item-form" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={item.name}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={item.description}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="price">price:</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={item.price}
                    onChange={handleChange}
                />
            </div>
            <div>
                <button
                    class="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-150"
                    onClick={handleSubmit}
                    type="button">
                    Update
                </button>
            </div>
        </form>
    );
}
