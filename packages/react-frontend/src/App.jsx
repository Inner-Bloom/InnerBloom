import { useState } from 'react';
import './App.css';

function App() {
  const [isVisible, setIsVisible] = useState(true);
  const [clicked, setClicked] = useState(false);
 

  const handleClick = () => {
    setIsVisible(false);
    setClicked(true);
  };

  return (
    <div className="app">
      {isVisible && (
        <button
          className='happy-button'
          onClick={handleClick}
        >
          Happy
        </button>
      )}
    </div>
  );
}

export default App;
