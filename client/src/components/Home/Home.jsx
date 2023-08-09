import { useEffect, useState } from "react" 
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, filterBySource, filterByGenre, orderByName, orderByRating, getGenres } from "../../redux/actions";

import Cards from "../Cards/Cards"
import NavBar from "../NavBar/NavBar"
import Pagination from "../Pagination/Pagination";
import styles from "./Home.module.css"

const Home = () => {

  const dispatch = useDispatch()
  const videogames = useSelector((state)=>state.videogames) 
  const genres = useSelector((state) => state.genres);
  
  const [order, setOrder] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [vgamesPerPage] = useState(15)

  const indexOfLastVgame = currentPage * vgamesPerPage;
  const indexOfFirstVgame = indexOfLastVgame - vgamesPerPage;
  const currentVgames = videogames.slice(indexOfFirstVgame, indexOfLastVgame);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getVideogames());
        await dispatch(getGenres());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  

  function handleSortByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  }

  function handleSortByRating(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  }
  
  function handleSourceFilter(e) {
    console.log("Selected value:", e.target.value);
    dispatch(filterBySource(e.target.value.toString())) //(e.target.value.toString())) 
  }

  function handleGenreFilter(e) {
    dispatch(filterByGenre(e.target.value));
  }
  
  
  return (
    <div className={styles.home}>
  <h2 className={styles.homeTitle}> HOME PAGE </h2>
  
  <NavBar />
  <div className={styles.filter}>
        <p>
          <span className={styles.orden}>
          Order by
          <select onChange={(e) => handleSortByName(e)} className={styles.select}>
            <option value="" className={styles.option}>Order by</option>
            <option value="asc" className={styles.option}>A/Z</option>
            <option value="desc" className={styles.option}>Z/A</option>
          </select>
          </span>
          <span className={styles.rating}>
          Rating
          <select onChange={(e) => handleSortByRating(e)} className={styles.select}>
            <option value="" className={styles.option}>Order by</option>
            <option value="asc" className={styles.option}>Ascendant</option>
            <option value="desc" className={styles.option}>Descendant</option>
          </select>
          </span>
          <span  className={styles.genero}>
          Genres
          <select onChange={(e) => handleGenreFilter(e)} className={styles.select}>
            <option value="all" className={styles.option}>All</option>
    {genres.map((genre, index) => (
      <option key={index} value={genre} className={styles.option}>
        {genre}
      </option>
    ))}
          </select>
          </span>
          <span>
          Source
          <select onChange={(e) => handleSourceFilter(e)} className={styles.select}  >
            <option value="all" className={styles.option}>All</option>
            <option value="true" className={styles.option}>Created</option>
            <option value="false" className={styles.option}>From API</option>
          </select>
          </span>
        </p>
      </div>
<Pagination vgamesPerPage={vgamesPerPage} totalVgames={videogames.length} paginate={paginate} />
<Cards videogames = {currentVgames} />
  </div> 
  
  )
}

export default Home;