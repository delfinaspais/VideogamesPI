import React from "react";
import styles from './Detail.module.css';

function Detail({ game }) {
  return (
    <div className={styles.container}>
      <h2>{game.name}</h2>
      <img src={game.background_image} alt={game.name} className={styles.gameImage} />
      <p>{game.description}</p>
      <p>Rating: {game.rating}</p>
      <p>Release Date: {game.releaseDate}</p>
      <p>
        Platforms:{" "}
        {Array.isArray(game.platforms)
          ? game.platforms.join(", ")
          : game.platforms}
      </p>
      <p>
        Genres:{" "}
        {Array.isArray(game.genres) ? game.genres.join(", ") : game.genres}
      </p>
    </div>
  );
}

export default Detail;