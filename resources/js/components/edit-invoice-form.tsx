import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiClient from '@/components/api.tsx';

export function EditInvoiceForm({ object }) {
    const [invoice, setInvoice] = useState({ customer_name: object.customer_name });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setInvoice({ ...invoice, [e.target.name]: e.target.value });
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
            <div>
                <label htmlFor="due_date">Due:</label>
                <input
                    type="date"
                    id="due_date"
                    name="due_date"
                    value={invoice.due_date}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="paid">Paid:</label>
                <input
                    type="boolean"
                    id="paid"
                    name="paid"
                    value={invoice.paid}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Update Invoice</button>
        </form>
    );
}
