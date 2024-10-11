import React, { useState, useEffect } from 'react';
import Pacman from './Pacman';
import Ghost from './Ghost';
import chompSoundFile from '../assets/sounds/chomp.mp3';
import collisionSoundFile from '../assets/sounds/pacman_eatghost.mp3';
import pointSoundFile from '../assets/sounds/pacman_extrapac.mp3';

const GameGrid = ({ level, loseLife, setScore, onLevelComplete }) => {
    // Function to generate random points on the grid
    const generatePoints = () => {
        let pointsArray = [];
        for (let i = 0; i < 10; i++) {
            pointsArray.push({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
        }
        return pointsArray;
    };

    const [pacmanPosition, setPacmanPosition] = useState({ x: 0, y: 0 });
    const [ghosts, setGhosts] = useState([{ x: 5, y: 5 }]);
    const [points, setPoints] = useState(generatePoints()); // Call generatePoints here
    const [direction, setDirection] = useState('right');
    const [isPoweredUp, setIsPoweredUp] = useState(false);

    const chompSound = new Audio(chompSoundFile);
    const collisionSound = new Audio(collisionSoundFile);
    const pointSound = new Audio(pointSoundFile);

    const handleKeyPress = (e) => {
        let newDirection;
        let newPosition = { ...pacmanPosition };

        switch (e.key) {
            case 'ArrowUp':
                newPosition.y -= 1;
                newDirection = 'up';
                break;
            case 'ArrowDown':
                newPosition.y += 1;
                newDirection = 'down';
                break;
            case 'ArrowLeft':
                newPosition.x -= 1;
                newDirection = 'left';
                break;
            case 'ArrowRight':
                newPosition.x += 1;
                newDirection = 'right';
                break;
            default:
                return;
        }
        setPacmanPosition(newPosition);
        setDirection(newDirection);
        chompSound.play();
    };

    const checkCollisions = () => {
        ghosts.forEach((ghost, index) => {
            if (pacmanPosition.x === ghost.x && pacmanPosition.y === ghost.y) {
                if (isPoweredUp) {
                    setGhosts(prevGhosts => prevGhosts.filter((_, i) => i !== index));
                    setScore(prevScore => prevScore + 50);
                } else {
                    collisionSound.play();
                    loseLife();
                }
            }
        });

        points.forEach((point, index) => {
            if (pacmanPosition.x === point.x && pacmanPosition.y === point.y) {
                pointSound.play();
                setScore(prevScore => prevScore + 10);
                setPoints(prevPoints => prevPoints.filter((_, i) => i !== index));
            }
        });

        if (points.length === 0) {
            onLevelComplete();
        }
    };

    const moveGhosts = () => {
        setGhosts(ghosts.map(ghost => {
            const direction = Math.floor(Math.random() * 4);
            let newGhostPos = { ...ghost };
            switch (direction) {
                case 0: newGhostPos.y -= 1; break; // Up
                case 1: newGhostPos.y += 1; break; // Down
                case 2: newGhostPos.x -= 1; break; // Left
                case 3: newGhostPos.x += 1; break; // Right
                default: break;
            }
            return newGhostPos;
        }));
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [pacmanPosition]);

    useEffect(() => {
        checkCollisions();
    }, [pacmanPosition, ghosts]);

    useEffect(() => {
        console.log("Pac-Man Position:", pacmanPosition);
        console.log("Ghost Position:", ghosts);
        const ghostSpeed = 500 - level * 10;  // Increase ghost speed with each level
        const ghostInterval = setInterval(moveGhosts, Math.max(ghostSpeed, 100));

        if (level > 1 && level % 3 === 0 && ghosts.length < level) {
            setGhosts(prevGhosts => [...prevGhosts, { x: 5, y: 5 }]);  // Add a ghost every 3 levels
        }

        return () => clearInterval(ghostInterval);
    }, [level, ghosts]);

    return (
        <div className="game-grid" tabIndex="0">
            <Pacman position={pacmanPosition} direction={direction} />
            {ghosts.map((ghost, index) => (
                <Ghost key={index} position={ghost} />
            ))}
            {points.map((point, index) => (
                <div key={index} className="point" style={{ top: point.y * 20, left: point.x * 20 }} />
            ))}
        </div>
    );
};

export default GameGrid;
