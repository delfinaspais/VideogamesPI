import React from 'react';
import styles from './styles/Pagination.module.css';

function Pagination({ currentPage, totalPages, paginate }) {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      paginate(page);
    }
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxDisplayedPages = 3;
    const minPage = Math.max(currentPage - 1, 1);
    const maxPage = Math.min(minPage + maxDisplayedPages - 1, totalPages);

    for (let i = minPage; i <= maxPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className={styles.pagination}>
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous Page
      </button>
      {generatePageNumbers().map(number => (
        <button
          key={number}
          onClick={() => handlePageChange(number)}
          className={`${styles.button} ${currentPage === number ? styles.active : ''}`}
        >
          {number}
        </button>
      ))}
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next Page
      </button>
    </div>
  );
}

export default Pagination;
