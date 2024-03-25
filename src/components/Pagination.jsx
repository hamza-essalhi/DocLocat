import React from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';



const Pagination = ({ currentPage, rowsPerPage, paginate, dataLength }) => {
  const totalPages = Math.ceil(dataLength / rowsPerPage);
  const maxVisiblePages = 5; // Change this value to adjust the number of visible pages

  const handleFirstPage = () => {
    paginate(1);
  };

  const handleLastPage = () => {
    paginate(totalPages);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <span
            key={i}
            className={`page-item ${currentPage === i ? 'active active-left' : ''}`}
            onClick={() => paginate(i)}
          >
            {i}
          </span>
        );
      }
    } else {
      let startPage = 1;
      let endPage = totalPages;
      let middlePages = maxVisiblePages - 2;

      if (currentPage >= middlePages && currentPage <= totalPages - middlePages) {
        startPage = currentPage - Math.floor(middlePages / 2);
        endPage = currentPage + Math.floor(middlePages / 2);
      } else if (currentPage > totalPages - middlePages) {
        startPage = totalPages - middlePages;
      }

      if (startPage !== 1) {
        pageNumbers.push(
          <span key={1} className="page-item" onClick={() => paginate(1)}>
            1
          </span>
        );
        if (startPage !== 2) {
          pageNumbers.push(<span key="ellipsis-start" className="page-item">...</span>);
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <span
            key={i}
            className={`page-item ${currentPage === i ? 'active active-left' : ''}`}
            onClick={() => paginate(i)}
          >
            {i}
          </span>
        );
      }

      if (endPage !== totalPages) {
        if (endPage !== totalPages - 1) {
          pageNumbers.push(<span key="ellipsis-end" className="page-item">...</span>);
        }
        pageNumbers.push(
          <span
            key={totalPages}
            className={`page-item ${currentPage === totalPages ? 'active active-left' : ''}`}
            onClick={() => paginate(totalPages)}
          >
            {totalPages}
          </span>
        );
      }
    }
    return pageNumbers;
  };

  return (
    <div className="pagination my-10">
      <div className="pagination-row">
        <span className="page-item arrow" onClick={handleFirstPage}>
        <FaAngleDoubleLeft />
        </span>
        <span className="page-item arrow" onClick={handlePrevPage}>
        <FaAngleLeft/>
        </span>
        {renderPageNumbers()}
        <span className="page-item arrow" onClick={handleNextPage}>
        <FaAngleRight/>
        </span>
        <span className="page-item arrow" onClick={handleLastPage}>
        <FaAngleDoubleRight />
        </span>
      </div>
    </div>
  );
};

export default Pagination;
