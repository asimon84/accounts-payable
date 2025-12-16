import { useEffect, useState } from 'react';
import $ from 'jquery';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.html5';
import jszip from 'jszip';
import apiClient from '@/components/api.tsx';
import '../../css/invoice-table.css';

export default function InvoiceTable() {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    DataTable.use(DT);
    DT.Buttons.jszip(jszip);
    // DT.Buttons.pdfMake(pdfmake);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await apiClient.get('/invoices');
                setInvoices(response.data.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                console.error("Error fetching Invoices:", error);
                setLoading(false);
            }
        };
        fetchInvoices();
    }, []);

    // const handleView = (event) => {
    //     window.location.href = '/invoices/' + event.target.dataset.id;
    // };

    const columns = [
        { data: 'id' },
        { data: 'customer_name' },
        { data: 'due_date' },
        { data: 'paid' },
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

    if (loading) return <div id="invoice-table-loading">Loading Invoices...</div>;

    if (error) return <p id="invoice-table-error">Error: {error.message}</p>;

    return (
        <div id="invoice-table-container" className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <span class="heading">Invoices</span>
            <DataTable
                columns={columns}
                data={invoices}
                className="invoice-table"
                options={{
                    layout: {
                      topStart: {
                        buttons: [
                            {
                                extend: 'copyHtml5',
                                className: 'cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-150'
                            },
                            {
                                extend: 'excelHtml5',
                                className: 'cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-150'
                            },
                            {
                                extend: 'csvHtml5',
                                className: 'cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-150'
                            },
                            {
                                text: 'Create Item',
                                className: 'cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-150',
                                action: function () {
                                    window.location.href = './create-invoice';
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
                        $('.buttons-html5').removeClass('buttons-html5');
                    }
                }}
            >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Due</th>
                        <th>Paid</th>
                        <th>Actions</th>
                    </tr>
                </thead>
            </DataTable>
        </div>
    );
}