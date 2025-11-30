import React, { useState, useEffect } from 'react';
import apiClient from '@/components/api.tsx';

export function ReportSummary() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    try {
        await apiClient.get(`/reports/summary`);
        setLoading(false);
    } catch (err) {
        setError(err);
        console.log('Error loading report.');
        setLoading(false);
    }

    if (loading) {
        return <div>Loading Invoice...</div>;
    }

    if (error) return <p>Error: {error.message}</p>;

    return (
        // <p><strong>Invoices Count: </strong>{ count }</p>
        // <p><strong>Paid / Unpaid: </strong>{ paid } / { unpaid }</p>
        // <p><strong>Outstanding: </strong>${ amount }</p>
    );
}