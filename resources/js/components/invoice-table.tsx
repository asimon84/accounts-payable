import { useEffect, useState } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
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
            <DataTable
                columns={columns}
                data={invoices}
                className="invoice-table"
                options={{
                    layout: {
                      topStart: {
                        buttons: [
                            'copyHtml5',
                            'excelHtml5',
                            'csvHtml5',
                            'pdfHtml5',
                            {
                                text: 'Create Invoice',
                                action: function (e, dt, node, config) {
                                    console.log(e);
                                    console.log(dt);
                                    console.log(node);
                                    console.log(config);

                                    window.location.href = './create-invoice';
                                }
                            }
                        ]
                      }
                    },
                    select: true,
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