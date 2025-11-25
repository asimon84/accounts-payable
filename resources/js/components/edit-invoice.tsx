import React, { useState } from 'react';

export function EditInvoice( invoice ) {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSave = (updatedInvoice) => {
        console.log('Saving updated model:', updatedInvoice);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <div>
            {!isEditing ? (
                <div>
                    <p>{invoice.customer_name}</p>
                    <p>{invoice.due_date}</p>
                    <p>{invoice.paid}</p>
                    <button onClick={handleEditClick}>Edit</button>
                </div>
            ) : (
                <EditInvoiceForm invoice={invoice} onSave={handleSave} onCancel={handleCancel} />
            )}
        </div>
    );
}