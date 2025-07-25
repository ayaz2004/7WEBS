import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/index';
import BookCard from '../components/BookCard';
import Pagination from '../components/Pagination';
import { Search, Book, Feather } from 'lucide-react';

const Library = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState({ genre: '', author: '' });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    const fetchBooks = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await api.get('/books', {
                params: { ...filters, page, limit: 9 },
            });
            setBooks(response.data.books);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            setError('Failed to fetch books. The server might be down.');
        } finally {
            setLoading(false);
        }
    }, [filters, page]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
        setPage(1);
    };

    const handleSelectBook = (bookId) => {
        navigate(`/book/${bookId}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50">
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent mb-4">
                        Explore The Library
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Find your next adventure among thousands of titles. Filter by author or genre to begin.
                    </p>
                </div>
            
                {/* Filter Section */}
                <div className="flex flex-col md:flex-row gap-6 mb-12 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-yellow-200/50">
                    <div className="relative flex-1">
                        <Feather className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                            type="text" 
                            name="author" 
                            placeholder="Filter by author..." 
                            value={filters.author} 
                            onChange={handleFilterChange} 
                            className="w-full pl-12 pr-4 py-3 border-2 border-yellow-200 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all duration-300" 
                        />
                    </div>
                    <div className="relative flex-1">
                        <Book className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                            type="text" 
                            name="genre" 
                            placeholder="Filter by genre..." 
                            value={filters.genre} 
                            onChange={handleFilterChange} 
                            className="w-full pl-12 pr-4 py-3 border-2 border-yellow-200 rounded-lg bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all duration-300" 
                        />
                    </div>
                </div>

                {loading && <p className="text-center text-gray-500">Loading books...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                
                {!loading && !error && (
                    <>
                        {books.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {books.map(book => (
                                    <BookCard key={book._id} book={book} onSelectBook={handleSelectBook} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <Search size={48} className="mx-auto text-gray-400 mb-4" />
                                <h3 className="text-2xl font-semibold text-gray-700">No Books Found</h3>
                                <p className="text-gray-500 mt-2">Try adjusting your filters to find what you're looking for.</p>
                            </div>
                        )}
                        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                    </>
                )}
            </div>
        </div>
    );
};

export default Library;