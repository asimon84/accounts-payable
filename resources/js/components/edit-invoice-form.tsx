import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiClient from '@/components/api.tsx';

export function EditInvoiceForm({ object }) {
    const [invoice, setInvoice] = useState({ customer_name: '' });
    const [error, setError] = useState(null);

    setInvoice({object});

    const handleChange = (e) => {
        setInvoice({ ...invoice, [e.target.customer_name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // await axios.put(`/api/invoice/${invoice.id}`, invoice);
            alert('Invoice updated successfully!');
        } catch (err) {
            setError(err);
            alert('Error updating invoice.');
        }
    };

    if (error) return <p>Error: {error.message}</p>;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="customer_name">Customer Name:</label>
                <input
                    type="text"
                    id="customer_name"
                    name="customer_name"
                    value={invoice.customer_name}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Update Invoice</button>
        </form>
    );
}
