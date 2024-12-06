import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "./Analytics.css";


const Analytics = () => {
    const chartRef2 = useRef(null);
    const chartRef3 = useRef(null);
    const chartInstanceRef2 = useRef(null);
    const chartInstanceRef3 = useRef(null);
    const savedCreds = JSON.parse(localStorage.getItem("userCreds"));
    const user = savedCreds.username;
    const INVALID_TOKEN = "INVALID_TOKEN";
    const API_PATH = "https://innnerbloom-api-geajb0eqfnezcjef.westus3-01.azurewebsites.net";
    // const API_PATH = "http://localhost:8000";

    function addAuthHeader(otherHeaders = {}) {
        const storedToken = localStorage.getItem("authToken");
        // console.log("authy", storedToken);
        if (storedToken === INVALID_TOKEN) {
            return otherHeaders;
        } else {
            // console.log("here");
            return {
                ...otherHeaders,
                authorization: storedToken
            };
        }
    }

    const [scope, setScope] = useState("week"); // Default scope is 'week'

    useEffect(() => {
        const displayData = (
            userData,
            chartRef,
            chartInstanceRef,
            chartType,
            labelAttribute
        ) => {
            const ctx = chartRef.current.getContext("2d");
            // console.log("Data:", userData);

            // Destroy the previous chart instance if it exists
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            // Format the time to only include year, month, and day
            const formattedData = userData.map((row) => ({
                ...row,
                time: new Date(row.time).toISOString().split("T")[0]
            }));

            // Filter data based on the selected scope
            const filteredData = formattedData.filter((row) => {
                const rowDate = new Date(row.time);
                rowDate.setDate(rowDate.getDate());
                const currentDate = new Date();
                if (scope === "day") {
                    // not working
                    return (
                        rowDate.toDateString() === currentDate.toDateString()
                    );
                } else if (scope === "week") {
                    const oneWeekAgo = new Date();
                    oneWeekAgo.setDate(currentDate.getDate() - currentDate.getDay());
                    return rowDate >= oneWeekAgo;
                } else if (scope === "month") {
                    const oneMonthAgo = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                    // oneMonthAgo.setMonth(currentDate.getFullYear(), currentDate.getMonth(), 1); // Start of the current month);
                    return rowDate >= oneMonthAgo;
                } else if (scope === "All-Time") {
                    return rowDate;
                }
                return true;
            });
            // console.log("Row Date:", filteredData.toDateString());
            // console.log("Current Date:", currentDate.toDateString());

            let labels, data;
            if (chartType === "doughnut") {
                // Count the occurrences of each mood
                const moodCounts = filteredData.reduce((acc, row) => {
                    acc[row.mood] = (acc[row.mood] || 0) + 1;
                    return acc;
                }, {});
                labels = Object.keys(moodCounts);
                data = Object.values(moodCounts);
            } else {
                // exclude the year from the time
                labels = filteredData.map((row) => {
                    const date = new Date(row[labelAttribute]);
                    date.setDate(date.getDate() - 1);
                    return date.toISOString().split("T")[0].slice(5);
                });
                data = filteredData.map((row) => row.sleep);
            }

            // Calculate the maximum value in the data
            const maxDataValue = Math.max(...data);
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
                                      beginAtZero: true,
                                      max: maxDataValue + 2
                                  }
                              }
                            : {},
                    responsive: true,
                    maintainAspectRatio: false,
                    tension: 0.3,
                    fill: true
                }
            });
        };

        const fetchUserLogs = async () => {
            try {
                const test_url = `/src/sample_data/Mood_and_Sleep_Data.json`; // might be used for demo
                test_url //To pass linting while keepig for demo
                const url = `${API_PATH}/users/${user}/logs`; // Use the user_url for deployment
                // const user_url = `http://localhost:8000/users/${user}/logs`;
                // console.log("URL:", url);
                const headers = addAuthHeader();
                const response = await fetch(url, { headers }); // Use the user_url for deployment
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
            // console.log("Data: ", userData);
            if (userData) {
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
            // if (chartInstanceRef1.current) {
            //     chartInstanceRef1.current.destroy();
            // }
            if (chartInstanceRef2.current) {
                chartInstanceRef2.current.destroy();
            }
            if (chartInstanceRef3.current) {
                chartInstanceRef3.current.destroy();
            }
        };
    }, [user, scope]); // re-run the effect when the user  or scope changes (different user login)

    // note: canvas tags should have a ref instead of id and should never contain styling inside the tag
    return (
        <div>
            <h1>Analytics</h1>
            <div className="button-container">
                <button onClick={() => setScope("day")}>Day</button>
                <button onClick={() => setScope("week")}>Week</button>
                <button onClick={() => setScope("month")}>Month</button>
                <button onClick={() => setScope("All-Time")}>All-Time</button>
            </div>
            <div className="analytics-container">
                <div className="canvas-container">
                    <canvas ref={chartRef2}></canvas>
                </div>
                <div className="canvas-container">
                    <canvas ref={chartRef3}></canvas>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
