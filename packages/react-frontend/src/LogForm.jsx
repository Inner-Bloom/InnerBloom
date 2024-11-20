import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./emotionWheel.css";

function Form({ onSubmit, onBack }) {
    // Define the emotions and their subemotions within the Form component

    const emotions = [
        { label: "Anxious" },
        { label: "Calm" },
        { label: "Sad" },
        { label: "Happy" }
    ];

    const subEmotions = {
        Happy: [
            { label: "Proud" },
            { label: "Grateful" },
            { label: "Joyful" },
            { label: "Content" }
        ],
        Calm: [
            { label: "Serene" },
            { label: "Satisfied" },
            { label: "Relaxed" },
            { label: "Peaceful" }
        ],
        Sad: [
            { label: "Lonely" },
            { label: "Upset" },
            { label: "Hopeless" },
            { label: "Regretful" }
        ],
        Anxious: [
            { label: "Uneasy" },
            { label: "Nervous" },
            { label: "Overwhelmed" },
            { label: "Worried" }
        ]
    };

    const [selectedEmotion, setSelectedEmotion] = useState(null);
    const [selectedSubEmotion, setSelectedSubEmotion] = useState(null);
    const [sleepHours, setSleepHours] = useState(8);
    const [sleepMinutes, setSleepMinutes] = useState(0);
    const [meals, setMeals] = useState(3);
    const [exercise, setExercise] = useState(false);
    const [relationship, setRelationship] = useState("By yourself");
    const [isVisible, setIsVisible] = useState(false);

    const handleEmotionClick = (emotion) => {
        setSelectedSubEmotion(null); // Reset subemotion selection
        setSelectedEmotion(emotion); // Set the selected emotion
    };

    const handleSubEmotionClick = (subEmotion) => {
        setSelectedSubEmotion(subEmotion); // Set the selected subemotion
        setIsVisible(true); // Show the dialog box after subemotion selection
    };

    const handleCloseOverlay = () => {
        setIsVisible(false);
    };

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        navigate("/");

        const logData = {
            mood: selectedSubEmotion, // Selected subemotion as the mood
            sleep: sleepHours + sleepMinutes / 60, // Total sleep in hours
            eat: meals, // Number of meals
            exercise, // Exercise (boolean)
            relationships: relationship, // Relationship status
            time: new Date() // Current timestamp
        };

        onSubmit(logData); // Call the onSubmit function passed as a prop from parent
        setIsVisible(false); // Hide the dialog after submission
    };

    const currentDate = new Date().toDateString();
    const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    return (
        <form onSubmit={handleSubmit}>
            {/* Button to go back */}
            <button
                type="button"
                className="back-button"
                onClick={() => navigate("/")}>
                Back
            </button>

            {selectedEmotion ? (
                <div className="sub-emotion-wheel">
                    {subEmotions[selectedEmotion].map((subEmotion, index) => (
                        <button
                            type="button"
                            key={index}
                            className={`sub-emotion-button-${index} ${subEmotion.label}`}
                            onClick={() =>
                                handleSubEmotionClick(subEmotion.label)
                            }>
                            {subEmotion.label}
                        </button>
                    ))}
                    <button
                        type="button"
                        className="sub-back-button"
                        onClick={() => setSelectedEmotion(null)}>
                        Back
                    </button>
                    <div className="sub-cutout"></div>
                    <div className="centered-text-1">How are</div>
                    <div className="centered-text-2">you feeling?</div>
                </div>
            ) : (
                <div className="emotion-wheel">
                    <h3>How are you feeling?</h3>
                    {emotions.map((emotion, index) => (
                        <button
                            type="button"
                            key={index}
                            className={"emotion-button-" + index}
                            onClick={() => handleEmotionClick(emotion.label)}>
                            {emotion.label}
                        </button>
                    ))}
                    <div className="cutout"></div>
                    <div className="centered-text-1">How are</div>
                    <div className="centered-text-2">you feeling?</div>
                </div>
            )}

            {/* Dialog box with extra input fields if a subemotion is selected */}
            {isVisible && (
                <div className="overlay">
                    <div className="popup">
                        <h3 className="date-header">
                            {currentDate} | {currentTime}
                        </h3>
                        <button
                            className="close-overlay"
                            type="button"
                            onClick={handleCloseOverlay}>
                            x
                        </button>
                        <div className="sleep-time">
                            <label>How many hours did you sleep?</label>
                            <input
                                type="range"
                                min="1"
                                max="24"
                                value={sleepHours}
                                onChange={(e) =>
                                    setSleepHours(parseInt(e.target.value))
                                }
                                className="sleep-range"
                            />
                            <p>{`Hours of sleep: ${sleepHours} hours`}</p>
                        </div>

                        <div className="sleep-time">
                            <label>Minutes of Sleep (10-min increments):</label>
                            <input
                                type="range"
                                min="0"
                                max="50"
                                step="10"
                                value={sleepMinutes}
                                onChange={(e) =>
                                    setSleepMinutes(parseInt(e.target.value))
                                }
                                className="sleep-range"
                            />
                            <p>{`Total sleep: ${sleepHours} hours ${sleepMinutes} minutes`}</p>
                        </div>

                        <div className="eat-amnt">
                            <label>
                                How much did you eat? (Number of meals):
                            </label>
                            <input
                                type="number"
                                value={meals}
                                onChange={(e) =>
                                    setMeals(
                                        Math.max(0, parseInt(e.target.value))
                                    )
                                }
                                min="0"
                                className="meals-input"
                            />
                        </div>

                        <div className="exercise-amnt">
                            <label>Did you exercise today?</label>
                            <input
                                type="checkbox"
                                checked={exercise}
                                onChange={(e) => setExercise(e.target.checked)}
                                className="exercise-checkbox"
                            />
                        </div>

                        <div className="relationship-ln">
                            <label>Who are you with?</label>
                            <select
                                value={relationship}
                                onChange={(e) =>
                                    setRelationship(e.target.value)
                                }
                                className="relationship-select">
                                <option value="By yourself">By yourself</option>
                                <option value="With co-workers">
                                    With co-workers
                                </option>
                                <option value="With friends">
                                    With friends
                                </option>
                                <option value="With family">With family</option>
                            </select>
                        </div>

                        <button
                            className="complete-checkin"
                            type="submit"
                            onClick={() => navigate("/")}>
                            Complete Check-in
                        </button>
                    </div>
                </div>
            )}
        </form>
    );
}

export default Form;
