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

                const data: ChartData = response;

                c3.generate({
                    bindto: chartRef.current,
                    data: {
                        x: 'dates',
                        columns: data,
                        type: 'line'
                    },
                    axis: {
                        x: {
                            type: 'timeseries',
                            tick: {
                                format: '%Y-%m-%d'
                            }
                        },
                        y: {
                            min: 0,
                            padding: {
                                bottom: 0
                            }
                        }
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