import { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import React from 'react';
import Form from './LogForm';
import './App.css';
import Login from "./login";
import LogCalendar from './LogCalendar'; 


function App() {
  const INVALID_TOKEN = "INVALID_TOKEN";
  const [token, setToken] = useState(INVALID_TOKEN);
  const [message, setMessage] = useState("");

    function fetchDay(date) {
        const url = `http://localhost:8000/users/${creds.username}/logs?day=${encodeURIComponent(date)}`;

        return fetch(url, {
            method: "GET",
            headers: addAuthHeader({
                "Content-Type": "application/json"
            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .catch((error) => {
                console.error("Error fetching day logs:", error);
            });
    }

    function loginUser(creds) {
        const promise = fetch(`http://localhost:8000/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(creds)
        })
            .then(async (response) => {
                if (response.status === 200) {
                    response.json().then((payload) => setToken(payload.token));
                    //console.log("here",payload.token);
                    localStorage.setItem("userCreds", JSON.stringify(creds));

                    setMessage(`Login successful; auth token saved`);
                    window.location.href = "/checkin";
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
                    response.json().then((payload) => setToken(payload.token));
                    setMessage(
                        `Signup successful for user: ${creds.username}; auth token saved`
                    );
                    window.location.href = "/login";
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
    };

    const handleSubmit = (logData) => {
        console.log("Mood Log:", logData);
        postLog(logData)
            .then((response) => {
                if (response.status === 201) {
                    return response.json();
                } else {
                    throw new Error("Failed to add log data");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleBack = () => {
        console.log("Going back!");
    };

    function postLog(logData) {
        const savedCreds = JSON.parse(localStorage.getItem("userCreds"));

        console.log(savedCreds);
        console.log(token);
        const promise = fetch(
            `http://localhost:8000/users/${savedCreds.username}/logs`,
            {
                method: "POST",
                headers: addAuthHeader({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(logData)
            }
        );
        return promise;
    }

    function addAuthHeader(otherHeaders = {}) {
        if (token === INVALID_TOKEN) {
            return otherHeaders;
        } else {
            return {
                ...otherHeaders,
                Authorization: `Bearer ${token}`
            };
        }
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
              <button className="checkin-button" 
              onClick={() => window.location.href = '/checkin'}>
                Check In
              </button>
              <button
                className="calendar-button"
                onClick={() => (window.location.href = '/calendar')}
              >
                Calendar
              </button>
            </div>
          }
        />
        <Route
          path="/checkin"
          element = {<Form onSubmit={handleSubmit} onBack={handleBack} />}
          
        />
        <Route
            path="/calendar"
            element={<LogCalendar fetchDay={fetchDay}/>}
          />
       
      </Routes>
    
    </div>
  </Router>

  );
}

export default App;
