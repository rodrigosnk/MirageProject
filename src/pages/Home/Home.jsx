import React from 'react'
import './home.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { useFetchPopular } from '../../services/useMovieApi'
import SearchHero from '../../components/Layout/SearchHero'
import MoviesGrid from '../../components/Layout/MoviesGrid'

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([])
   const [page, setPage] = useState(1);
  const { data, loading, error } = useFetchPopular(page);
  const [totalPages, setTotalPages] = useState(1);
 
  // when the pagination changes, update page and scroll to top for better UX
  const handlePageChange = (e, value) => {
    setPage(value);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
 
  

  useEffect(() => {
    if (!data || !data.results) return;

    const mappedMovies = data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
      poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
    }));

    setPopularMovies(mappedMovies);
    setTotalPages(data?.total_pages || 1);
  }, [data]);

  return (
    <div className="home-page">
      <SearchHero title="Bem-vindo ao Mirage Project" subtitle="Descubra filmes, veja trailers e explore recomendações." />

      <main className="home-container">
        <MoviesGrid namePage="Populares" movies={popularMovies} loading={loading} error={error} page={page} totalPages={totalPages} onPageChange={handlePageChange} />
      </main>
    </div>
  )
}

export default Home
