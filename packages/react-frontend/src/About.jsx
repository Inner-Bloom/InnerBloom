import React from "react";

const About = () => {
    return (
        <div
            style={{
                backgroundColor: "#eee6db",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 200,
                fontFamily: "Source Sans 3"
            }}>
            <div
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    maxWidth: "800px",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    lineHeight: "1.6",
                    textAlign: "center"
                }}>
                <header style={{ marginBottom: "40px" }}>
                    <h1 style={{ fontSize: "2.5em" }}>About Us</h1>
                    <p style={{ fontSize: "1.2em" }}>
                        Your personal mental health and wellness tracker
                    </p>
                </header>

                <section style={{ marginBottom: "30px" }}>
                    <h2 style={{ fontSize: "1.8em", marginBottom: "10px" }}>
                        What is Inner Bloom?
                    </h2>
                    <p>
                        Inner Bloom is a wellness tracker designed to help you
                        understand and improve your mental health and daily
                        habits. Whether you're looking to manage your emotions,
                        improve your sleep patterns, or monitor your overall
                        well-being, Inner Bloom is here to support you.
                    </p>
                </section>

                <section style={{ marginBottom: "30px" }}>
                    <h2 style={{ fontSize: "1.8em", marginBottom: "10px" }}>
                        Key Features
                    </h2>
                    <ul
                        style={{
                            listStyleType: "circle",
                            margin: "15px auto",
                            textAlign: "left",
                            maxWidth: "400px"
                        }}>
                        <li>Track your mood, thoughts, and feelings</li>
                        <li>
                            Monitor your sleeping habits with detailed insights
                        </li>
                        <li>
                            Log daily activities and their impact on your mental
                            health
                        </li>
                        <li>
                            Gain awareness of patterns in your emotional and
                            physical health
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 style={{ fontSize: "1.8em", marginBottom: "10px" }}>
                        Why Choose Inner Bloom?
                    </h2>
                    <p>
                        Inner Bloom stands out by focusing on both mental health
                        and sleeping habits, allowing users to connect the dots
                        between their lifestyle choices and their emotional
                        well-being. With an easy-to-use interface, it's perfect
                        for anyone looking to prioritize their mental health in
                        a structured and meaningful way.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default About;
