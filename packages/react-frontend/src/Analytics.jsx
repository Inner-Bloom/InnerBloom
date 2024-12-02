import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Analytics = () => {
    const chartRef1 = useRef(null);
    const chartRef2 = useRef(null);
    const chartRef3 = useRef(null);
    const chartInstanceRef1 = useRef(null);
    const chartInstanceRef2 = useRef(null);
    const chartInstanceRef3 = useRef(null);
    const savedCreds = JSON.parse(localStorage.getItem("userCreds"));
    const user = savedCreds.username;

    useEffect(() => {
        const displayData = (
            userData,
            chartRef,
            chartInstanceRef,
            chartType,
            labelAttribute
        ) => {
            const ctx = chartRef.current.getContext("2d");
            console.log("Data:", userData);

            // Destroy the previous chart instance if it exists
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            // Format the time to only include year, month, and day
            const formattedData = userData.map((row) => ({
                ...row,
                time: new Date(row.time).toISOString().split("T")[0]
            }));

            let labels, data;
            if (chartType === "doughnut") {
                // Count the occurrences of each mood
                const moodCounts = formattedData.reduce((acc, row) => {
                    acc[row.mood] = (acc[row.mood] || 0) + 1;
                    return acc;
                }, {});
                labels = Object.keys(moodCounts);
                data = Object.values(moodCounts);
            } else {
                labels = formattedData.map((row) => row[labelAttribute]);
                data = formattedData.map((row) => row.sleep);
            }

            // Create a new chart instance
            chartInstanceRef.current = new Chart(ctx, {
                type: chartType, // Use the chartType parameter
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label:
                                chartType === "doughnut"
                                    ? "Mood Distribution"
                                    : "Hours of Sleep",
                            data: data,
                            backgroundColor:
                                chartType === "doughnut"
                                    ? [
                                          "rgba(255, 99, 132, 0.2)",
                                          "rgba(54, 162, 235, 0.2)",
                                          "rgba(255, 206, 86, 0.2)",
                                          "rgba(75, 192, 192, 0.2)",
                                          "rgba(153, 102, 255, 0.2)",
                                          "rgba(255, 159, 64, 0.2)"
                                      ]
                                    : "rgba(75, 192, 192, 0.2)",
                            borderColor:
                                chartType === "doughnut"
                                    ? [
                                          "rgba(255, 99, 132, 1)",
                                          "rgba(54, 162, 235, 1)",
                                          "rgba(255, 206, 86, 1)",
                                          "rgba(75, 192, 192, 1)",
                                          "rgba(153, 102, 255, 1)",
                                          "rgba(255, 159, 64, 1)"
                                      ]
                                    : "rgba(75, 192, 192, 1)",
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    scales:
                        chartType !== "doughnut"
                            ? {
                                  y: {
                                      beginAtZero: true
                                  }
                              }
                            : {},
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        };

        const fetchUserLogs = async () => {
            try {
                const test_url = `/src/sample_data/Mood_and_Sleep_Data.json`; // might be used for demo
                const user_url = `http://localhost:8000/users/${user}/logs`;
                const response = await fetch(test_url); // Use the user_url for deployment
                if (response.ok) {
                    const jsonData = await response.json();
                    return jsonData;
                } else {
                    console.error("Network response was not ok");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const getUserData = async () => {
            const userData = await fetchUserLogs();
            console.log("Data: ", userData);
            if (userData) {
                displayData(
                    userData,
                    chartRef1,
                    chartInstanceRef1,
                    "bar",
                    "time"
                );
                displayData(
                    userData,
                    chartRef2,
                    chartInstanceRef2,
                    "line",
                    "time"
                );
                displayData(
                    userData,
                    chartRef3,
                    chartInstanceRef3,
                    "doughnut",
                    "mood"
                );
            }
        };

        getUserData();

        // Cleanup function to destroy the charts on unmount
        return () => {
            if (chartInstanceRef1.current) {
                chartInstanceRef1.current.destroy();
            }
            if (chartInstanceRef2.current) {
                chartInstanceRef2.current.destroy();
            }
            if (chartInstanceRef3.current) {
                chartInstanceRef3.current.destroy();
            }
        };
    }, [user]);

    return (
        <div style={{ width: 400, height: 400 }}>
            <h1>Analytics</h1>
            <canvas ref={chartRef1}></canvas>
            <canvas ref={chartRef2}></canvas>
            <canvas ref={chartRef3}></canvas>
        </div>
    );
};

export default Analytics;
