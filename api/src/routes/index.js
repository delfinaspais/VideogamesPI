const express = require("express");
const axios = require("axios");
const { Videogame, Genre } = require("../db.js");
const { getAllGameData, getGenresFromAPI, getGamesFromDb } = require("./controllers");
const { API_KEY } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = express.Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", async function (req, res) {
  // funcion asincrona
  const { name } = req.query;
  try {
    let allGames = await getAllGameData();

    if (name) {
      let filteredByName = allGames.filter((game) =>
        game.name.toLowerCase().includes(name.toLowerCase())
      ); 

      return filteredByName.length > 0
        ? res.status(200).json(filteredByName)
        : res.status(404).send("Videogame name not found");
    }

    res.status(200).json(allGames);
  } catch (err) {
    console.log(err);
  }
});


router.get("/videogame/:id", async function (req, res) {
  const { id } = req.params;

  if (id.includes("-")) {
    const arrayDb = await getGamesFromDb();
    const filteredDb = arrayDb.filter((game) => game.id === id);

    if (filteredDb.length > 0) {
      return res.status(200).json(filteredDb);
    } else {
      return res.status(404).send("No game was found by that id");
    }
  } else {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );
      const apiData = {
        id: response.data.id,
        name: response.data.name,
        background_image: response.data.background_image,
        description: response.data.description_raw,
        releaseDate: response.data.releaseDate,
        rating: response.data.rating,
        platforms: response.data.platforms
          .map((platform) => platform.platform.name)
          .join(" - "),
        genres: response.data.genres.map((genre) => ({ name: genre.name })),
      };

      return res.status(200).json([apiData]);
    } catch (error) {
      return res.status(404).send("No game was found by that name");
    }
  }
});

router.get("/genres", async function (req, res) {
  const allGenres = await getGenresFromAPI();
  if (allGenres) {
    allGenres.map((genres) =>
      Genre.findOrCreate({
        where: {
          name: genres.name,
        },
      })
    );
  }
  res.send(allGenres);
});


router.post("/videogame", async function (req, res) {
  const { name, description, releaseDate, rating, platforms, background_image, genres } = req.body;

  try {
    const newGame = await Videogame.findOrCreate({
      where: { name, description, releaseDate, rating, platforms: platforms.join(", "), background_image }
    });

    const genreNames = genres;

    const genreDb = await Genre.findAll({
      where: { name: genreNames }
    });

    const genreIds = genreDb.map((genre) => genre.id);
    await newGame[0].setGenres(genreIds);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error from server" });
  }

  res.send("Successfully created");
});


module.exports = router;
