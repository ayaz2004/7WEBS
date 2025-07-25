import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import AuthPage from './pages/AuthPage';
import BookList from './pages/Library';
import AddBook from './pages/AddBook';
import BookDetail from './pages/BookDetails';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;