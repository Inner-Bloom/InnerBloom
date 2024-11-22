import React, { useEffect, useState } from "react";

const Analytics = () => {
    const [graph, setGraph] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8000/analytics")
            .then((response) => {
                console.log("Response:", response);
                return response.text();
            })
            .then((data) => {
                console.log("Data:", data);
                setGraph(data);
            })
            .catch((error) => {
                console.error("There was an error fetching the graph!", error);
            });
    }, []);

    return (
        <div>
            <h1>Analytics Page</h1>
            {graph ? (
                <div dangerouslySetInnerHTML={{ __html: graph }} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Analytics;
