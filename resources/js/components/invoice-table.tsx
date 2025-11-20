// resources/js/components/invoice-table.tsx
import React, { useEffect, useState } from 'react';
import DataTable from 'datatables.net-react';
import 'datatables.net-dt';
import axios from 'axios';

export function InvoiceTable() {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    axios.defaults.withCredentials = true;

    async function getCsrfToken() {
        try {
            await axios.get('/sanctum/csrf-cookie');
            console.log('token='+axios.get('/sanctum/csrf-cookie'));
        } catch (error) {
            console.error('Error fetching CSRF cookie:', error);
        }
    }

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                getCsrfToken();
                const response = await axios.get('/api/invoices');
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