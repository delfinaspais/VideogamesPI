import { useEffect } from "react" // Ciclo de vide
import { useDispatch, useSelector } from "react-redux";
import { getVideogames } from "../../redux/actions";

import Cards from "../Cards/Cards"
import NavBar from "../NavBar/NavBar"
import styles from "./Home.module.css"

const Home = () => {

  const dispatch = useDispatch();
  const videogames = useSelector((state)=>state.videogames) // INDICO DE QUE ESTADO DEPENDE y esta suscripto

  useEffect(()=>{
    dispatch(getVideogames())
    // return (()=>{clearState}) // PARA LIMPIAR EL ESTADO
  },[dispatch])
  
  return (
    <div className={styles.home}>
  <h2 className={styles.homeTitle}> HOME PAGE </h2>
  <NavBar />
  <Cards videogames={videogames}/>
  </div>
  
  )
}

export default Home;