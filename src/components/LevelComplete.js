import React from 'react';
import '../styles/LevelComplete.css';

const LevelComplete = ({ onContinue }) => (
    <div className="level-complete">
        <h2>Level Complete!</h2>
        <button onClick={onContinue}>Continue to Next Level</button>
    </div>
);

export default LevelComplete;
