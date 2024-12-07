import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./emotionWheel.css";
import flower_anxious_cutout from "./assets/botanical-flowers-anxious-cutout.png";
import flower_sad_cutout from "./assets/botanical-flowers-sad-cutout.png";
import flower_happy_cutout from "./assets/botanical-flowers-happy-cutout.png";
import flower_calm_cutout from "./assets/botanical-flowers-calm-cutout.png";
import flower_multi_cutout from "./assets/botanical-flowers-multi-cutout.png";
import flower_stem from "./assets/botanical-flowers-stem.png";

function Form({ onSubmit }) {
    // Define the emotions and their subemotions within the Form component

    const emotions = [
        {
            label: "Anxious",
            desc: "worried and uneasy about an uncertain outcome",
            flower: <img src={flower_anxious_cutout} className="flower"></img>,
            flower2: <img src={flower_anxious_cutout} className="flower2"></img>
        },
        {
            label: "Calm",
            desc: "feeling free of stress, agitation, and worry",
            flower: <img src={flower_calm_cutout} className="flower"></img>,
            flower2: <img src={flower_calm_cutout} className="flower2"></img>
        },
        {
            label: "Sad",
            desc: "feeling unhappy about something",
            flower: <img src={flower_sad_cutout} className="flower"></img>,
            flower2: <img src={flower_sad_cutout} className="flower2"></img>
        },
        {
            label: "Happy",
            desc: "very pleased and filled with joy",
            flower: <img src={flower_happy_cutout} className="flower"></img>,
            flower2: <img src={flower_happy_cutout} className="flower2"></img>
        }
    ];

    const subEmotions = {
        Happy: [
            {
                label: "Proud",
                desc: "pleased with your own achievements or those of someone close to you"
            },
            { label: "Grateful", desc: "appreciative of something or someone" },
            { label: "Joyful", desc: "feeling pleasure and in high spirits" },
            {
                label: "Content",
                desc: "feeling complete and like you are enough"
            }
        ],
        Calm: [
            { label: "Serene", desc: "calm, peaceful, and untroubled" },
            {
                label: "Satisfied",
                desc: "pleased with what you have or with something you did"
            },
            {
                label: "Relaxed",
                desc: "feeling casual and restful in body and mind"
            },
            { label: "Peaceful", desc: "quiet and calm; free from disturbance" }
        ],
        Sad: [
            {
                label: "Lonely",
                desc: "feeling sad because you are alone or disconnected"
            },
            { label: "Upset", desc: "feeling disturbed or agitated" },
            {
                label: "Hopeless",
                desc: "feel completely defeated and in despair about the future"
            },
            {
                label: "Regretful",
                desc: "feeling bad when you do something that you wish you hadn't"
            }
        ],
        Anxious: [
            { label: "Uneasy", desc: "vague sense that something is wrong" },
            { label: "Nervous", desc: "easily agitated or alarmed" },
            {
                label: "Overwhelmed",
                desc: "feeling like you have been taken over by strong feelings"
            },
            {
                label: "Worried",
                desc: "troubled about actual or potential problems"
            }
        ]
    };

    const [selectedEmotion, setSelectedEmotion] = useState(null);
    const [selectedEmotionObject, setSelectedEmotionObject] = useState(null);
    const [selectedSubEmotion, setSelectedSubEmotion] = useState(null);
    const [hoveredEmotion, setHoveredEmotion] = useState({
        label: null,
        desc: null,
        flower: <img src={flower_multi_cutout} className="flower" />,
        flower2: <img src={flower_multi_cutout} className="flower2" />
    });

    const [showEmotionDesc, setEmotionDesc] = useState(false);
    const [sleepHours, setSleepHours] = useState(8);
    const [sleepMinutes, setSleepMinutes] = useState(0);
    const [meals, setMeals] = useState(3);
    const [exercise, setExercise] = useState(false);
    const [relationship, setRelationship] = useState("By yourself");
    const [isVisible, setIsVisible] = useState(false);

    const handleEmotionClick = (emotion) => {
        setSelectedSubEmotion(null); // Reset subemotion selection
        setSelectedEmotion(emotion.label); // Set the selected emotion
        setSelectedEmotionObject(emotion); // Store the full emotion object
    };

    const handleSubEmotionClick = (subEmotion) => {
        setSelectedSubEmotion(subEmotion); // Set the selected subemotion
        setIsVisible(true); // Show the dialog box after subemotion selection
    };

    const handleMouseEnter = (label, desc, flower, flower2) => {
        setHoveredEmotion({ label, desc, flower, flower2 }); // Store both label, description, flower
        setEmotionDesc(true);
    };

    const handleMouseLeave = () => {
        setHoveredEmotion({
            label: null,
            desc: null,
            flower: <img src={flower_multi_cutout} className="flower" />,
            flower2: <img src={flower_multi_cutout} className="flower2" />
        }); // Reset on mouse leave
        setEmotionDesc(false);
    };

    const handleClosePopup = () => {
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

            <div>
                {selectedEmotionObject
                    ? selectedEmotionObject.flower
                    : hoveredEmotion.flower}
            </div>
            <div>
                {selectedEmotionObject
                    ? selectedEmotionObject.flower2
                    : hoveredEmotion.flower2}
            </div>
            <div>
                <img src={flower_stem} className="flower" />
            </div>
            <div>
                <img src={flower_stem} className="flower2" />
            </div>

            {selectedEmotion ? (
                <div className="sub-emotion-wheel">
                    {subEmotions[selectedEmotion].map((subEmotion, index) => (
                        <button
                            onMouseEnter={() =>
                                handleMouseEnter(
                                    subEmotion.label,
                                    subEmotion.desc,
                                    selectedEmotionObject.flower,
                                    selectedEmotionObject.flower2
                                )
                            }
                            onMouseLeave={handleMouseLeave}
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
                        onClick={() => {
                            setSelectedEmotion(null);
                            setSelectedEmotionObject(null); // Reset the selected emotion object
                        }}>
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
                            onMouseEnter={() =>
                                handleMouseEnter(
                                    emotion.label,
                                    emotion.desc,
                                    emotion.flower,
                                    emotion.flower2
                                )
                            }
                            onMouseLeave={handleMouseLeave}
                            type="button"
                            key={index}
                            className={"emotion-button-" + index}
                            onClick={() => handleEmotionClick(emotion)}>
                            {emotion.label}
                        </button>
                    ))}
                    <div className="cutout"></div>
                    <div className="centered-text-1">How are</div>
                    <div className="centered-text-2">you feeling?</div>
                </div>
            )}

            {/* Emotion description box on hover of Emotion */}
            {showEmotionDesc && (
                <div className="emotion-box-label">
                    <div className={`emotion-label-${hoveredEmotion.label}`}>
                        {" "}
                        {hoveredEmotion.label}{" "}
                    </div>
                    <div className="emotion-desc"> {hoveredEmotion.desc} </div>
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
                            className="close-popup"
                            type="button"
                            onClick={handleClosePopup}>
                            x
                        </button>
                        <div className="sleep-time">
                            <label>How many hours did you sleep?</label>
                            <input
                                data-testid="hour-slider"
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
                                data-testid="min-slider"
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
                                data-testid="meal-counter"
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
                                data-testid="exercise-check"
                                type="checkbox"
                                checked={exercise}
                                onChange={(e) => setExercise(e.target.checked)}
                                className="exercise-checkbox"
                            />
                        </div>

                        <div className="relationship-ln">
                            <label>Who are you with?</label>
                            <select
                                data-testid="relation-dropdown"
                                value={relationship}
                                onChange={(e) =>
                                    setRelationship(e.target.value)
                                }
                                className="relationship-select">
                                <option value="By yourself" name="By yourself">
                                    By yourself
                                </option>
                                <option
                                    value="With co-workers"
                                    name="With co-workers">
                                    With co-workers
                                </option>
                                <option
                                    value="With friends"
                                    name="With friends">
                                    With friends
                                </option>
                                <option value="With family" name="With family">
                                    With family
                                </option>
                            </select>
                        </div>

                        <button className="complete-checkin" type="submit">
                            Complete Check-in
                        </button>
                    </div>
                </div>
            )}
        </form>
    );
}

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default Form;
