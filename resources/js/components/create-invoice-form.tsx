import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import apiClient from '@/components/api.tsx';
import '../../css/create-invoice-form.css';

interface CreateInvoiceFormProps {
    onSubmit: (data: FormData) => void;
}

const CreateInvoiceForm: React.FC<CreateInvoiceFormProps> = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [addedItems, setAddedItems] = useState([]);
    const [selectedValue, setSelectedValue] = React.useState<string | undefined>(undefined);
    const [itemCount, setItemCount] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        customer_name: '',
        due_date: '',
        paid: false,
    });

    useEffect(() => {
        const fetchItems = async () => {
            try {
                apiClient.get(`/items`).then(res => {
                    setItems(res.data.data);
                });
            } catch (err) {
                setError(err);
                console.log('Error getting items.');
            }
        };
        fetchItems();
    }, []);

    const handleSelectChange = (value: string) => {
        setSelectedValue(value);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'number' ? Number(value) : value,
        }));
    };

    const handleAddItem = () => {
        if(selectedValue === undefined) {
            alert('Please select an item from the drop own before clicking Add Item!')
        } else {
            const addItemOutput = document.getElementById('add-item-output');
            const newItemDiv = document.createElement("div");

            const foundItem = items.find(item => item.name === selectedValue);

            // console.log(foundItem);

            newItemDiv.innerHTML  = selectedValue;
            newItemDiv.name = 'new-item-' + foundItem.id;
            newItemDiv.className = "new-item";

            setItemCount(itemCount + 1);

            addItemOutput.appendChild(newItemDiv);

            setAddedItems([...items, foundItem.id]);

            setFormData((prevData) => ({
                ...prevData,
                ['items']: addedItems,
            }));

            // const addItemOutput = document.getElementById('add-item-output');
            // const newItemDiv = document.createElement("div");
            // const newItemName = document.createElement("input");
            // const newItemDescription = document.createElement("textarea");
            // const newItemPrice = document.createElement("input");
            //
            // let itemName = 'new_item_name_' + itemCount;
            // let itemDescription = 'new_item_description_' + itemCount;
            // let itemPrice = 'new_item_price_' + itemCount;
            //
            // newItemName.name = itemName;
            // newItemName.className = "new-item";
            // newItemDescription.name = itemDescription;
            // newItemDescription.className = "new-item";
            // newItemPrice.name = itemPrice;
            // newItemPrice.className = "new-item";
            // newItemPrice.type = "number";
            //
            // setFormData((prevData) => ({
            //     ...prevData,
            //     [itemName]: '',
            //     [itemDescription]: '',
            //     [itemPrice]: '',
            // }));
            //
            // newItemDiv.appendChild(newItemName);
            // newItemDiv.appendChild(newItemDescription);
            // newItemDiv.appendChild(newItemPrice);
            // addItemOutput.appendChild(newItemDiv);
            //
            // setItemCount(itemCount + 1);
            //
            // newItemName.addEventListener('change', handleInputChange);
            // newItemDescription.addEventListener('change', handleInputChange);
            // newItemPrice.addEventListener('change', handleInputChange);
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            apiClient.post(`/invoice`, formData).then(res => {
                console.log(res);
                window.location.href = './invoice/' + res.data.id;
            });
            setLoading(false);
        } catch (err) {
            setError(err);
            console.log('Error creating invoice.');
            setLoading(false);
        }
    };

    if (loading) return; //<div id="create-invoice-loading">Loading Invoice...</div>;

    if (error) return <p id="create-invoice-error">Error: {error.message}</p>;

    return (
        <form id="create-invoice-form" onSubmit={handleSubmit}>
            <div>
                <label>
                    Customer Name:
                </label>
                <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>
                    Due Date:
                </label>
                <input
                    type="date"
                    name="due_date"
                    value={formData.due_date}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>
                    Paid:
                </label>
                <input
                    type="checkbox"
                    name="paid"
                    value={formData.paid}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <label>
                    Items:
                </label>
                <Select onValueChange={handleSelectChange} value={selectedValue}>
                    <SelectTrigger id="item-select" className="w-full" value={selectedValue}>
                        <SelectValue placeholder="Select an Item" />
                    </SelectTrigger>
                    <SelectContent>
                        {items.map((option) => (
                            <SelectItem key={option.id} value={option.name}>
                                {option.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <button
                    id="add-item-button"
                    class="btn-gray"
                    type="button"
                    onClick={handleAddItem}
                    value={selectedValue}>
                    Add Item
                </button>
            </div>
            <div id="add-item-output">

            </div>
            <div>
                <button
                    class="btn-blue"
                    type="submit">
                    Submit
                </button>
            </div>
        </form>
    );
};

export default CreateInvoiceForm;
