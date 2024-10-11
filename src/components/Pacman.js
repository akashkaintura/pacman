import React from 'react';

const Pacman = ({ position, direction }) => {
    const getRotation = () => {
        switch (direction) {
            case 'up': return 'rotate(270deg)';
            case 'down': return 'rotate(90deg)';
            case 'left': return 'rotate(180deg)';
            case 'right':
            default: return 'rotate(0deg)';
        }
    };

    return (
        <div
            className="pacman"
            style={{
                top: position.y * 20,
                left: position.x * 20,
                transform: getRotation(),
            }}
        >
            <div className="pacman-mouth"></div>
        </div>
    );
};

export default Pacman;
