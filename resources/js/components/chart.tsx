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
        const element = chartRef.current;

        const fetchData = async () => {
            try {
                setLoading(true);

                await apiClient.get(`/chart`).then(res => {
                    const data: ChartData = res.data;

                    c3.generate({
                        bindto: element,
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
                });
            } catch (error) {
                setError(error);
                console.error("Error fetching chart data:", error);
                setLoading(false);
            }
        };

        fetchData();

        if (loading) return; //<div id="chart-loading">Loading Chart...</div>;

        if (error) return <p id="chart-error">Error: {error.message}</p>;

        return () => {
            if (element && element.chart) {
                element.chart.destroy();
            }
        };
    }, [error, loading]);

    return <div ref={chartRef}></div>;
};

export default Chart;