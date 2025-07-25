import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;
    
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="flex justify-center my-12">
            <ul className="flex items-center -space-x-px h-10 text-base">
                <li>
                    <button 
                        onClick={() => onPageChange(currentPage - 1)} 
                        disabled={currentPage === 1} 
                        className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-yellow-50 hover:text-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                </li>
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button 
                            onClick={() => onPageChange(number)} 
                            className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 ${
                                currentPage === number 
                                ? 'text-amber-600 bg-yellow-100 font-bold' 
                                : 'text-gray-500 bg-white'
                            } hover:bg-yellow-50 hover:text-amber-700`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                <li>
                    <button 
                        onClick={() => onPageChange(currentPage + 1)} 
                        disabled={currentPage === totalPages} 
                        className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-yellow-50 hover:text-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;