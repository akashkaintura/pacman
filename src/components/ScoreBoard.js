import React from 'react';
import '../styles/ScoreBoard.css';

const ScoreBoard = ({ level, lives, score }) => (
    <div className="scoreboard">
        <h2>Level: {level}</h2>
        <h2>Lives: {lives}</h2>
        <h2>Score: {score}</h2>
    </div>
);

export default ScoreBoard;
