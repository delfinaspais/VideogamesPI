import styles from "./NavBar.module.css"
// import {Link} from "react-router-dom";

const Navbar = () => {
    return (
    
    <div className={styles.navContainer}>
    <p>NAVBAR</p>
    <form>
        <input placeholder="Busqueda"/>
        <button>Search</button>
    </form>
    </div>
    
    )
}

export default Navbar;