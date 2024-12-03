import React, { useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";
import { useNavigate } from "react-router-dom";

//fetchday is a function passed as a prop to LogCalendar component
const LogCalendar = ({ fetchDay }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [logData, setLogData] = useState([]);
    const navigate = useNavigate();

    const handleDateClick = async (date) => {
        console.log("Testing date click:", date);

        setSelectedDate(date); // Update selected date
        const month = date.getMonth() + 1; // getMonth() returns 0-based month, so add 1
        const day = date.getDate();
        const year = date.getFullYear();
        const formattedDate = `${month}/${day}/${year}`;

        console.log("Fetching logs for date:", formattedDate);
        try {
            const data = await fetchDay(formattedDate); // Fetch log data for the selected date
            console.log("Fetched logs:", data);
            setLogData(data); // Save fetched log data
        } catch (error) {
            console.error("Error fetching logs:", error);
            setLogData([]); // Handle errors gracefully by setting an empty array
        }
    };

    const renderLogData = () => {
        if (!logData || logData.length === 0) {
            return <p className="no-logs">No logs found for this date.</p>;
        }

        return (
            <div className="log-data">
                <h2>Logs for {selectedDate.toDateString()}</h2>
                {logData.map((log, index) => (
                    <div key={index} className="log-entry">
                        <p>
                            <strong>Mood:</strong> {log.mood || "Not provided"}
                        </p>
                        <p>
                            <strong>Slept:</strong>{" "}
                            {log.sleep
                                ? `${Math.round(log.sleep * 100) / 100} hours`
                                : "Not provided"}
                        </p>
                        <p>
                            <strong>Times Eaten:</strong>{" "}
                            {log.eat ? `${log.eat} meals` : "Not provided"}
                        </p>
                        <p>
                            <strong>Exercise:</strong>{" "}
                            {log.exercise ? "Yes" : "No"}
                        </p>
                        <p>
                            <strong>Who you were with:</strong>{" "}
                            {log.relationships || "Not provided"}
                        </p>
                        <p>
                            <strong>Date:</strong>{" "}
                            {log.time
                                ? new Date(log.time).toLocaleString()
                                : "Not provided"}
                        </p>
                        <hr />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="calendar-container">
            <h1>Log Calendar</h1>
            <Calendar onChange={handleDateClick} value={selectedDate} />
            <p className="calendar-date">
                Selected date: {selectedDate.toDateString()}
            </p>

            {/* Render log data if available */}
            {renderLogData()}

            <button
                className="back-button-calendar"
                onClick={() => navigate("/")}>
                Back
            </button>
        </div>
    );
};

export default LogCalendar;
