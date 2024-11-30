import React from "react";
/*
Todo: Fetch user data from the backend (api call; json format) and display it in a graph in this component.
1. python script that fetches the data from the database and processes it into a simple to read dataframe
1.a. getLogs(userName, day) function to fetch the logs of a user (modify to return all logs, not just for a specific day)
1.b. getLogs(userName) function to fetch all logs of a user
1.c. parse the json data into a pandas dataframe
2. chart.js to display the dataframe column in a graph
2.a. use pandas dataframe column as the data passed to the chart.js
*/

const Analytics = () => {
    return (
        <div>
            <h1>Analytics Zamn</h1> 
            <div className="chart">
                <div className="chart_types">
                    <button onClick={() => console.log('line')}>Line</button>
                    <button onClick={() => console.log("Clicked Bars")}>Bars</button>
                    <button onClick={() => console.log('doughnut')}>Doughnut</button>
                    <button onClick={() => console.log('polarArea')}>PolarArea</button>
                    <button onClick={() => console.log('radar')}>Radar</button>
                </div>
                <canvas id="myChart"></canvas>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <script src="script.js"></script>
        </div>
    );
};

export default Analytics;


    // return (
    //     <div
    //         style={{
    //             backgroundColor: "#eee6db",
    //             backgroundSize: "cover",
    //             backgroundPosition: "center",
    //             backgroundRepeat: "no-repeat",
    //             minHeight: "100vh",
    //             width: "100%",
    //             display: "flex",
    //             flexDirection: "column",
    //             alignItems: "center",
    //             justifyContent: "center",
    //             padding: 200,
    //             fontFamily: "Source Sans 3"
    //         }}>
    //         <div
    //             style={{
    //                 backgroundColor: "rgba(255, 255, 255, 0.8)",
    //                 maxWidth: "800px",
    //                 padding: "20px",
    //                 borderRadius: "10px",
    //                 boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    //                 lineHeight: "1.6",
    //                 textAlign: "center"
    //             }}>
    //             <header style={{ marginBottom: "40px" }}>
    //                 <h1 style={{ fontSize: "2.5em" }}>Analytics</h1>
    //                 <p style={{ fontSize: "1.2em" }}>
    //                     Your personal mental health and wellness tracker
    //                 </p>
    //             </header>

    //             <section style={{ marginBottom: "30px" }}>
    //                 <h2 style={{ fontSize: "1.8em", marginBottom: "10px" }}>
    //                     What is Inner Bloom?
    //                 </h2>
    //                 <p>
    //                     Inner Bloom is a wellness tracker designed to help you
    //                     understand and improve your mental health and daily
    //                     habits. Whether you're looking to manage your emotions,
    //                     improve your sleep patterns, or monitor your overall
    //                     well-being, Inner Bloom is here to support you.
    //                 </p>
    //             </section>

    //             <section style={{ marginBottom: "30px" }}>
    //                 <h2 style={{ fontSize: "1.8em", marginBottom: "10px" }}>
    //                     Key Features
    //                 </h2>
    //                 <ul
    //                     style={{
    //                         listStyleType: "circle",
    //                         margin: "15px auto",
    //                         textAlign: "left",
    //                         maxWidth: "400px"
    //                     }}>
    //                     <li>Track your mood, thoughts, and feelings</li>
    //                     <li>
    //                         Monitor your sleeping habits with detailed insights
    //                     </li>
    //                     <li>
    //                         Log daily activities and their impact on your mental
    //                         health
    //                     </li>
    //                     <li>
    //                         Gain awareness of patterns in your emotional and
    //                         physical health
    //                     </li>
    //                 </ul>
    //             </section>

    //             <section>
    //                 <h2 style={{ fontSize: "1.8em", marginBottom: "10px" }}>
    //                     Why Choose Inner Bloom?
    //                 </h2>
    //                 <p>
    //                     Inner Bloom stands out by focusing on both mental health
    //                     and sleeping habits, allowing users to connect the dots
    //                     between their lifestyle choices and their emotional
    //                     well-being. With an easy-to-use interface, it's perfect
    //                     for anyone looking to prioritize their mental health in
    //                     a structured and meaningful way.
    //                 </p>
    //             </section>
    //         </div>
    //     </div>
    // );


// const Analytics = () => {
//     const [graph, setGraph] = useState(null);

//     useEffect(() => {
//         fetch("http://localhost:8000/analytics")
//             .then((response) => {
//                 console.log("Response:", response);
//                 return response.text();
//             })
//             .then((data) => {
//                 console.log("Data:", data);
//                 setGraph(data);
//             })
//             .catch((error) => {
//                 console.error("There was an error fetching the graph!", error);
//             });
//     }, []);

//     return (
//         <div>
//             <h1>Analytics Page</h1>
//             {graph ? (
//                 <div dangerouslySetInnerHTML={{ __html: graph }} />
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// };

// export default Analytics;
