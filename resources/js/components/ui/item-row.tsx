import '../../../css/item-row.css';

function ItemRow({item}) {
    const elementName = 'new-item-'+item.id;

    return (
        <div name={elementName} class='new-item'>
            {item.name}
        </div>
    );
}

export { ItemRow };
