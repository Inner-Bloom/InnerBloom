import React from "react";
import Form from "./LogForm";
import "./App.css";

function App() {
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
        const promise = fetch("http://localhost:8000/users/TestUser/logs", {
            method: "POST",
            headers: {
                authorization:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzMwOTQ4OTAzLCJleHAiOjE3MzEwMzUzMDN9.k8kcmSaBxXkdMma4-PpUX8hlMaod2ajVfNt19ct0idI",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(logData)
        });
        return promise;
    }

    function getUserToken() {
        const promise = fetch("http://localhost:8000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: "TestUser",
                pwd: "123"
            })
        });
        return promise;
    }

    return (
        <div>
            <Form onSubmit={handleSubmit} onBack={handleBack} />
        </div>
    );
}

export default App;
