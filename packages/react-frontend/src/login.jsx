import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login(props) {
    const [creds, setCreds] = useState({
        username: "",
        pwd: ""
    });

    return (
        <div className="login-container">
            <form className="login-form">
                <h2>{props.buttonLabel === "Sign Up" ? "Sign Up" : "Login"}</h2>

                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={creds.username}
                    onChange={handleChange}
                />

                <label htmlFor="password">Password</label>
                <input
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

                {props.buttonLabel !== "Sign Up" && (
                    <div className="signup-link">
                        Don't have an account?{" "}
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

export default Login;
