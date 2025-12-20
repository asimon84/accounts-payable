import React, { useState, useEffect, ChangeEvent } from 'react';
import apiClient from '@/components/api.tsx';
import '../../css/edit-invoice-form.css';

export function EditInvoiceForm({ object }) {
    const [selectedDate, setSelectedDate] = useState(object.due_date);
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isChecked, setIsChecked] = useState<boolean>(object.paid);
    const [invoice, setInvoice] = useState({
        customer_name: object.customer_name,
        due_date: object.due_date,
        paid: isChecked
    });

    const handleChange = (e) => {
        setInvoice({ ...invoice, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const newCheckedState = event.target.checked;

        setIsChecked(newCheckedState);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await apiClient.put(`/invoice/${object.id}`, {customer_name: invoice.customer_name, due_date: invoice.due_date, paid: isChecked});
            setLoading(false);
        } catch (err) {
            setError(err);
            console.log('Error updating invoice.');
            setLoading(false);
        }
    };

    const changeAmount = (ev) => {
        setAmount(ev.target.value);
    };

    const processPayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await apiClient.post(`/payments`, { invoiceId: object.id, amount: amount, paid: invoice.paid }).then(() => {
                window.location.reload(true);
            });
        } catch (err) {
            setError(err);
            console.log('Error updating invoice.');
            setLoading(false);
        }
    };

    if (loading) return; //<div id="edit-invoice-loading">Loading Invoice...</div>;

    if (error) return <p id="edit-invoice-error">Error: {error.message}</p>;

    return (
        <form id="edit-invoice-form" onSubmit={handleSubmit}>
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
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
            </div>
            <div>
                <button
                    class="btn-blue"
                    type="submit">
                    Update Invoice
                </button>
            </div>
            <br/><br/>
            <div>
                <label>
                    Items:
                </label>
                <button
                    class="btn-gray"
                    type="button">
                    Add Item
                </button>
            </div>
            <div>

            </div>
            <br/><br/>
            <div>
                <label htmlFor="amount">Amount:</label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    min="0"
                    step="1"
                    value={amount}
                    onChange={changeAmount}
                />
            </div>
            <div>
                <button
                    class="btn-green"
                    onClick={processPayment}
                    type="button">
                    Submit Payment
                </button>
            </div>
        </form>
    );
}
