import { Trash2 } from 'lucide';
import '../../../css/item-row.css';

export default function ItemRow({name, id}) {
    const elementName = 'new-item-'+id;

    const handleRemoveItem = () => {
    // const handleRemoveItem = (event) => {
        // const filteredItems = addedItems.filter(addedItem => addedItem.id !== event.target.dataset.id);
        // setAddedItems(filteredItems);
    };

    return (
        <div name={elementName} class='new-item'>
            {name}
            <Trash2 class='remove-icon' data-id={id} onClick={handleRemoveItem} />
        </div>
    );
}
