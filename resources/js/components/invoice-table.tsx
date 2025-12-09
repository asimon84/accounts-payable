import React, { useEffect, useState } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import 'datatables.net-select-dt';
import 'datatables.net-buttons-dt';
import 'datatables.net-buttons/js/buttons.html5';
import jszip from 'jszip';
import pdfmake from 'pdfmake';
import apiClient from '@/components/api.tsx';
import '../../css/invoice-table.css';

export default function InvoiceTable() {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    DataTable.use(DT);
    DT.Buttons.jszip(jszip);
    DT.Buttons.pdfMake(pdfmake);

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
    ];

    if (loading) return <div id="invoice-table-loading">Loading Invoices...</div>;

    if (error) return <p id="invoice-table-error">Error: {error.message}</p>;

    return (
        <div id="invoice-table-container" className="relative flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
            <DataTable
                columns={columns}
                data={invoices}
                className="display"
                options={{
                    layout: {
                      topStart: 'buttons',
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
                    </tr>
                </thead>
            </DataTable>
        </div>
    );
}