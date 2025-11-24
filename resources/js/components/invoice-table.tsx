// resources/js/components/invoice-table.tsx
import React, { useEffect, useState } from 'react';
import DataTable from 'datatables.net-react';
import 'datatables.net-dt';
import apiClient from '@/components/api.tsx';
import DT from 'datatables.net';

export function InvoiceTable() {
    DataTable.use(DT);

    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await apiClient.get('/invoices');
                setInvoices(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching Invoices:", error);
                setLoading(false);
            }
        };
        fetchInvoices();
    }, []);

    const columns = [
        { title: 'ID', data: 'id' },
        { title: 'Name', data: 'customer_name' },
        { title: 'Due', data: 'due_date' },
        { title: 'Paid', data: 'paid' },
        // { title: 'Actions', data: 'action' },
        {
            title: 'Actions',
            data: null,
            render: function (data, type, row) {
                return `
                    <button class="btn btn-sm btn-info edit-btn" data-id="${row.id}">Edit</button>
                    <button class="btn btn-sm btn-danger delete-btn" data-id="${row.id}">Delete</button>
                `;
            }
        }
    ];

    if (loading) {
        return <div>Loading Invoices...</div>;
    }

    return (
        <DataTable
            columns={columns}
            data={invoices}
            options={{
                    paging: true,
                    searching: true,
                }}
        />
    );
}