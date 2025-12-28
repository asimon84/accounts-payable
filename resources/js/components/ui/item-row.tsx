import { Trash2 } from 'lucide';
import '../../../css/item-row.css';

function ItemRow({item}) {
    const elementName = 'new-item-'+item.id;

    const handleRemoveItem = (event) => {
        // const filteredItems = addedItems.filter(addedItem => addedItem.id !== event.target.dataset.id);
        // setAddedItems(filteredItems);
    };

    return (
        <div name={elementName} class='new-item'>
            {item.name}
            <Trash2 class='remove-icon' data-id={item.id} onClick={handleRemoveItem} />
        </div>
    );
}

export { ItemRow };
