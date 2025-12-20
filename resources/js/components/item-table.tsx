import { useEffect, useState } from 'react';
import $ from 'jquery';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-buttons/js/buttons.html5';
import jszip from 'jszip';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import apiClient from '@/components/api.tsx';
import '../../css/item-table.css';

pdfMake.vfs = pdfFonts.vfs;

export default function ItemTable() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    DataTable.use(DT);
    DT.Buttons.jszip(jszip);
    DT.Buttons.pdfMake(pdfMake);

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
        { data: 'description', className: 'ellipsis-text' },
        { data: 'price' },
        {
            data: function (row) {
                return row.id;
            },
            render: function(data) {
                return '<div class="action-buttons">' +
                    '<a href="/item/'+data+'" class="btn-primary" type="button">View</a>' +
                    '<a href="/item/'+data+'" class="cursor-pointer px-4 py-2 bg-green-500 hover:bg-green-700 text-white font-bold rounded shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-150 ease-in-out" type="button">Edit</a>' +
                    '<a href="/item/'+data+'" class="cursor-pointer px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-150 ease-in-out" type="button">Delete</a>' +
                '</div>';
            },
            orderable: false,
        }
    ];

    if (loading) return; //<div id="item-table-loading">Loading Items...</div>;

    if (error) return <p id="item-table-error">Error: {error.message}</p>;

    return (
        <div id="item-table-container" className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <span class="heading">Items</span>
            <DataTable
                columns={columns}
                data={items}
                className="item-table"
                options={{
                    layout: {
                      topStart: {
                        buttons: [
                            {
                                extend: 'copyHtml5',
                                className: 'btn-primary'
                            },
                            {
                                extend: 'excelHtml5',
                                className: 'btn-primary'
                            },
                            {
                                extend: 'csvHtml5',
                                className: 'btn-primary'
                            },
                            {
                                extend: 'pdfHtml5',
                                className: 'btn-primary'
                            },
                            {
                                text: 'Create Item',
                                className: 'btn-primary',
                                action: function () {
                                    window.location.href = './create-item';
                                }
                            }
                        ],
                      },
                    },
                    select: true,
                    initComplete: function () {
                        $('.dt-button').removeClass('dt-button');
                        $('.buttons-excel').removeClass('buttons-excel');
                        $('.buttons-copy').removeClass('buttons-copy');
                        $('.buttons-csv').removeClass('buttons-csv');
                        $('.buttons-pdf').removeClass('buttons-pdf');
                        $('.buttons-html5').removeClass('buttons-html5');
                    }
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