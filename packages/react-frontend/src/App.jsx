import { useState } from 'react';
import './App.css';
import EmotionWheel from './EmotionWheel';

function App() {
  const [showMainScreen, setShowMainScreen] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState('');
  const [sleepHours, setSleepHours] = useState(8);
  const [sleepMinutes, setSleepMinutes] = useState(0);
  const [meals, setMeals] = useState(3);
  const [exercise, setExercise] = useState(false);
  const [relationship, setRelationship] = useState('By yourself');


  const handleMainEmotionClick = (emotion) => {
    setSelectedEmotion(emotion);
  };

  const handleSubEmotionClick = () => {
    setIsVisible(true);
  };

  const handleEnter = () => {
    console.log(`Selected Emotion: ${selectedEmotion}`);
    console.log(`Total Sleep: ${sleepHours} hours ${sleepMinutes} minutes`);
    console.log(`Meals: ${meals}`);
    console.log(`Exercise: ${exercise ? "Yes" : "No"}`);
    console.log(`Relationship: ${relationship}`);

    setIsVisible(false);
    setSelectedEmotion('');
  };

  const handleCheckInClick = () => {
    setShowMainScreen(false);
  };

  const handleBackClick = () => {
    setShowMainScreen(true);
    setIsVisible(false); // Hide dialog box if open
    setSelectedEmotion(''); // Reset selected emotion if any
  };

      
  return (
    <div className="app">
      {showMainScreen ? (
        <div className="main-screen">
          <h1>How are you feeling today?</h1>
          <button className="checkin-button" onClick={handleCheckInClick}>
            Check In
          </button>
        </div>
      ) : (
        <div>
          <button className="back-button" onClick={handleBackClick}>
            Back
          </button> 
          <EmotionWheel/>
        </div>
      )}
    </div>
  );
}

export default App;
