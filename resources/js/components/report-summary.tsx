import { useState, useEffect } from 'react';
import apiClient from '@/components/api.tsx';
import '../../css/report-summary.css';

export default function ReportSummary() {
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
                console.log('Error loading report summary.');
                setLoading(false);
            }
        };
        fetchSummary();
    }, []);

    if (loading) return; //<div id="report-summary-loading">Loading Summary...</div>;

    if (error) return <p id="report-summary-error">Error: {error.message}</p>;

    return (
        <div id="report-summary-container">
            <table id="report-summary-table">
                <tbody>
                    <tr>
                        <td className="td-heading">Total Invoices:</td>
                        <td className="td-value">{ count }</td>
                        <td className="td-heading">Invoices Paid:</td>
                        <td className="td-value">{ paid }</td>
                        <td className="td-heading">Invoices Unpaid:</td>
                        <td className="td-value">{ unpaid }</td>
                        <td className="td-heading">Outstanding:</td>
                        <td className="td-value">${ amount }</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}