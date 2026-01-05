import React, { useState, useEffect, ChangeEvent } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import apiClient from '@/components/api.tsx';
import '../../css/edit-invoice-form.css';

export function EditInvoiceForm({ object }) {
    const [selectedDate, setSelectedDate] = useState(object.due_date);
    const [amount, setAmount] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isChecked, setIsChecked] = useState<boolean>(object.paid);
    const [items, setItems] = useState([]);
    const [addedItems, setAddedItems] = useState<ReactNode[]>([]);
    const [selectedValue, setSelectedValue] = React.useState<string | undefined>(undefined);
    const [itemCount, setItemCount] = useState(0);
    const [invoice, setInvoice] = useState({
        customer_name: object.customer_name,
        due_date: object.due_date,
        paid: isChecked,
    });

    const removeItem = (id) => {
        const newList = addedItems.filter((item) => item.id !== id);
        setAddedItems(newList);
    };

    const ItemRow = ({ id, name }) => (
        <div id={id}>
            <span className="item-row-name">{name}</span>
            <span className="close-icon" data-id={id} onClick={() => removeItem(id)}>X</span>
        </div>
    );

    useEffect(() => {
        const processInvoiceItems = async () => {
            object.invoice_items.forEach((element, index, array) => {
                const newItem = <ItemRow key={element.name} id={element.id} name={element.name} />;

                setAddedItems([...addedItems, newItem]);
                setItemCount((itemCount + 1));
            });
        };
        processInvoiceItems();
    }, []);

    const addNewItem = () => {
        const foundItem = items.find(item => item.name === selectedValue);
        const newItem = <ItemRow key={foundItem.name} id={foundItem.id} name={foundItem.name} />;

        setAddedItems([...addedItems, newItem]);
        setItemCount((itemCount + 1));
    };

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

    useEffect(() => {
        const updateAddedItems = async () => {
            setInvoice((prevData) => ({
                ...prevData,
                ['items']: addedItems,
            }));
        };
        updateAddedItems();
    }, [addedItems]);

    const handleSelectChange = (value: string) => {
        setSelectedValue(value);
    };

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
            await apiClient.put(`/invoice/${object.id}`, {customer_name: invoice.customer_name, due_date: invoice.due_date, paid: isChecked, items: addedItems});
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
                <label>
                    Items:
                </label>
                <Select onValueChange={handleSelectChange} value={selectedValue}>
                    <SelectTrigger id="item-select" className="w-full">
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
                    onClick={addNewItem}>
                    Add Item
                </button>
            </div>
            <div id="add-item-output">
                {addedItems}
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
