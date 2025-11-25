// resources/js/components/invoice-table.tsx
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import 'datatables.net-dt';
import apiClient from '@/components/api.tsx';

export function InvoiceTable() {
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
        { name: 'ID', selector: row => row.id, sortable: true },
        { name: 'Name', selector: row => row.customer_name, sortable: true },
        { name: 'Due', selector: row => row.due_date, sortable: true },
        { name: 'Paid', selector: row => row.paid, sortable: true },
    ];

    if (loading) {
        return <div>Loading Invoices...</div>;
    }

    const handleRowClick = (row) => {
        // console.log('/invoice/'+row.id);
        window.location.href = '/invoice/'+row.id;
    };

    return (
        <DataTable
            columns={columns}
            data={invoices}
            options={{
                    paging: true,
                    searching: true,
                }}
            onRowClicked={handleRowClick}
        />
    );
}