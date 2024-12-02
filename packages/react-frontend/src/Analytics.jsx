import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Analytics = () => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const savedCreds = JSON.parse(localStorage.getItem("userCreds"));
    const user = savedCreds.username;

    useEffect(() => {
        // Fetch the JSON data from the backend API
        const displayData = (userData) => {
            const ctx = chartRef.current.getContext('2d');
            console.log(ctx);
            console.log("Data:", userData)

            // Destroy the previous chart instance if it exists
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            // Format the time to only include year, month, and day
            const formattedData = userData.map(row => ({
                ...row,
                time: new Date(row.time).toISOString().split('T')[0]
            }));

            // Create a new chart instance
            chartInstanceRef.current = new Chart(ctx, {
                type: 'line', // Change this to 'line', 'doughnut', etc. for different chart types
                data: {
                    labels: formattedData.map(row => row.time),
                    datasets: [{
                        label: 'Hours of Sleep',
                        data: formattedData.map(row => row.sleep),
                        backgroundColor: 'black', // last digit is opacity
                        borderColor: 'black',
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
        };

        // Fetch all logs from user
        const fetchUserLogs = async () => {
            try {
                const url = `http://localhost:8000/users/${user}/logs`;
                const testurl = "/src/sample_data/Mood_and_Sleep_Data.json";
                const response = await fetch(testurl);
                if (response.ok) {
                    const jsonData = await response.json();
                    // console.log(jsonData);
                    return jsonData;
                } else {
                    console.error('Network response was not ok');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const getUserData = async () => {
            const userData = await fetchUserLogs();
            // console.log(userData);
            if (userData) {
                displayData(userData);
            }
        };

        getUserData();

        // Cleanup function to destroy the chart on unmount
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [user]);

    return (
        <div style={{ width: 400, height: 400 }}>
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