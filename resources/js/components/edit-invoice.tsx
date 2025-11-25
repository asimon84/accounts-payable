import React, { useState } from 'react';

export function EditInvoice( props ) {
    const { invoice } = props;

    // const [isEditing, setIsEditing] = useState(false);
    //
    // const handleEditClick = () => {
    //     setIsEditing(true);
    // };
    //
    // const handleSave = (updatedModel) => {
    //     // Logic to save the updated model (e.g., API call)
    //     console.log('Saving updated model:', updatedModel);
    //     setIsEditing(false); // Hide the form after saving
    // };
    //
    // const handleCancel = () => {
    //     setIsEditing(false); // Hide the form if cancelled
    // };
    //
    // return (
    //     <div>
    //         {!isEditing ? (
    //             <div>
    //                 <h2>{model.name}</h2>
    //                 <p>{model.description}</p>
    //                 <button onClick={handleEditClick}>Edit</button>
    //             </div>
    //         ) : (
    //             <EditModelForm model={model} onSave={handleSave} onCancel={handleCancel} />
    //         )}
    //     </div>
    // );
}