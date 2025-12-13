import { useEffect, useState } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-buttons/js/buttons.html5';
import jszip from 'jszip';
import apiClient from '@/components/api.tsx';
import '../../css/item-table.css';

export default function ItemTable() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    DataTable.use(DT);
    DT.Buttons.jszip(jszip);
    // DT.Buttons.pdfMake(pdfMake);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await apiClient.get('/items');
                setItems(response.data.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                console.error("Error fetching Items:", error);
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    // const handleView = (event) => {
    //     window.location.href = '/invoices/' + event.target.dataset.id;
    // };

    const columns = [
        { data: 'id' },
        { data: 'name' },
        { data: 'description' },
        { data: 'price' },
        {
            data: function (row) {
                return row.id;
            },
            render: function(data) {
                return '<div class="action-buttons">' +
                    '<input type="button" class="view-button" onClick={handleView} data-id="' + data + '" value="View"/>' +
                    '<input type="button" class="edit-button" onClick={handleEdit} data-id="' + data + '" value="Edit"/>' +
                    '<input type="button" class="delete-button" onClick={handleDelete} data-id="' + data + '" value="Delete"/>' +
                    '</div>';
            },
            orderable: false,
        }
    ];

    if (loading) return <div id="item-table-loading">Loading Items...</div>;

    if (error) return <p id="item-table-error">Error: {error.message}</p>;

    return (
        <div id="item-table-container" className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <DataTable
                columns={columns}
                data={items}
                className="item-table"
                options={{
                    layout: {
                      topStart: {
                        buttons: [
                            'copyHtml5',
                            'excelHtml5',
                            'csvHtml5',
                            'pdfHtml5',
                            {
                                text: 'Create Item',
                                action: function (e, dt, node, config) {
                                    alert('Button activated');
                                }
                            }
                        ]
                      },
                    },
                    select: true,
                  }}
            >
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
                </thead>
            </DataTable>
        </div>
    );
}