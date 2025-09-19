import React from 'react'
import './Navbar.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import logo from '../../assets/logo.png'
import Search from '../Layout/Search'

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // read current q param so navbar input stays in sync across navigation
  const params = new URLSearchParams(location.search);
  const currentQ = params.get('q') || '';

  // when user types, navigate to /filmes with updated q param so Filmes page reacts
  const handleChange = (e) => {
    const q = e.target.value || '';
    // if empty, navigate to /busca without q to clear results
    const target = q ? `/busca?q=${encodeURIComponent(q)}` : `/`;
    // use replace when staying on same page to avoid polluting history while typing
    navigate(target, { replace: true });
  };

  // on submit (press enter), keep same behavior but ensure we have a q
  const handleSearch = (q) => {
    if (!q) return;
    navigate(`/busca?q=${encodeURIComponent(q)}`);
  }

  return (
    <header className='header'>
      <div className="header-inner">
        <div className='brand'>
          <Link to="/" className='logo' aria-label="Mirage Home">
            <img src={logo} alt="Mirage Project Logo" />
          </Link>
        </div>

        <nav className={`navbar`}>
          <Link to="/">Home</Link>
          <Link to="/sobre">Sobre</Link>
        </nav>

        <div className="header-actions">
          <Search
            className="search--header"
            value={currentQ}
            onChange={handleChange}
            onSearch={handleSearch}
          />
        </div>
      </div>
    </header>
  )
}

export default Navbar
