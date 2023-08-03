import styles from "./Card.module.css"

const Card = ({videogame}) => {
  
  console.log(videogame)


  return (
    <div className={styles.cardContainer}>
    <p>IMAGEN</p>
    <h2>Name:</h2>
    <p>Genders:</p>
  </div>
  
  )
}

export default Card;

