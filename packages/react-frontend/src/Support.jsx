import { useState } from "react";

const Support = () => {
    const [openQuestion, setOpenQuestion] = useState(null);

    const toggleQuestion = (questionIndex) => {
        setOpenQuestion(openQuestion === questionIndex ? null : questionIndex);
    };

    const faqData = [
        {
            question: "How do I track my daily mood?",
            answer: "You can track your daily mood using the 'Check-In' feature on the home page. Simply select the emotions you're feeling and add any relevant notes or details."
        },
        {
            question: "How can I reset my password?",
            answer: "If you have forgotten your password, click on the 'Forgot Password' link on the login page. Follow the instructions to reset your password via email."
        },
        {
            question: "How do I view my previous wellness logs?",
            answer: "To view your previous wellness logs, go to the 'Calendar' section in the app. Here, you can review all your past entries, including mood, sleep, and activity logs."
        },
        {
            question: "How do I delete my account?",
            answer: "To delete your account, please email clngo654@gmail.com with the subject line 'Account Deletion Request.' Make sure to include your registered email address and confirm that you'd like to delete your account. Our support team will process your request and notify you once the deletion is complete."
        }
    ];

    return (
        <div
            style={{
                backgroundColor: "#EEE6DB",
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
                fontFamily: "Source Sans 3",
                color: "#563838"
            }}>
            <div
                style={{
                    backgroundColor: "#EEE6DB",
                    maxWidth: "800px",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 12px 16px #5C4033",
                    lineHeight: "1.6",
                    textAlign: "center"
                }}>
                <header style={{ marginBottom: "40px" }}>
                    <h1 style={{ fontSize: "2.5em" }}>Support</h1>
                    <p style={{ fontSize: "1.2em" }}>
                        We&#39;re here to help you on your journey
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
                    <div
                        style={{
                            textAlign: "left",
                            maxWidth: "400px",
                            margin: "0 auto"
                        }}>
                        {faqData.map((faq, index) => (
                            <div
                                key={index}
                                style={{
                                    marginBottom: "15px",
                                    border: "1px solid #5C4033",
                                    borderRadius: "8px",
                                    padding: "10px",
                                    backgroundColor: "#FFF"
                                }}>
                                <button
                                    onClick={() => toggleQuestion(index)}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        textAlign: "left",
                                        width: "100%",
                                        padding: "10px",
                                        fontSize: "1rem",
                                        fontWeight: "bold",
                                        color: "#563838",
                                        cursor: "pointer",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}>
                                    {faq.question}
                                    <span
                                        style={{
                                            fontSize: "1.2rem",
                                            transform:
                                                openQuestion === index
                                                    ? "rotate(180deg)"
                                                    : "rotate(0deg)",
                                            transition: "transform 0.2s ease"
                                        }}>
                                        ▼
                                    </span>
                                </button>
                                {openQuestion === index && (
                                    <p
                                        style={{
                                            margin: "0",
                                            padding: "10px",
                                            color: "#563838"
                                        }}>
                                        {faq.answer}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Support;
