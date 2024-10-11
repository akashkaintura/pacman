import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
    const navigate = useNavigate();

    const handlePlayClick = () => {
        navigate('/game');
    };

    return (
        <div className="home-container">
            <img src="/pacman-image.png" alt="Pac-Man" className="pacman-image" />
            <button className="play-button" onClick={handlePlayClick}>
                Play
            </button>
        </div>
    );
};

export default Home;
