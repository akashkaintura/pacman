import React, { useState } from 'react';
import GameGrid from './GameGrid';
import ScoreBoard from './ScoreBoard';
import LevelComplete from './LevelComplete';
import gameOverSoundFile from '../assets/sounds/game-over.mp3';
import levelUpSoundFile from '../assets/sounds/pacman_chomp.mp3';

const Game = () => {
    const [level, setLevel] = useState(1);
    const [lives, setLives] = useState(5);
    const [score, setScore] = useState(0);
    const [isLevelComplete, setIsLevelComplete] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);

    const gameOverSound = new Audio(gameOverSoundFile);
    const levelUpSound = new Audio(levelUpSoundFile);

    const handleLevelUp = () => {
        levelUpSound.play();
        setLevel(prevLevel => prevLevel + 1);
        if (level % 25 === 0) {
            setLives(prevLives => prevLives + 1);
        }
        setIsLevelComplete(false);
    };

    const loseLife = () => {
        if (lives > 1) {
            setLives(prevLives => prevLives - 1);
        } else {
            gameOverSound.play();
            setIsGameOver(true);
        }
    };

    const resetGame = () => {
        setLevel(1);
        setLives(5);
        setScore(0);
        setIsLevelComplete(false);
        setIsGameOver(false);
    };

    return (
        <div className="game-container">
            <ScoreBoard level={level} lives={lives} score={score} />
            {isLevelComplete && <LevelComplete onContinue={handleLevelUp} />}
            {isGameOver ? (
                <div className="game-over-screen">
                    <h2>Game Over!</h2>
                    <button onClick={resetGame}>Restart Game</button>
                </div>
            ) : (
                <GameGrid level={level} loseLife={loseLife} setScore={setScore} onLevelComplete={() => setIsLevelComplete(true)} />
            )}
        </div>
    );
};

export default Game;
