import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './pages/Home/Home.jsx';
import Busca from './pages/Busca.jsx';
import Sobre from './pages/Sobre.jsx';
import MovieDetails from './pages/movieDetails/MovieDetails.jsx';
import Auth from './pages/Auth.jsx';
import User from './pages/User.jsx';
import { Toaster } from 'sonner'
import './index.css'

function App() {
  return (
  <>
  
  <Router>
    <div className='container'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/busca" element={<Busca />} />
        <Route path="/busca/:id" element={<MovieDetails />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/user" element={<User />} />
      </Routes>
      <Toaster richColors expand={true} />
      <Footer />
    </div>
  </Router>
  </>
);
}

export default App;