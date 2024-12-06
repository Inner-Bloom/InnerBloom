import { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import PropTypes from "prop-types";
import Form from "./LogForm";
import "./App.css";
import Login from "./login";
import LogCalendar from "./LogCalendar";
import Navbar from "./Navbar";

import About from "./About";
import Support from "./Support";
import flower_anxious_cutout from "./assets/botanical-flowers-anxious-cutout.png";
import flower_sad_cutout from "./assets/botanical-flowers-sad-cutout.png";
import flower_happy_cutout from "./assets/botanical-flowers-happy-cutout.png";
import flower_calm_cutout from "./assets/botanical-flowers-calm-cutout.png";
import flower_stem from "./assets/botanical-flowers-stem.png"
import Analytics from "./Analytics";


const API_PATH = "https://innnerbloom-api-geajb0eqfnezcjef.westus3-01.azurewebsites.net"; //Enable For Remote Backend
// const API_PATH = "http://localhost:8000"; //Enable For Local Backend

function App() {
    const INVALID_TOKEN = "INVALID_TOKEN";
    const [token, setToken] = useState(INVALID_TOKEN);
    const [message, setMessage] = useState("");
    const [signupError, setSignupError] = useState("");
    const [isError, setIsError] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

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

    AuthWrapper.propTypes = {
        children: PropTypes.node.isRequired
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
                    setIsError(false);
                    setMessage(`Login successful!`);
                    window.location.href = "/";
                } else {
                    setIsError(true);
                    setMessage(
                        `Login Error: wrong username or password`
                    );
                }
            })
            .catch(() => {
                setIsError(true);
                setMessage(`Login Error: wrong username or password`);
            });

        return promise;
    }

    async function signupUser(creds) {
        const promise = fetch(`${API_PATH}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(creds)
        })
            .then(async (response) => {
                if (response.status === 201) {
                    const payload = await response.json();
                    setIsError(false);
                    localStorage.setItem("authToken", payload.token); // Save token to localStorage
                    localStorage.setItem("userCreds", JSON.stringify(creds));
                    setSignupError(
                        `Signup successful for user: ${creds.username}`
                    );
                    window.location.href = "/";
                } else {
                    setIsError(true);
                    setSignupError(
                        `Signup Error: username already exists.`
                    );
                }
            })
            .catch((error) => {
                setIsError(true);
                setSignupError(`Signup Error: ${error}`);
            });

        return promise;
    }

    const handleSubmit = (logData) => {
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
            setIsVisible(true)
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

    const images = [flower_anxious_cutout, flower_sad_cutout, flower_happy_cutout, flower_calm_cutout]

    const Flowers = () => {
        const [currentIndex, setCurrentIndex] = useState(0);
        const [fadeClass, setFadeClass] = useState("fade-in");
    
        useEffect(() => {
            const intervalId = setInterval(() => {
                setFadeClass("fade-out"); // Trigger fade-out
                setTimeout(() => {
                    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
                    setFadeClass("fade-in"); // Trigger fade-in
                }, 1000); // Match duration of fade-out
            }, 5000);
    
            return () => clearInterval(intervalId);
        }, []);
    
        return <div> 
        <img src={flower_stem} className="flower"></img>
        <img src={flower_stem} className="flower2"></img>
        <img src={images[currentIndex]} alt="flower" className={`flower ${fadeClass}`} />
        <img src={images[currentIndex]} alt="flower" className={`flower2 ${fadeClass}`} />
        </div>
        ;
    };

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
                        element={
                            <Login
                                handleSubmit={loginUser} 
                                errorMessage={message}
                                error={isError}
                            />
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <Login
                                handleSubmit={signupUser}
                                buttonLabel="Sign Up"
                                errorMessage={signupError}
                                error={isError}
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
                                    <Flowers />
                                    {/* <img src={flower} className = "flower"/> */}
                                    {/* <img src={flower_anxious} className = "flower"/> */}
                                    
                                    {/*<button
                                        className="calendar-button"
                                        onClick={() =>
                                            (window.location.href = "/calendar")
                                        }>
                                        Calendar
                                    </button>*/}
                                    {/* Display the message below the action (button) */}
                                    {message && (
                                        <div className="action-message">
                                            {message}
                                        </div>
                                    )}
                                    {isVisible && (
                                        <div id = "hideMe" className="check-in-complete"> 
                                        Check-In Completed!
                                        </div>
                                    )}
                                </div>
                                {/* <div> 
                                    <img src={images[currentIndex]} className = "flower"/>
                                    </div> */}
                            </AuthWrapper>
                        }
                    />
                    <Route
                        path="/checkin"
                        element={
                            <Form onSubmit={handleSubmit} onBack={handleBack} />
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
