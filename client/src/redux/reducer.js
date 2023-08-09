import {
    GET_VGAMES,
    GET_VGAME_NAME,
    GET_GENRES,
    GET_VGAME,
    POST_VGAME,
    FILTER_BY_SOURCE,
    FILTER_BY_GENRE,
    ORDER_BY_NAME,
    ORDER_BY_RATING
  } from './actions';
  
  const initialState = {
    videogames: [],
    allVideogames: [],
    videogame: [],
    genres: [],
    platforms: []
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_VGAMES:
            // console.log("Data received in reducer:", action.payload);
            
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            };

        case GET_VGAME_NAME:
            return {
                ...state,
                videogames: action.payload,
            };
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload,
            };



        case GET_VGAME:
            return {
                ...state,
                videogame: action.payload,
            };


        case POST_VGAME:
            // console.log("Data received in postgame reducer:", action.payload);
            return {
                ...state,
            };


       
        case FILTER_BY_SOURCE:
        // const allVideogames = state.allVideogames;
        //   console.log("reducer 1", state.allVideogames)
        const originFilter =
          action.payload === 'all'
          ? [...state.allVideogames]
          : state.allVideogames.filter((el) => el.createdInDb === action.payload);
             console.log("reducer 2", originFilter);
        return {
          ...state,
          videogames: originFilter,
        };

         
    


         case FILTER_BY_GENRE:
        const filteredByGenre = action.payload === 'all' ? [...state.allVideogames] : state.allVideogames.filter(el => el.genres && Array.isArray(el.genres) && el.genres.includes(action.payload)); 
           return {
         ...state,
         videogames: filteredByGenre,
        };
  


        case ORDER_BY_NAME:
            const allVideogamesName = [...state.videogames]
            action.payload === 'asc' ?
            allVideogamesName.sort(function (a, b) {
                    if (a.name.toUpperCase() > b.name.toUpperCase()) {
                        return 1;
                    }
                    if (a.name.toUpperCase() < b.name.toUpperCase()) {
                        return -1;
                    }
                    return 0;
                }) :
                allVideogamesName.sort(function (a, b) {
                    if (a.name.toUpperCase() > b.name.toUpperCase()) {
                        return -1;
                    }
                    if (a.name.toUpperCase() < b.name.toUpperCase()) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                videogames: action.payload === 'all' ? [...state.allVideogames] : allVideogamesName
            };
       
       
       
            case ORDER_BY_RATING:
            const allVideogamesRating = [...state.videogames];
            action.payload === 'asc' ?
                allVideogamesRating.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return 1;
                    }
                    if (a.rating < b.rating) {
                        return -1;
                    }
                    return 0;
                }) :
                allVideogamesRating.sort(function (a, b) {
                    if (a.rating > b.rating) {
                        return -1;
                    }
                    if (a.rating < b.rating) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                videogames: action.payload === 'all' ? [...state.allVideogames] : allVideogamesRating
            };
            
        default:
            return { ...state }
     }
  };
  
  export default rootReducer;
