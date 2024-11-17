// LogCalendar.jsx
import React from 'react';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css'; 

const LogCalendar = () => {
  const [value, setValue] = React.useState(new Date());

  return (
    <div className="calendar-container">
      <h1>Log Calendar</h1>
      <Calendar onChange={setValue} value={value} />
      <p>Selected date: {value.toDateString()}</p>
    </div>
  );
};

export default LogCalendar;
