import React from "react";

const Support = () => {
    return (
        <div
            style={{
                backgroundColor: "#eee6db",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
                width: "100%",
                padding: 200,
                fontFamily: "Source Sans 3"
            }}>
            <div
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    maxWidth: "800px",
                    margin: "0 auto",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    lineHeight: "1.6",
                    textAlign: "center"
                }}>
                <header style={{ marginBottom: "40px" }}>
                    <h1 style={{ fontSize: "2.5em" }}>Support</h1>
                    <p style={{ fontSize: "1.2em" }}>
                        We're here to help you on your journey
                    </p>
                </header>

                <section style={{ marginBottom: "30px" }}>
                    <h2 style={{ fontSize: "1.8em", marginBottom: "10px" }}>
                        How Can We Help You?
                    </h2>
                    <p>
                        Whether you need assistance navigating the app,
                        understanding its features, or resolving an issue, our
                        support team is here to guide you every step of the way.
                    </p>
                </section>

                <section style={{ marginBottom: "30px" }}>
                    <h2 style={{ fontSize: "1.8em", marginBottom: "10px" }}>
                        Frequently Asked Questions
                    </h2>
                    <ul
                        style={{
                            listStyleType: "circle",
                            margin: "15px auto",
                            textAlign: "left",
                            maxWidth: "400px"
                        }}>
                        <li>
                            <strong>How do I track my daily mood?</strong>
                            <p>
                                You can track your daily mood using the
                                "Check-In" feature on the home page. Simply
                                select the emotions you're feeling and add any
                                relevant notes or details.
                            </p>
                        </li>
                        <li>
                            <strong>How can I reset my password?</strong>
                            <p>
                                If you've forgotten your password, click on the
                                "Forgot Password" link on the login page. Follow
                                the instructions to reset your password via
                                email.
                            </p>
                        </li>
                        <li>
                            <strong>
                                How do I view my previous wellness logs?
                            </strong>
                            <p>
                                To view your previous wellness logs, go to the
                                "History" section in the app. Here, you can
                                review all your past entries, including mood,
                                sleep, and activity logs.
                            </p>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default Support;
