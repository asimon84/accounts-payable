import React, { useState, useEffect, useRef } from 'react';
import c3 from 'c3';
import apiClient from '@/components/api.tsx';

interface ChartData {
    columns: (string | number)[][];
}

const Chart: React.FC = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get(`/chart`).then(res => {
                    console.log(res);
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data: ChartData = await response.json();

                c3.generate({
                    bindto: chartRef.current,
                    data: {
                        columns: data.columns,
                        type: 'line' // Example type
                    }
                });

                setLoading(false);
            } catch (error) {
                setError(error);
                console.error("Error fetching chart data:", error);
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            // @ts-ignore
            if (chartRef.current && chartRef.current.chart) {
                // @ts-ignore
                chartRef.current.chart.destroy();
            }
        };
    }, []);

    return <div ref={chartRef}></div>;
};

export default Chart;