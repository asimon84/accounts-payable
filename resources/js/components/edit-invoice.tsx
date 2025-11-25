import React, { useState } from 'react';

export function EditInvoice( invoice ) {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSave = (updatedModel) => {
        // Logic to save the updated model (e.g., API call)
        console.log('Saving updated model:', updatedModel);
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
                <EditModelForm invoice={invoice} onSave={handleSave} onCancel={handleCancel} />
            )}
        </div>
    );
}