import styles from "./NavBar.module.css"
import {Link} from "react-router-dom";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogamesByName } from "../../redux/actions";

const Navbar = () => {
    const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleImputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    // console.log(name); 
    dispatch(getVideogamesByName(name));
  }
    return (
    
    <div className={styles.navContainer}>
    <form className={styles.bar}>
        <input className={styles.searchInput} placeholder="Searching" onChange={(e) => handleImputChange(e)}/>
        <button className={styles.navButton} onClick={(e) => handleSubmit(e)}>Search</button>
        <Link to={"/create"}><button className={styles.navButton} >Create</button></Link>
    </form>
    </div>
    
    )
}

export default Navbar;