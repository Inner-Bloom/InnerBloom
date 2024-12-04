import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./login.css";

function Login(props) {
    const [creds, setCreds] = useState({
        username: "",
        pwd: ""
    });

    
    return (
        <div className="login-container">
            <form className="login-form">
                <h2>{props.buttonLabel === "Sign Up" ? "Sign Up" : "Login"}</h2>

                <input
                    className="inputbox"
                    placeholder="Username"
                    type="text"
                    name="username"
                    id="username"
                    value={creds.username}
                    onChange={handleChange}
                />

                <input
                    className="inputbox"
                    placeholder="Password"
                    type="password"
                    name="pwd"
                    id="password"
                    value={creds.pwd}
                    onChange={handleChange}
                />

                <input
                    type="button"
                    value={props.buttonLabel || "Log In"}
                    onClick={submitForm}
                />

                {props.errorMessage && (
                    <p style={{ color: props.error ? "red" : "green" }}>{props.errorMessage}</p>
                )}


                {props.buttonLabel !== "Sign Up" && (
                    <div className="signup-link">
                        Don&#39;t have an account?{" "}
                        <Link to="/signup">Sign up here</Link>
                    </div>
                )}
            </form>
        </div>
    );

    function handleChange(event) {
        const { name, value } = event.target;
        setCreds((prevCreds) => ({ ...prevCreds, [name]: value }));
    }

    function submitForm() {
        props.handleSubmit(creds);
        setCreds({ username: "", pwd: "" });
    }
}

Login.propTypes = {
    buttonLabel: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired
};

export default Login;
