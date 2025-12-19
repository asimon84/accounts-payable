import React, { useEffect, useRef } from 'react';
import c3 from 'c3';
import { usePage } from '@inertiajs/react'; // If using Inertia

// Define the type for the API response data
interface ChartData {
    columns: (string | number)[][];
}

const Chart: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Function to fetch data from the Laravel API
        const fetchData = async () => {
            try {
                // Use fetch API to get data from Laravel endpoint
                const response = await fetch('/api/chart');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: ChartData = await response.json();

                // Generate the chart once data is loaded
                c3.generate({
                    bindto: chartRef.current,
                    data: {
                        columns: data.columns,
                        type: 'line' // Example type
                    }
                });

            } catch (error) {
                console.error("Error fetching chart data:", error);
            }
        };

        fetchData();

        // Cleanup function to destroy the chart when component unmounts (optional but good practice)
        return () => {
            // @ts-ignore
            if (chartRef.current && chartRef.current.chart) {
                // @ts-ignore
                chartRef.current.chart.destroy();
            }
        };
    }, []); // Empty dependency array ensures this runs once on mount

    return <div ref={chartRef}></div>;
};

export default Chart;