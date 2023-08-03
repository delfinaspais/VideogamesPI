import axios from 'axios';

export const GET_VGAMES = 'GET_VGAMES';
// export const GET_VGAME_BY_NAME = 'GET_VGAME_BY_NAME';
// export const GET_GENRES = 'GET_GENRES';
// export const GET_VGAME = 'GET_VGAME';
// export const POST_VGAME = 'POST_VGAME';
// export const FILTER_BY_SOURCE = 'FILTER_BY_SOURCE';
// export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
// export const SORT_BY_NAME = 'SORT_BY_NAME';
// export const SORT_BY_RATING = 'SORT_BY_RATING';

export const getVideogames = () => {
    return async function (dispatch) {
      try {
        const videogamesData = await axios.get("http://localhost:3001/videogames");
        const response = videogamesData.data;
        console.log("Data from backend:", response); // Agregar este console.log
        dispatch({ type: GET_VGAMES, payload: response.data });
      } catch (error) {
        console.error("Error fetching videogames:", error); // Agregar este console.log
      }
    };
  };
  
// export const getVideogames = () => {
//     return async function (dispatch) {
//         const videogamesData = await axios.get("http://localhost:3001/videogames");
//         const response = videogamesData.data;
//         dispatch({ type: GET_VGAMES, payload: response.data });
//     };
// };

// export const getVideogameByName = (name) => {
//     return async function (dispatch) {
//         try {
//             const videogameByNameData = await axios.get("http://localhost:3001/videogames?search=" + name);
//             const videogameByName = videogameByNameData.data;
//             dispatch({ type: GET_VGAME_BY_NAME, payload: videogameByName });
//         } catch (error) {
//             return error.message
//         }
//     };
// };

// export const getGenres = () => {
//     return async function (dispatch) {
//         const genresData = await axios.get("http://localhost:3001/genres");
//         const genres = genresData.data;
//         dispatch({ type: GET_GENRES, payload: genres });
//     };
// };

// export const getVideogame = (id) => {
//     return async function (dispatch) {
//         const videogameData = await axios.get('http://localhost:3001/videogames/' + id);
//         const videogame = videogameData.data;
//         dispatch({ type: GET_VGAME, payload: videogame });
//     };
// };

// export const postVideogame = (payload) => {
//     return async function (dispatch) {
//         const response = await axios.post("http://localhost:3001/videogames", payload);
//         console.log(response);
//         dispatch({ type: POST_VGAME, payload: response})
//         return response
//     };
// };

// export const filterBySource = (payload) => {
//     return {
//         type: FILTER_BY_SOURCE,
//         payload: payload
//     };
// };

// export const filterByGenre = (payload) => {
//     return {
//         type: FILTER_BY_GENRE,
//         payload: payload
//     };
// };

// export const sortByName = (payload) => {
//     return {
//         type: SORT_BY_NAME,
//         payload: payload
//     };
// };

// export const sortByRating = (payload) => {
//     return {
//         type: SORT_BY_RATING,
//         payload: payload
//     };
//};

