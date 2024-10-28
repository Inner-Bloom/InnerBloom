import { useState } from 'react';
import './App.css';

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [sleepHours, setSleepHours] = useState(8); // Default sleep hours set to 8
  const [sleepMinutes, setSleepMinutes] = useState(0); // Additional minutes in 10-min increments
  const [meals, setMeals] = useState(3); // Default meals set to 3
  const [exercise, setExercise] = useState(false);
  const [relationship, setRelationship] = useState('By yourself');

  const emotions = {
    Happy: ['Joyful', 'Content', 'Grateful', 'Proud'],
    Sad: ['Disappointed', 'Lonely', 'Hopeless', 'Regretful'],
    Calm: ['Peaceful', 'Relaxed', 'Satisfied', 'Serene'],
    Anxious: ['Worried', 'Nervous', 'Uneasy', 'Overwhelmed'],
  };

  const handleMainEmotionClick = (emotion) => {
    setSelectedEmotion(emotion);
  };

  const handleSubEmotionClick = () => {
    setIsVisible(true);
  };

  const handleEnter = () => {
    // Log the input values
    console.log(`Selected Emotion: ${selectedEmotion}`);
    console.log(`Total Sleep: ${sleepHours} hours ${sleepMinutes} minutes`);
    console.log(`Meals: ${meals}`);
    console.log(`Exercise: ${exercise ? "Yes" : "No"}`);
    console.log(`Relationship: ${relationship}`);

    // Close the dialog box after logging the values
    setIsVisible(false);
    setSelectedEmotion(''); // Reset selected emotion
  };

  return (
    <div className="app">
      <div className="emotion-buttons">
        {Object.keys(emotions).map((emotion) => (
          <button
            key={emotion}
            className="emotion-button"
            onClick={() => handleMainEmotionClick(emotion)}
          >
            {emotion}
          </button>
        ))}
      </div>

      {selectedEmotion && (
        <div className="sub-emotion-buttons">
          {emotions[selectedEmotion].map((subEmotion) => (
            <button
              key={subEmotion}
              className="sub-emotion-button"
              onClick={handleSubEmotionClick}
            >
              {subEmotion}
            </button>
          ))}
        </div>
      )}

      {isVisible && (
        <div className="dialog-box">
          <div>
            <label>How many hours did you sleep?</label>
            <input
              type="number"
              value={sleepHours}
              onChange={(e) => setSleepHours(Math.min(Math.max(parseFloat(e.target.value), 1), 24))}
              min="1"
              max="24"
              step="0.5"
              className="sleep-input"
            />
          </div>

          <div>
            <label>Hours of Sleep (in minutes, 10-min increments):</label>
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

          <button onClick={handleEnter}>Enter</button>
        </div>
      )}
    </div>
  );
}

export default App;
