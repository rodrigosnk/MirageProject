import React from 'react'
import { Link } from 'react-router-dom'
import './MovieCard.css'
import styled from 'styled-components';

const Poster = styled.img`
  width: 250px;
  height: 370px; 
  object-fit: cover;
  border-radius: 6px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.04);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

const MovieCard = ({ id, title, subtitle, className = '' , poster}) => {

  return (
    <article className={`movie-card ${className}`}>
      <Link to={id ? `/busca/${id}` : '#'} aria-label={`Ver detalhes de ${title}`}>
        {poster ? (
          <img src={poster} alt={title} className="movie-poster" />
        ) : (
          <Poster as="div" style={{display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px'}}>🎬</Poster>
        )}
        <div className="movie-card-body">
          <h3>{title}</h3>
          {subtitle && <p className="movie-muted">{subtitle}</p>}
        </div>
      </Link>
    </article>
  )
}

export default MovieCard
