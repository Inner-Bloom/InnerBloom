import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Analytics = () => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        // Fetch the JSON data
        const fetchData = async () => {
            try {
                const response = await fetch('/src/sample_data/Mood_and_Sleep_Data.json');
                if (response.ok) {
                    const jsonData = await response.json();
                    console.log(jsonData);

                    const ctx = chartRef.current.getContext('2d');
                    console.log(ctx);

                    // Destroy the previous chart instance if it exists
                    if (chartInstanceRef.current) {
                        chartInstanceRef.current.destroy();
                    }

                    // Create a new chart instance
                    chartInstanceRef.current = new Chart(ctx, {
                        type: 'bar', // Change this to 'line', 'doughnut', etc. for different chart types
                        data: {
                            labels: jsonData.map(row => row.date),
                            datasets: [{
                                label: 'Hours of Sleep',
                                data: jsonData.map(row => row.sleep_hours),
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            },
                            responsive: true,
                            maintainAspectRatio: false,
                        }
                    });
                } else {
                    console.error('Network response was not ok');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        // Cleanup function to destroy the chart on unmount
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, []);

    return (
        <div style={{ width: 400, height: 400}}>
            <h1>Analytics</h1>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default Analytics;

/*
Todo: Fetch user data from the backend (api call; json format) and display it in a graph in this component.
1. python script that fetches the data from the database and processes it into a simple to read dataframe
1.a. getLogs(userName, day) function to fetch the logs of a user (modify to return all logs, not just for a specific day)
1.b. getLogs(userName) function to fetch all logs of a user
1.c. parse the json data into a pandas dataframe
2. chart.js to display the dataframe column in a graph
2.a. use pandas dataframe column as the data passed to the chart.js
*/