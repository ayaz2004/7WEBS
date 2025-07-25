import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import Library from './pages/Library';
import AddBook from './pages/AddBook';
import BookDetail from './pages/BookDetails';
import MyReviews from './pages/MyReviews'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthRoutes from './routes/AuthRoutes'; 

const App = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/books" element={<Library />} />
                    <Route path="/book/:id" element={<BookDetail />} />

                    {/* Protected Routes */}
                    <Route element={<AuthRoutes />}>
                        <Route path="/add-book" element={<AddBook />} />
                        <Route path="/my-reviews" element={<MyReviews />} /> 
                    </Route>
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

export default App;
