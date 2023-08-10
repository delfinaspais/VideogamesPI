import styles from "./Card.module.css"
import { Link } from 'react-router-dom';


const Card = ({videogame}) => {
  
  const {id, name, background_image, genres} = videogame;
 
  return (
    <Link style={{textDecoration: "none"}} to={`/home/${id}`} >
    <div className={styles.cardContainer}>
      <h2 style={{color: "black"}}>{name}</h2>
      <img src={background_image} alt="" />
      {genres && genres.length > 0 && (
        <h1 style={{color: "black"}}>
          {genres.map((genre) => (typeof genre === "object" ? genre.name : genre)).join(", ")}
        </h1>
      )}
    </div>
    </Link>
  )
}

export default Card;

