import React, { useState, useEffect } from "react"
import styled from "styled-components";
import MoviesGrid from "../components/Layout/MoviesGrid";
import { useLocation } from 'react-router-dom';
import { useSearchMovie } from "../services/useMovieApi";

const Container = styled.div`
  padding: 2rem;
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.25rem;
`;
const Subtitle = styled.h2`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1.5rem;
`;


export default function Busca() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [localError, setLocalError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const { data, loading, error } = useSearchMovie(query, page);
  
  // handler to simulate a search flow (visual only)
  function handleSearch(term) {
    if (!term) {
      setLocalError('Digite um termo para busca');
      setQuery('');
      return;
    }
    setLocalError(null);
    setQuery(term);
    setPage(1);
  }

  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    if (q && q !== query) {
      setQuery(q);
      handleSearch(q);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    if (!data || !data.results) {
      setMovies([]);
      setTotalPages(1);
      return;
    }

    const mappedMovies = data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
      poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
    }));

    setMovies(mappedMovies);
    setTotalPages(data?.total_pages || 1);
  }, [data]);

  return (
    <Container>

      <div style={{ marginTop: 20 }}>
        <MoviesGrid
          movies={movies}
          loading={loading}
          error={localError || error}
          page={page}
          totalPages={totalPages}
          onPageChange={(e, v) => setPage(v)}
        />
      </div>
    </Container>
  );
}