import useFetch from "./useFetch";

const baseURL = "https://api.themoviedb.org/3";
const api_key = "454396702a2eb8b253220eedb4d8014b";

export function useSearchMovie(name, page = 1) {
  const url = name ? `${baseURL}/search/movie` : null;
  const params = name ? { query: name, page, language: 'pt-BR', api_key } : null;
  return useFetch(url, params);
}

export function useFetchPopular(page = 1) {
  const url = `${baseURL}/movie/popular`;
  const params =  { page, language: 'pt-BR', api_key };
  return useFetch(url,  params );
}

export function useMovieDetails(id) {
  // TMDB movie details endpoint uses /movie/{movie_id}
  const url = `${baseURL}/movie/${id}`;
  // request additional sub-resources (videos for trailers, credits for cast/crew)
  // `append_to_response` lets TMDB return them in the same payload which simplifies the UI.
  const params = { api_key, language: 'pt-BR', append_to_response: 'videos,credits' };
  return useFetch(url, params);
}

export default { useSearchMovie, useFetchPopular, useMovieDetails };
