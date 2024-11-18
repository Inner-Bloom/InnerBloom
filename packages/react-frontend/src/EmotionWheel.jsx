import React, { useState } from 'react';
import './emotionWheel.css';

const emotions = [
  { label: 'Anxious'},
  { label: 'Calm'},
  { label: 'Sad'},
  { label: 'Happy'},
];

const subEmotions = {
        Happy: [
          { label: 'Proud' },
          { label: 'Grateful' },
          { label: 'Joyful' },
          { label: 'Content' },
        ],
        Calm: [
          { label: 'Serene' },
          { label: 'Satisfied' },
          { label: 'Relaxed' },
          { label: 'Peaceful' },
        ],
        Sad: [
          { label: 'Lonely' },
          { label: 'Upset' },
          { label: 'Hopeless' },
          { label: 'Regretful' },
        ],
        Anxious: [
          { label: 'Uneasy' },
          { label: 'Nervous' },
          { label: 'Overwhelmed' },
          { label: 'Worried' },
        ],
      };

const EmotionWheel = () => {

        const [selectedEmotion, setSelectedEmotion] = useState(null);
        const [overlayVisible, setOverlayVisible] = useState(false);
        const [currentSubEmotion, setCurrentSubEmotion] = useState(null);

  // Handle emotion click event
  const handleEmotionClick = (emotion) => {
    setSelectedEmotion(emotion);
  };

  const handleSubEmotionClick = (subEmotion) => {
        setCurrentSubEmotion(subEmotion);
        setOverlayVisible(true);
      };

      const handleCloseOverlay = () => {
        setOverlayVisible(false);
        setCurrentSubEmotion(null);
      };

      const [selectedItem_slp, setSelectedItem_slp] 
      = useState('Sleep');

      const [selectedItem_eat, setSelectedItem_eat] 
      = useState('Eat');

      const [selectedItem_exe, setSelectedItem_exe] 
      = useState('Exercise');

      const handleChange_slp = (event) => {
        setSelectedItem_slp(event.target.value);
    };

    const handleChange_eat = (event) => {
        setSelectedItem_eat(event.target.value);
    };

    const handleChange_exe = (event) => {
        setSelectedItem_exe(event.target.value);
    };

    const currentDate = new Date().toDateString();
    const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

      return (
        <div>
        {overlayVisible && (
            <div className="overlay">
              <div className="popup">
                <form>
                <h3 className='date-header'>{currentDate} | {currentTime}</h3>
                  <div>
                    <button className="close-overlay" type="button" onClick={handleCloseOverlay}>
                      x
                    </button>
                    <button className="complete-checkin" type="submit">Complete Check-in</button>
                  </div>
                  <div className="question-1">How long did you sleep for?</div>
                  <div className="question-2">How many times did you eat today?</div>
                  <div className="question-3">Did you exercise today?</div>
                  <div>
            <select className="sleep-time"
                value={selectedItem_slp} onChange={handleChange_slp}>
                <option disabled>Hours</option> 
                <option value="0">
                    0
                </option>
                <option value="1">
                    1
                </option>
                <option value="2">
                    2
                </option>
                <option value="3">
                    3
                </option>
                <option value="4">
                    4
                </option>
                <option value="5">
                    5
                </option>
                <option value="6">
                    6
                </option>
                <option value="7">
                    7
                </option>
                <option value="8">
                    8
                </option>
                <option value="9+">
                    9+
                </option>
            </select>

            <select className="eat-amnt"
                value={selectedItem_eat} onChange={handleChange_eat}>
                <option disabled>Times eaten</option> 
                <option value="0">
                    0
                </option>
                <option value="1">
                    1
                </option>
                <option value="2">
                    2
                </option>
                <option value="3+">
                    3+
                </option>
            </select>

            <select className="exercise-amnt"
                value={selectedItem_exe} onChange={handleChange_exe}>
                <option disabled>Exercised</option> 
                <option value="Yes">
                    Yes
                </option>
                <option value="No">
                    No
                </option>
            </select>

        </div>
                </form>
              </div>
            </div>
          )}

          {selectedEmotion ? (
            <div className="sub-emotion-wheel">
              {subEmotions[selectedEmotion].map((subEmotion, index) => (
                <button
                  key={index}
                  className={`sub-emotion-button-${index} ${subEmotion.label}`}
                  onClick={() => handleSubEmotionClick(subEmotion.label)}
                >
                  {subEmotion.label}
                </button>
              ))}
              <button
                className="sub-back-button"
                onClick={() => setSelectedEmotion(null)}
              >
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
                  key={index}
                  className={'emotion-button-' + index}
                  onClick={() => handleEmotionClick(emotion.label)}
                >
                  {emotion.label}
                </button>
              ))}
              <div className="cutout"></div>
              <div className="centered-text-1">How are</div>
              <div className="centered-text-2">you feeling?</div>
            </div>
          )}
        </div>
      );
    };

export default EmotionWheel;
