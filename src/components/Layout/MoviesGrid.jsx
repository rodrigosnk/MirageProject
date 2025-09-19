import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import PagePagination from '../PagePagination';
import './MoviesGrid.css';

export default function MoviesGrid({ movies = [], loading=false, error=null, page=1, totalPages=1, onPageChange , namePage}){
  return (
    <section className="home-section">
      <h2>{namePage}</h2>
      {loading ? (
        <div className="home-loading"><div className="spinner" aria-hidden="true" /></div>
      ) : error ? (
        <div className="home-error">{String(error)}</div>
      ) : (
        <div className="home-grid">
          {movies.length > 0 && (
            movies.map(m => (
              <MovieCard key={m.id} id={m.id} title={m.title} subtitle={m.year ? `Ano: ${m.year}` : ''} poster={m.poster} />
            ))
          )}
        </div>
      )}
      {movies.length < 1 && (
          <div className="no-results">Filme não encontrado</div>
      )}

      {movies.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <PagePagination count={totalPages} page={page} onChange={onPageChange} />
        </div>
      )}
    </section>
  )
}
