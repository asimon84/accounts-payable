import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import apiClient from '@/components/api.tsx';
import '../../css/create-item-form.css';

interface CreateInvoiceFormProps {
    onSubmit: (data: FormData) => void;
}

const CreateInvoiceForm: React.FC<CreateInvoiceFormProps> = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: '',
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

        try {
            apiClient.post(`/item`, formData).then(res => {
                window.location.href = './item/' + res.data.id;
            });
            setLoading(false);
        } catch (err) {
            setError(err);
            console.log('Error creating item.');
            setLoading(false);
        }
    };

    if (loading) return; //<div id="create-invoice-loading">Loading Invoice...</div>;

    if (error) return <p id="create-invoice-error">Error: {error.message}</p>;

    return (
        <form id="create-item-form" onSubmit={handleSubmit}>
            <div>
                <label>
                    Name:
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>
                    Description:
                </label>
                <textarea
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
                <button
                    class="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-150"
                    type="submit">
                        Submit
                </button>
            </div>
        </form>
    );
};

export default CreateInvoiceForm;