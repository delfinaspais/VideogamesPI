import Card from "../Card/Card";
import styles from "./Cards.module.css";

const Cards = ({ videogames }) => {
  // console.log("Videogames received in Cards:", videogames); 
  const videogamesList = videogames || []; // Si videogames es undefined, inicializa videogamesList como un array vacío
  // videogames [0]
  if (!Array.isArray(videogamesList)) {
    return null; // Otra acción apropiada en caso de que `videogamesList` no sea un array
  }

  if (videogamesList.length === 0) {
    // Muestra un mensaje de carga o algún indicador mientras se obtienen los datos del backend
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.cardsContainer}>
      {videogamesList.map((videogame, id) => ( // videogamesList.map
        <Card key={id} videogame={videogame} />
      ))}
    </div>
  );
};

export default Cards;





// import Card from "../Card/Card"
// import styles from "./Cards.module.css"

// const Cards = ({videogames}) => { // desde "home"
  
//   console.log(videogames)
  
//   return (
//   <div className={styles.cardsContainer}>
//     {videogames.map(videogame=>
//       <Card videogame={videogame} />)}
//   </div>
  
//   )
// }

// export default Cards;