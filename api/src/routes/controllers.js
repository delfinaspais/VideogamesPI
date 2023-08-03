const axios = require("axios");
const { Videogame, Genre } = require("../db.js");
const { API_KEY } = process.env;


async function getGamesFromAPI() {
  
 
  const games = []; 
  for (let index = 1; index <= 5; index++) {
   
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=${index}`
    ); 
    games.push(...response.data.results); 
  }

  const filteredGames = games.map((game) => ({
    id: game.id,
    name: game.name,
    background_image: game.background_image,
    genres: game.genres.map((genre) => genre.name), 
    platforms: game.platforms
      .map((platform) => platform.platform.name)
      .join(" , "), 
    rating: game.rating,
    releaseDate: game.releaseDate}));

  return filteredGames;
}

getGamesFromAPI()
  .then((games) => {
    // console.log(games);
  })
  .catch((error) => {
    console.log(error);
  });


async function getGamesFromDb() {
  const infoDb = await Videogame.findAll({ 
    // attributes: ["id", "name", "rating", "background_image", "isDataBase", "platforms"],
    include: { 
      model: Genre,
      attributes: ["name"],
      through: { 
        attributes: [],
      },
    },
  });

  return infoDb;
}



async function getAllGameData() {
  const apiGames = await getGamesFromAPI(); 
  const dbGames = await getGamesFromDb(); 
  const allGames = [...apiGames, ...dbGames]; 
  return allGames;
}


async function getGenresFromAPI() {
  const response = await axios.get(
    `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const genres = response.data.results.map((genre) => genre.name);

  // Guardar los géneros en la base de datos
  for (const genreName of genres) {
    await Genre.findOrCreate({
      where: { name: genreName },
      defaults: { name: genreName },
    });
  }
  
  return genres;
}


module.exports = {
  getGamesFromAPI,
  getGamesFromDb,
  getAllGameData,
  getGenresFromAPI,
};


// async function getGenresFromAPI() {
//   const response = await axios.get(
//     `https://api.rawg.io/api/genres?key=${API_KEY}`
//   );
//   const genres = response.data.results.map((genre) => genre.name);

//   return genres;
// }