import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import apiClient from '@/components/api.tsx';
import '../../css/create-item-form.css';

interface CreateInvoiceFormProps {
    onSubmit: (data: FormData) => void;
}

const CreateInvoiceForm: React.FC<CreateInvoiceFormProps> = ({ onSubmit }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        description: '',
        price: 0,
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
            apiClient.post(`/item`, formData).then(res => {
                console.log(res);
                window.location.href = './items';
            });
            setLoading(false);
        } catch (err) {
            setError(err);
            console.log('Error creating item.');
            setLoading(false);
        }
    };

    if (loading) return <div id="create-invoice-loading">Loading Invoice...</div>;

    if (error) return <p id="create-invoice-error">Error: {error.message}</p>;

    return (
        <form id="create-item-form" onSubmit={handleSubmit}>
            <div>
                <label>
                    Description:
                </label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>
                    Price:
                </label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
};

export default CreateInvoiceForm;