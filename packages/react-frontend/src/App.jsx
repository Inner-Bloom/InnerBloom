import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React from 'react';
import Form from './LogForm';
import './App.css';
import Login from "./login";




function App() {
  const [showMainScreen, setShowMainScreen] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [sleepHours, setSleepHours] = useState(8);
  const [sleepMinutes, setSleepMinutes] = useState(0);
  const [meals, setMeals] = useState(3);
  const [exercise, setExercise] = useState(false);
  const [relationship, setRelationship] = useState('By yourself');
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");

  function loginUser(creds) {
    const promise = fetch(`http://localhost:8000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then((response) => {
        if (response.status === 200) {
          response
            .json()
            .then((payload) => setToken(payload.token));
          setMessage(`Login successful; auth token saved`);
        } else {
          setMessage(
            `Login Error ${response.status}: ${response.data}`
          );
        }
      })
      .catch((error) => {
        setMessage(`Login Error: ${error}`);
      });
  
    return promise;
  }
  
  function signupUser(creds) {
    const promise = fetch(`http://localhost:8000/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(creds)
    })
      .then((response) => {
        if (response.status === 201) {
          response
            .json()
            .then((payload) => setToken(payload.token));
          setMessage(
            `Signup successful for user: ${creds.username}; auth token saved`
          );
        } else {
          setMessage(
            `Signup Error ${response.status}: ${response.data}`
          );
        }
      })
      .catch((error) => {
        setMessage(`Signup Error: ${error}`);
      });
  
    return promise;
  }

  const emotions = {
    Happy: ['Joyful', 'Content', 'Grateful', 'Proud'],
    Sad: ['Disappointed', 'Lonely', 'Hopeless', 'Regretful'],
    Calm: ['Peaceful', 'Relaxed', 'Satisfied', 'Serene'],
    Anxious: ['Worried', 'Nervous', 'Uneasy', 'Overwhelmed'],
  };

  const handleMainEmotionClick = (emotion) => {
    setSelectedEmotion(emotion);
  };

  const handleSubEmotionClick = () => {
    setIsVisible(true);
  }

  const handleSubmit = (logData) => {
    console.log('Mood Log:', logData);
    postLog(logData)
    .then((response) => {
      if(response.status === 201) {
        return response.json();
      }
      else {
        throw new Error("Failed to add log data");
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const handleBack = () => {
    console.log('Going back!');
  };

  function postLog(logData) {
    const promise = fetch("http://localhost:8000/users/TestUser/logs", {
      method: "POST",
      headers: {
        "authorization" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzMwOTQ4OTAzLCJleHAiOjE3MzEwMzUzMDN9.k8kcmSaBxXkdMma4-PpUX8hlMaod2ajVfNt19ct0idI",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logData),
    });
    return promise;
  }

  function getUserToken() {
      const promise = fetch("http://localhost:8000/login", {
        method: "POST", 
        headers: {"Content-Type" : "application/json"},
        body : JSON.stringify({
          "username" : "TestUser",
          "pwd" : "123"
        })
      });
      return promise;
    }

  return (
    <Router>
    <div className="app">
      <Routes>
        <Route
          path="login"
          element={<Login handleSubmit={loginUser} />}
        />
        <Route
          path="/signup"
          element={
            <Login handleSubmit={signupUser} buttonLabel="Sign Up" />
          }
        />
        <Route
          path="/"
          element={
            <div className="main-screen">
              <h1>Welcome to Inner Bloom</h1>
              <button className="checkin-button" onClick={() => window.location.href = '/checkin'}>
                Check In
              </button>
            </div>
          }
        />
        <Route
          path="/checkin"
          element={
            <div>
              <div className="centered-text">How are you feeling?</div>
              <div className="emotion-buttons">
                {Object.keys(emotions).map((emotion) => (
                  <button
                    key={emotion}
                    className="emotion-button"
                    onClick={() => handleMainEmotionClick(emotion)}
                  >
                    {emotion}
                  </button>
                ))}
              </div>

              {selectedEmotion && (
                <div className="sub-emotion-buttons">
                  {emotions[selectedEmotion].map((subEmotion) => (
                    <button
                      key={subEmotion}
                      className="sub-emotion-button"
                      onClick={handleSubEmotionClick}
                    >
                      {subEmotion}
                    </button>
                  ))}
                </div>
              )}

              {isVisible && (
                <div className="dialog-box">
                  <div>
                    <label>How many hours did you sleep?</label>
                    <input
                      type="range"
                      min="1"
                      max="24"
                      step="1" // Only whole numbers for hours
                      value={sleepHours}
                      onChange={(e) => setSleepHours(parseInt(e.target.value))}
                      className="sleep-range"
                    />
                    <p>{`Hours of sleep: ${sleepHours} hours`}</p>
                  </div>

                  <div>
                    <label>Hours of Sleep (in minutes, 10-min increments):</label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      step="10"
                      value={sleepMinutes}
                      onChange={(e) => setSleepMinutes(parseInt(e.target.value))}
                      className="sleep-range"
                    />
                    <p>{`Total sleep: ${sleepHours} hours ${sleepMinutes} minutes`}</p>
                  </div>

                  <div>
                    <label>How much did you eat? (Number of meals):</label>
                    <input
                      type="number"
                      value={meals}
                      onChange={(e) => setMeals(Math.max(0, parseInt(e.target.value)))}
                      min="0"
                      className="meals-input"
                    />
                  </div>

                  <div>
                    <label>Did you exercise today?</label>
                    <input
                      type="checkbox"
                      checked={exercise}
                      onChange={(e) => setExercise(e.target.checked)}
                      className="exercise-checkbox"
                    />
                  </div>

                  <div>
                    <label>Relationships:</label>
                    <select
                      value={relationship}
                      onChange={(e) => setRelationship(e.target.value)}
                      className="relationship-select"
                    >
                      <option value="By yourself">By yourself</option>
                      <option value="With co-workers">With co-workers</option>
                      <option value="With friends">With friends</option>
                      <option value="With family">With family</option>
                    </select>
                  </div>

                  <button onClick={handleEnter}>Enter</button>
                </div>
              )}
              
              <button className="back-button" onClick={handleBackClick}>
                Back
              </button>
            </div>
          }
        />
       
      </Routes>
    <div>
      <Form onSubmit={handleSubmit} onBack={handleBack} />
    </div>
    </div>
  </Router>

  );
}

export default App;
