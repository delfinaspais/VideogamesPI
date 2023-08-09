import React from "react";
import styles from "./Pagination.module.css"

const Pagination = ({ vgamesPerPage, totalVgames, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalVgames / vgamesPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav>
      <ul className={styles.pagbutton} style={{ display: "flex", listStyle: "none" }}>
        {pageNumbers.map(number => (
          <ul key={number} className="page-item">
          <button onClick={()=> paginate(number)} href="!#" className={styles.pagbutton} >
            {number}
          </button>
        </ul>
        ))}
      </ul>
      </nav> 
      )
    } 

export default Pagination;