// Form.jsx
import React, { useState } from 'react';

function Form({ selectedEmotion, emotions, onSubmit, onBack }) {
  const [isVisible, setIsVisible] = useState(false);
  const [sleepHours, setSleepHours] = useState(8);
  const [sleepMinutes, setSleepMinutes] = useState(0);
  const [meals, setMeals] = useState(3);
  const [exercise, setExercise] = useState(false);
  const [relationship, setRelationship] = useState('By yourself');

  const handleSubEmotionClick = () => {
    setIsVisible(true);
  };

  const handleEnter = () => {
    const formData = {
      selectedEmotion,
      sleepHours,
      sleepMinutes,
      meals,
      exercise,
      relationship,
    };
    onSubmit(formData);

    setIsVisible(false);
  };

  return (
    <div>
      <div className="centered-text">How are you feeling?</div>
      <div className="emotion-buttons">
        {Object.keys(emotions).map((emotion) => (
          <button
            key={emotion}
            className="emotion-button"
            onClick={() => handleSubEmotionClick(emotion)}
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

          <button onClick={handleEnter}>Enter</button>
        </div>
      )}
      
      <button className="back-button" onClick={onBack}>
        Back
      </button>
    </div>
  );
}

export default Form;
