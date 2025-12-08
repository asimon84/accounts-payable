import React, { useState, useEffect } from 'react';
import apiClient from '@/components/api.tsx';
import '../../css/report-summary.css';

export function ReportSummary() {
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

    if (loading) return <div id="report-summary-loading">Loading Invoice...</div>;

    if (error) return <p id="report-summary-error">Error: {error.message}</p>;

    return (
        <div id="report-summary-container">
            <table id="report-summary-table">
                <tr>
                    <td class="td-heading">Total Invoices:</td>
                    <td class="td-value">{ count }</td>
                    <td class="td-heading">Invoices Paid:</td>
                    <td class="td-value">{ paid }</td>
                    <td class="td-heading">Invoices Unpaid:</td>
                    <td class="td-value">{ unpaid }</td>
                    <td class="td-heading">Outstanding:</td>
                    <td class="td-value">${ amount }</td>
                </tr>
            </table>
        </div>
    );
}