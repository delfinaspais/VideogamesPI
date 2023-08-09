const axios = require("axios");
const { Videogame, Genre } = require("../db.js");
const { API_KEY } = process.env;
const { Op } = require("sequelize");


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
    released: game.released}));

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
  // console.log("Entrando a la función getGamesFromDb");
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

  // console.log("Videojuegos encontrados:", infoDb);


 
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
    const genres = response.data.results.map((genre) => genre.name
    );


    for (const genreName of genres) { // guardar géneros en bdd
    if (genreName !== undefined && genreName !== null && genreName.trim() !== '')
    await Genre.findOrCreate({
      where: { name: genreName },
      defaults: { name: genreName },
    });
  }
  
  return genres;
}


const getVideogamesByNameFromApi = async (name) => {
  
  const apiSearchEndpoint = await axios.get(
    `https://api.rawg.io/api/games?search={${name}}&key=${API_KEY}`
  );
  const videogamesName = await apiSearchEndpoint.data.results.map((game) => {
    return {
      id: game.id,
      name: game.name,
      rating: game.rating,
      background_image: game.background_image,
      createdInDb: "false",
      genres: game.genres.map((g) => {
        return {
          name: g.name,
        };
      }),
      platforms :game.platforms.map((p) => {
        return {
          name: p,
        };
      }) 
    };
  });


  return videogamesName;
};

const getVideogamesByNameFromDb = async (name) => {
  
  let videogamesByName = await Videogame.findAll({
    attributes: ["id", "name", "rating", "background_image", "createdInDb", "platforms"],
    where: {
      name: {
        [Op.substring]: name,
      },
    },
    include: [
      {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      }
    ],
  });

  // console.log("Videojuegos encontrados:", videogamesByName);
  return videogamesByName;
};

const getVideogamesByName = async (name) => {
  // if (!name || name.trim() === '') {
  //   return []; // Retorna un array vacío si el nombre no es válido
  // }
  const VideogamesByNameFromApi = await getVideogamesByNameFromApi(name);
  const VideogamesByNameFromDb = await getVideogamesByNameFromDb(name);
  return VideogamesByNameFromApi.concat(VideogamesByNameFromDb);
};


module.exports = {
  getGamesFromAPI,
  getGamesFromDb,
  getAllGameData,
  getGenresFromAPI,
  getVideogamesByName
};


// async function getGenresFromAPI() {
//   const response = await axios.get(
//     `https://api.rawg.io/api/genres?key=${API_KEY}`
//   );
//   const genres = response.data.results.map((genre) => genre.name);

//   return genres;
// }