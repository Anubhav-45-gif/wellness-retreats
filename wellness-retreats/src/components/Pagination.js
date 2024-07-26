import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-center mt-4">
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1} 
        className="px-4 py-2 mx-1  rounded disabled:opacity-50 bg-blue-950 text-white"
      >
        Previous
      </button>
      <span className=" px-1 sm:px-4 py-2 mx-1">
        Page {currentPage} of {totalPages}
      </span>
      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages} 
        className="px-4 py-2 mx-1 rounded disabled:opacity-50 bg-blue-950 text-white"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
