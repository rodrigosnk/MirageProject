import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="brand">
          <Link to="/" className="logo" aria-label="Mirage Home">
            <img src={logo} alt="Mirage Project Logo" />
          </Link>
          <div className="brand-text">
            <span className="project-name">Mirage Project</span>
            <span className="tagline">Descubra filmes, séries e mais</span>
          </div>
        </div>

        <div className="footer-info">
          &copy; {currentYear} Mirage Project. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

export default Footer;