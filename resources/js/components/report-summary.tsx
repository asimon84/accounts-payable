import React, { useState, useEffect } from 'react';
import apiClient from '@/components/api.tsx';

export function ReportSummary() {
    const [token, setToken] = useState(null);
    const [xcsrf, setXcsrf] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [paid, setPaid] = useState(0);
    const [unpaid, setUnpaid] = useState(0);
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                await apiClient.get(`/reports/summary`).then(response => {
                    setCount(response.data.count);
                    setPaid(response.data.paid);
                    setUnpaid(response.data.unpaid);
                    setAmount(response.data.amount);
                    setLoading(false);
                });
            } catch (err) {
                setError(err);
                console.log('Error loading report.');
                setLoading(false);
            }
        };
        fetchSummary();
    }, []);

    if (loading) {
        return <div>Loading Invoice...</div>;
    }

    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <table>
                <tr>
                    <td>Invoices Count:</td>
                    <td>{ count }</td>
                </tr>
                <tr>
                    <td>Paid / Unpaid:</td>
                    <td>{ paid } / { unpaid }</td>
                </tr>
                <tr>
                    <td>Outstanding:</td>
                    <td>{ amount }</td>
                </tr>
            </table>
        </div>
    );
}