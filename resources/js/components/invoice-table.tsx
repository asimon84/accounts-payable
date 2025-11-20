// resources/js/components/InvoiceTable.tsx
import React, { useEffect, useState } from 'react';
import DataTable from 'datatables.net-react';
import 'datatables.net-dt';
import axios from 'axios';

export default function InvoiceTable() {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axios.get('/api/invoices'); // Adjust API endpoint as needed
                setInvoices(response.data.data); // Assuming paginated data is in 'data' key
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
        { title: 'Name', data: 'name' },
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