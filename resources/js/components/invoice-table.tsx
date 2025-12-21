import { useEffect, useState } from 'react';
import $ from 'jquery';
import { Button } from '@/components/ui/button';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-buttons/js/buttons.html5';
import jszip from 'jszip';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import apiClient from '@/components/api.tsx';
import '../../css/invoice-table.css';

pdfMake.vfs = pdfFonts.vfs;

export default function InvoiceTable() {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    DataTable.use(DT);
    DT.Buttons.jszip(jszip);
    DT.Buttons.pdfMake(pdfMake);

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
                    // '<a href="/invoice/'+data+'" class="btn-blue" type="button">View</a>' +
                    '<a href="/invoice/'+data+'" class="btn-green" type="button">Edit</a>' +
                    '<a href="#" class="btn-red" type="button">Delete</a>' +
                '</div>';
            },
            orderable: false,
        }
    ];

    if (loading) return; //<div id="invoice-table-loading">Loading Invoices...</div>;

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
                                text: 'Create Item',
                                className: 'btn-blue',
                                action: function () {
                                    window.location.href = './create-invoice';
                                }
                            },
                            {
                                extend: 'copyHtml5',
                                className: 'btn-gray'
                            },
                            {
                                extend: 'excelHtml5',
                                className: 'btn-gray'
                            },
                            {
                                extend: 'csvHtml5',
                                className: 'btn-gray'
                            },
                            {
                                extend: 'pdfHtml5',
                                className: 'btn-gray'
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
                        <th>Due</th>
                        <th>Paid</th>
                        <th>Actions</th>
                    </tr>
                </thead>
            </DataTable>
        </div>
    );
}