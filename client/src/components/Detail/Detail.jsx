import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {  getVideogame } from "../../redux/actions";
import styles from "./Detail.module.css";

export default function Detail({videogames}) {
    const { id } = useParams();
  
    const dispatch = useDispatch();

    useEffect(() => {
    dispatch(getVideogame(id));
    }, [dispatch, id]);
    
    const singleVideogame = useSelector((state) => state.videogame);
    
    
    return (
      <div className={styles.all}>
         <Link to="/home">
              <button className={styles.buttonhome}>Back Home</button>
            </Link>
        {singleVideogame && singleVideogame.length > 0 ? (

          
          <div className={styles.container}>
                <div className={styles.imgcont}>
                <img src={singleVideogame[0].background_image} className={styles.img} alt="" /> 
                        
          <div className={styles.textcont}>
          <h1 className={styles.title1}>{singleVideogame[0].name}</h1>
          <p  className={styles.description}>{singleVideogame[0].description.replace(/<[^>]*>?/g, "")}</p>
          </div>
          </div>

         
          <div className={styles.div2} >
          <div className={styles.divdata}>
          
          <h3 className={styles.title2}>Released</h3> <h3 className={styles.value}>{singleVideogame[0].released}</h3>
          
          <h3 className={styles.title2}>Rating</h3> <h3  className={styles.value}>{singleVideogame[0].rating}</h3>
          
          <h3 className={styles.title2}>Genres</h3>
               <div className={styles.divElement}>
           {singleVideogame[0].genres.map((genre) => ( <h4 key={genre.name}>{genre.name}</h4> ))}
           <h3 className={styles.title2}>Platforms</h3> <h3  className={styles.value}>{singleVideogame[0].platforms}</h3>
            </div>
            </div>
          </div>
          </div>
           
        
        
          
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
