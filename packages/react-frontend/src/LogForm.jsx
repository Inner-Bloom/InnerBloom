import React, { useState } from 'react';

function Form({ onSubmit, onBack }) {
  // Define the emotions and their subemotions within the Form component
  const emotions = {
    Happy: ['Excited', 'Joyful', 'Proud', 'Content'],
    Sad: ['Down', 'Depressed', 'Lonely', 'Unhappy'],
    Calm: ['Relaxed', 'Serene', 'Peaceful', 'Balanced'],
    Anxious: ['Nervous', 'Stressed', 'Worried', 'Unsettled'],
  };

  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [selectedSubEmotion, setSelectedSubEmotion] = useState(null);
  const [sleepHours, setSleepHours] = useState(8);
  const [sleepMinutes, setSleepMinutes] = useState(0);
  const [meals, setMeals] = useState(3);
  const [exercise, setExercise] = useState(false);
  const [relationship, setRelationship] = useState('By yourself');
  const [isVisible, setIsVisible] = useState(false);

  const handleEmotionClick = (emotion) => {
    setSelectedSubEmotion(null); // Reset subemotion selection
    setSelectedEmotion(emotion); // Set the selected emotion
  };

  const handleSubEmotionClick = (subEmotion) => {
    setSelectedSubEmotion(subEmotion); // Set the selected subemotion
    setIsVisible(true); // Show the dialog box after subemotion selection
  };

  const handleEnter = (event) => {
    event.preventDefault(); // Prevent default form submission

    const logData = {
      mood: selectedSubEmotion, // Selected subemotion as the mood
      sleep: sleepHours + sleepMinutes / 60, // Total sleep in hours
      eat: meals, // Number of meals
      exercise, // Exercise (boolean)
      relationships: relationship, // Relationship status
      time: new Date(), // Current timestamp
    };

    onSubmit(logData); // Call the onSubmit function passed as a prop from parent
    setIsVisible(false); // Hide the dialog after submission
  };

  return (
    <form onSubmit={handleEnter}>
      <div className="centered-text">How are you feeling?</div>
      
      {/* Display main emotions as buttons */}
      <div className="emotion-buttons">
        {Object.keys(emotions).map((emotion) => (
          <button
            type="button"
            key={emotion}
            className="emotion-button"
            onClick={() => handleEmotionClick(emotion)} // Set selected emotion
          >
            {emotion}
          </button>
        ))}
      </div>

      {/* Display subemotions if an emotion is selected */}
      {selectedEmotion && (
        <div className="sub-emotion-buttons">
          {emotions[selectedEmotion].map((subEmotion) => (
            <button
              type="button"
              key={subEmotion}
              className="sub-emotion-button"
              onClick={() => handleSubEmotionClick(subEmotion)} // Handle subemotion click
            >
              {subEmotion}
            </button>
          ))}
        </div>
      )}

      {/* Dialog box with extra input fields if a subemotion is selected */}
      {isVisible && (
        <div className="dialog-box">
          <div>
            <label>How many hours did you sleep?</label>
            <input
              type="range"
              min="1"
              max="24"
              value={sleepHours}
              onChange={(e) => setSleepHours(parseInt(e.target.value))}
              className="sleep-range"
            />
            <p>{`Hours of sleep: ${sleepHours} hours`}</p>
          </div>

          <div>
            <label>Minutes of Sleep (10-min increments):</label>
            <input
              type="range"
              min="0"
              max="50"
              step="10"
              value={sleepMinutes}
              onChange={(e) => setSleepMinutes(parseInt(e.target.value))}
              className="sleep-range"
            />
            <p>{`Total sleep: ${sleepHours} hours ${sleepMinutes} minutes`}</p>
          </div>

          <div>
            <label>How much did you eat? (Number of meals):</label>
            <input
              type="number"
              value={meals}
              onChange={(e) => setMeals(Math.max(0, parseInt(e.target.value)))}
              min="0"
              className="meals-input"
            />
          </div>

          <div>
            <label>Did you exercise today?</label>
            <input
              type="checkbox"
              checked={exercise}
              onChange={(e) => setExercise(e.target.checked)}
              className="exercise-checkbox"
            />
          </div>

          <div>
            <label>Relationships:</label>
            <select
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="relationship-select"
            >
              <option value="By yourself">By yourself</option>
              <option value="With co-workers">With co-workers</option>
              <option value="With friends">With friends</option>
              <option value="With family">With family</option>
            </select>
          </div>

          <button type="submit">Enter</button>
        </div>
      )}

      {/* Button to go back */}
      <button type="button" className="back-button" onClick={onBack}>
        Back
      </button>
    </form>
  );
}

export default Form;
