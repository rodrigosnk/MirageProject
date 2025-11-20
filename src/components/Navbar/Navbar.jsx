import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import logo from '../../assets/logo.png'
import Search from '../Layout/Search'
import { getStoredToken, getProfile, setAuthToken, logout } from '../../services/useTilapiaApi'

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    let mounted = true;
    const init = async () => {
      const token = getStoredToken();
      if (!token) return;
      try {
        const p = await getProfile();
        if (mounted) setUser(p);
      } catch {
        // ignore
      }
    }
    init();
    const onAuthChanged = () => {
      init();
    }
    window.addEventListener('tilapia-auth-changed', onAuthChanged);
    return () => { mounted = false; window.removeEventListener('tilapia-auth-changed', onAuthChanged); };
  }, []);

  const params = new URLSearchParams(location.search);
  const currentQ = params.get('q') || '';

  const handleChange = (e) => {
    const q = e.target.value || '';
    const target = q ? `/busca?q=${encodeURIComponent(q)}` : `/`;
    navigate(target, { replace: true });
  };

  const handleSearch = (q) => {
    if (!q) return;
    navigate(`/busca?q=${encodeURIComponent(q)}`);
  }
  
  const reloadPage = () => {
    window.location.reload();
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
          {!user ? (
            <Link to="/auth">Entrar</Link>
          ) : (
            <>
              <Link to="/user">{user.name || user.email}</Link>
              <button className="btn link" onClick={() => { logout();setAuthToken(null); setUser(null); reloadPage(); }}>Logout</button>
            </>
          )}
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
