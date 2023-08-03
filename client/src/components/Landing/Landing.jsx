import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Landing.module.css';
import landingvideo from './landingvideo.mp4';

const Landing = () => {
  return (
      <div className={styles.container}>
      <video className={styles.videoBackground} autoPlay muted loop>
        <source src={landingvideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h1 className={styles.welcome}>WELCOME TO VIDEOGAMES UNIVERSE</h1>
      <Link to="/home">
        <button className={styles.startButton}>Press Start</button>
      </Link>
    </div>
  );
};

export default Landing;