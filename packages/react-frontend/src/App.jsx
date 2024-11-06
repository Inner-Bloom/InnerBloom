import React from 'react';
import Form from './LogForm';
import './App.css';

function App() {
  const handleSubmit = (logData) => {
    // You can handle pushing/fetching data here
    console.log('Mood Log:', logData); // Or make an API request
  };

  const handleBack = () => {
    console.log('Going back!');
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} onBack={handleBack} />
    </div>
  );
}

export default App;
