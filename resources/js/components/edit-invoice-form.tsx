import React, { useState, useEffect } from 'react';
import apiClient from '@/components/api.tsx';

export function EditInvoiceForm({ object }) {
    const [invoice, setInvoice] = useState({ customer_name: object.customer_name, due_date: object.due_date, paid: object.paid });
    const [selectedDate, setSelectedDate] = useState(object.due_date);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setInvoice({ ...invoice, [e.target.name]: e.target.value });
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await apiClient.post(`/invoice/${object.id}`, invoice);
            setLoading(false);
        } catch (err) {
            setError(err);
            console.log('Error updating invoice.');
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading Invoice...</div>;
    }

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
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </div>
            <div>
                <label htmlFor="paid">Paid:</label>
                <input
                    type="checkbox"
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
