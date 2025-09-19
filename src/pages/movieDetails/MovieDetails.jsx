import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMovieDetails } from '../../services/useMovieApi';
import './movieDetails.css';

export default function MovieDetails(){
  const { id } = useParams();
  const { data, loading, error } = useMovieDetails(id);



    function formatRuntime(mins){
      if(mins === null || mins === undefined) return null;
      const h = Math.floor(mins/60);
      const m = mins % 60;
      return h ? `${h}h ${m}m` : `${m}m`;
    }
  
    function findTrailer(videos){
      if(!videos || !videos.results) return null;
      const trailer = videos.results.find(v => v.site === 'YouTube' && v.type === 'Trailer') || videos.results.find(v => v.site === 'YouTube');
      return trailer || null;
    }
  
    if(loading) return <div className="movie-details-loading">Carregando...</div>;
    if(error) return <div className="movie-details-error">{String(error)}</div>;
    if(!data) return <div className="movie-details-empty">Filme não encontrado</div>;
  
    // computed values
    const poster = data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : null;
    const backdrop = data.backdrop_path ? `https://image.tmdb.org/t/p/w1280${data.backdrop_path}` : null;
    const runtime = formatRuntime(data.runtime);
    const trailer = findTrailer(data.videos);
  
    return (
      <main className="movie-details-page">
        <div className={`movie-details-hero ${backdrop ? 'has-backdrop' : ''}`} style={ backdrop ? { backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${backdrop})` } : {}}>
          <div className="movie-details-container">
            <div className="movie-details">
              {poster ? <img src={poster} alt={data.title} className="movie-details-poster" /> : <div className="movie-details-poster placeholder"/>}
              <div className="movie-details-body">
                <h1>{data.title} {data.tagline ? <span className="tagline"> — {data.tagline}</span> : null}</h1>
                <p className="muted">{data.release_date} • {data.status} {runtime ? ` • ${runtime}` : ''}</p>
                <div className="movie-meta">
                  {data.genres && data.genres.length > 0 && (
                    <div className="genres">
                      {data.genres.map(g => <span key={g.id} className="genre-badge">{g.name}</span>)}
                    </div>
                  )}
                    {typeof data.vote_average === 'number' && (
                      <div className="rating">{(data.vote_average).toFixed(1)} / 10</div>
                    )}
                </div>
                <p className="overview">{data.overview}</p>
  
                {data.production_companies && data.production_companies.length > 0 && (
                  <div className="companies">
                    <h3>Produzido por</h3>
                    <div className="companies-grid">
                      {data.production_companies.map(pc => (
                        <div key={pc.id} className="company">
                          {pc.logo_path ? <img src={`https://image.tmdb.org/t/p/w200${pc.logo_path}`} alt={pc.name} /> : <div className="company-name">{pc.name}</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {trailer && (
                  <div className="trailer">
                    <h3>Trailer</h3>
                    <div className="video-wrap">
                      <iframe title="trailer" src={`https://www.youtube.com/embed/${trailer.key}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                  </div>
                )}
          </div>
        </div>
      </main>
    );
}
