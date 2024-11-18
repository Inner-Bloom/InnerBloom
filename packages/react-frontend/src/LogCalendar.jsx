import React, { useState } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";

const LogCalendar = ({ fetchDay }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [logData, setLogData] = useState(null);
    const navigate = useNavigate();

    const handleDateClick = async (date) => {
        setSelectedDate(date); // Update the selected date
        const formattedDate = date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
        try {
            const data = await fetchDay(formattedDate);
            setLogData(data);
        } catch (error) {
            console.error("Error fetching logs:", error);
            setLogData(null);
        }
    };

    return (
        <div className="calendar-container">
            <h1>Log Calendar</h1>
            <Calendar onChange={handleDateClick} value={selectedDate} />
            <p>Selected date: {selectedDate.toDateString()}</p>

            {logData && (
                <div className="log-data">
                    <h2>Logs for {selectedDate.toDateString()}</h2>
                    <ul>
                        {logData.map((log, index) => (
                            <li key={index}>
                                <strong>{log.title}:</strong> {log.description}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <button className="back-button" onClick={() => navigate("/")}>
                Back to Main Page
            </button>
        </div>
    );
};

export default LogCalendar;
