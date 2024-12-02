import { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import React from "react";
import Form from "./LogForm";
import "./App.css";
import Login from "./login";
import LogCalendar from "./LogCalendar";
import Navbar from "./Navbar";

import About from "./About";
import Support from "./Support";
import flower from "./assets/botanical-flowers.png";
import Analytics from "./Analytics";

const API_PATH =
    "https://innnerbloom-api-geajb0eqfnezcjef.westus3-01.azurewebsites.net"; //Enable For Remote Backend
//const API_PATH = "http://localhost:8000" //Enable For Local Backend

function App() {
    const INVALID_TOKEN = "INVALID_TOKEN";
    const [token, setToken] = useState(INVALID_TOKEN);
    const [message, setMessage] = useState("");
    //const [userCreds, setUserCreds] = useState(null);

    useEffect(() => {
        console.log("Current token:", token);
        console.log("Is logged in:", token !== INVALID_TOKEN);
    }, [token]);

    useEffect(() => {
        if (token && token !== INVALID_TOKEN) {
            console.log("Token updated:", token);
            // Perform any action dependent on the token here
        }
    }, [token]);

    const AuthWrapper = ({ children }) => {
        if (localStorage.getItem("authToken") === INVALID_TOKEN) {
            return <Navigate to="/login" replace />;
        }
        return <>{children}</>;
    };

    const handleLogout = () => {
        setToken(INVALID_TOKEN);
        localStorage.setItem("authToken", "INVALID_TOKEN");
        localStorage.removeItem("userCreds");
        setMessage("Logged out successfully.");
        window.location.href = "/"; // Redirect to the homepage
    };

    function fetchDay(date) {
        const savedCreds = JSON.parse(localStorage.getItem("userCreds"));
        const url = `${API_PATH}/users/${savedCreds.username}/logs?day=${encodeURIComponent(date)}`;
        console.log("Full URL:", url);

        console.log("Fetching logs for date:", date); // Use the correct variable name here

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
            .then((data) => {
                console.log("Response data:", data); // Log full response
                return data;
            })
            .catch((error) => {
                console.error("Error fetching day logs:", error);
            });
    }

    async function loginUser(creds) {
        const promise = fetch(`${API_PATH}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(creds)
        })
            .then(async (response) => {
                if (response.status === 200) {
                    const payload = await response.json();
                    setToken(payload.token); // Set the token in state
                    localStorage.setItem("authToken", payload.token); // Save token to localStorage
                    localStorage.setItem("userCreds", JSON.stringify(creds));

                    setMessage(`Login successful; auth token saved`);
                    window.location.href = "/";
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
        const promise = fetch(`${API_PATH}/signup`, {
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
        const promise = fetch(`${API_PATH}/users/${savedCreds.username}/logs`, {
            method: "POST",
            headers: addAuthHeader({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(logData)
        });
        return promise;
    }

    function addAuthHeader(otherHeaders = {}) {
        const storedToken = localStorage.getItem("authToken");
        console.log("authy", storedToken);
        if (storedToken === INVALID_TOKEN) {
            return otherHeaders;
        } else {
            console.log("here");
            return {
                ...otherHeaders,
                authorization: storedToken
            };
        }
    }

    return (
        <Router>
            <Navbar
                isLoggedIn={localStorage.getItem("authToken") !== INVALID_TOKEN}
                onLogout={handleLogout}
            />
            <div className="app">
                <Routes>
                    <Route
                        path="login"
                        element={<Login handleSubmit={loginUser} />}
                    />
                    <Route
                        path="/signup"
                        element={
                            <Login
                                handleSubmit={signupUser}
                                buttonLabel="Sign Up"
                            />
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <AuthWrapper>
                                <div className="main-screen">
                                    <h1>Welcome to Inner Bloom</h1>
                                    <button
                                        className="checkin-button"
                                        onClick={() =>
                                            (window.location.href = "/checkin")
                                        }>
                                        Check-In
                                    </button>
                                    {/*<img src={flower} className = "flower"/>*/}
                                    {/*<button
                                        className="calendar-button"
                                        onClick={() =>
                                            (window.location.href = "/calendar")
                                        }>
                                        Calendar
                                    </button>*/}
                                </div>
                            </AuthWrapper>
                        }
                    />
                    <Route
                        path="/checkin"
                        element={
                            <Form onSubmit={handleSubmit} onBack={handleBack} />
                            /*<EmotionWheel />*/
                        }
                    />
                    <Route
                        path="/calendar"
                        element={<LogCalendar fetchDay={fetchDay} />}
                    />

                    <Route path="/about" element={<About />}></Route>
                    <Route path="/support" element={<Support />}></Route>
                    <Route path="/analytics" element={<Analytics />}></Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
