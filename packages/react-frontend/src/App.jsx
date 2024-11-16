import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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
    console.log(message);
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
            path="/"
            element={<Navigate to="/login" replace />}
        />
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
          path="/checkin"
          element = {<Form onSubmit={handleSubmit} onBack={handleBack} />}        
        />

       
      </Routes>
    
    </div>
  </Router>

  );
}

export default App;
