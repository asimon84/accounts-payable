import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import ApiClient from '@/components/api.tsx';

interface CreateInvoiceFormProps {
    onSubmit: (data: FormData) => void;
}

const CreateInvoiceForm: React.FC<CreateInvoiceFormProps> = ({ onSubmit }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        customer_name: '',
        due_date: '',
        paid: false,
    });

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'number' ? Number(value) : value,
        }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        console.log(onSubmit);

        try {
            ApiClient.post(`/invoice`, formData).then(res => {
                console.log(res);
                window.location.href = './invoices';
            });
            setLoading(false);
        } catch (err) {
            setError(err);
            console.log('Error creating invoice.');
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading Invoice...</div>;
    }

    if (error) return <p>Error: {error.message}</p>;

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Customer Name:
                <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                Due Date:
                <input
                    type="date"
                    name="due_date"
                    value={formData.due_date}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <label>
                Paid:
                <input
                    type="checkbox"
                    name="paid"
                    value={formData.paid}
                    onChange={handleInputChange}
                />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

export default CreateInvoiceForm;
