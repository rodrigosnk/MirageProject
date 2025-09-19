import React from 'react'
import { Link } from 'react-router-dom'
import './MovieCard.css'

const MovieCard = ({ id, title, subtitle, className = '' , poster}) => {

  return (
    <article className={`movie-card ${className}`}>
      <Link to={id ? `/busca/${id}` : '#'} aria-label={`Ver detalhes de ${title}`}>
        {poster ? (
          <img src={poster} alt={title} className="movie-poster" />
        ) : (
          <div className="movie-poster movie-poster--placeholder" aria-hidden="true" />
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
