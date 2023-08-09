import axios from 'axios';

export const GET_VGAMES = 'GET_VGAMES';
export const GET_VGAME_NAME = 'GET_VGAME_NAME';
export const GET_GENRES = 'GET_GENRES';
export const GET_VGAME = 'GET_VGAME';
export const POST_VGAME = 'POST_VGAME';
export const FILTER_BY_SOURCE = 'FILTER_BY_SOURCE';
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const ORDER_BY_RATING = 'ORDER_BY_RATING';


export const getVideogames = () => {
    return async function (dispatch) { // capacidad de hacer dispatch al reducer 
      try {
        const videogamesData = await axios.get("http://localhost:3001/videogames"); // hace la peticion
        const response = videogamesData.data;
        // console.log("Data from backend:", response); // Agregar este console.log
        dispatch({ type: GET_VGAMES, payload: response }); // despacha la action [response]
      } catch (error) {
        console.error("Error fetching videogames:", error); // Agregar este console.log
      }
    };
  };
  
export const getVideogamesByName = (name) => {
    return async function (dispatch) {
        if (!name || name.trim() === '') {
            return; // Retorna si el nombre no es válido
        }
        try {
            const videogameNameData = await axios.get(`http://localhost:3001/videogames?name=${name}`);
            const videogameName = videogameNameData.data;
            // console.log("Videogame by name", videogameName); // Agregar este console.log
            dispatch({ type: GET_VGAME_NAME, payload: videogameName });
        } catch (error) {
            return error.message
        }
    };
};

export const getGenres = () => {
    return async function (dispatch) {
        const genresData = await axios.get("http://localhost:3001/genres");
        const genres = genresData.data;
        dispatch({ type: GET_GENRES, payload: genres });
    };
};

export const getVideogame = (id) => {
    return async function (dispatch) {
        const videogameData = await axios.get(`http://localhost:3001/videogame/${id}`);
        const videogame = videogameData.data;
        dispatch({ type: GET_VGAME, payload: videogame });
    };
};

export const postVideogame = (payload) => {
    return async function (dispatch) {
        const response = await axios.post("http://localhost:3001/videogame", payload);
        
        dispatch({ type: POST_VGAME, payload: response})
        return response
    };
};

export const filterBySource = (payload) => {
    return {
        type: FILTER_BY_SOURCE,
        payload: payload
    };
};

export const filterByGenre = (payload) => {
    return {
        type: FILTER_BY_GENRE,
        payload: payload
    };
};

export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload: payload
    };
};

export const orderByRating = (payload) => {
    return {
        type: ORDER_BY_RATING,
        payload: payload
    };
};

