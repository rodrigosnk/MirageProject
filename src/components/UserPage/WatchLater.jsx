import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getStoredToken, getWatchLater as apiGetWatchLater, removeWatchLater as apiRemoveWatchLater } from '../../services/useTilapiaApi';
import { useMovieDetails } from '../../services/useMovieApi';
import { toast } from 'sonner';

const STORAGE_KEY = 'watch_later';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #e6eef8;
  font-weight: 700;
`;

const Counter = styled.span`
  background: linear-gradient(90deg, #3b82f6, #7c3aed);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 24px;
  color: #9fb0c8;
  background: rgba(255,255,255,0.02);
  border-radius: 12px;
  border: 2px dashed rgba(255,255,255,0.08);
  
  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.4;
  }
  
  span {
    font-size: 20px;
    display: block;
    margin-bottom: 8px;
  }
`;

const MovieList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 4px;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255,255,255,0.05);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.2);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(255,255,255,0.3);
  }
`;

const CompactMovieCard = styled.div`
  display: flex;
  gap: 12px;
  background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
  padding: 12px;
  border-radius: 12px;
  align-items: center;
  border: 1px solid rgba(255,255,255,0.05);
  transition: all 160ms ease;
  
  &:hover {
    background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
    border-color: rgba(59,130,246,0.2);
    transform: translateY(-2px);
  }
`;

const CompactPoster = styled.img`
  width: 48px;
  height: 72px;
  object-fit: cover;
  border-radius: 8px;
  background: #141a22;
  flex-shrink: 0;
`;

const CompactInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const CompactTitle = styled.h4`
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
  color: #e6eef8;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CompactMeta = styled.p`
  margin: 0;
  color: #9fb0c8;
  font-size: 12px;
`;

const RemoveButton = styled.button`
  background: transparent;
  color: #ff6b6b;
  border: 1px solid rgba(255,107,107,0.2);
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 160ms ease;
  
  &:hover {
    background: rgba(255,107,107,0.1);
    border-color: rgba(255,107,107,0.4);
    transform: translateY(-1px);
  }
`;

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeStorage(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (err) {
    console.warn('watch_later storage write failed', err);
  }
}

export default function WatchLater() {
  const [list, setList] = useState([]);
  

  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      return;
    }
    apiGetWatchLater()
      .then((res) => {
        if (!Array.isArray(res)) return setList([]);

        const ids = res.map((r) => (typeof r === 'object' ? r.id : r));

        const local = readStorage();
        const result = ids.map((id) => local.find((m) => m.id === id) || { id, title: `Filme #${id}`, poster_path: null });
        setList(result);
        writeStorage(result);
      })
      .catch(() => {
        setList(readStorage());
      });
  }, []);

  const remove = React.useCallback( async (id) => {
    const token = getStoredToken();
    setList((prev) => {
      const next = prev.filter((m) => m.id !== id);
      writeStorage(next);
      return next;
    });
  if (token) {
          try {
            await apiRemoveWatchLater(id);
            toast.success('Removido da lista de assistir depois com sucesso!');
          } catch (e) {
            toast.error('Erro ao remover da lista de assistir depois.', e.response?.data?.message);
          }
        }
    }, []);

  const CompactMovieItem = ({ movie }) => {
    const { data: details } = useMovieDetails(movie.id);
    const posterPath = details?.poster_path ?? movie.poster_path ?? null;
    const poster = posterPath ? `https://image.tmdb.org/t/p/w92${posterPath}` : null;
    const year = (details?.release_date ?? movie.release_date) ? (details?.release_date ?? movie.release_date).split('-')[0] : '';
    const title = details?.title ?? movie.title ?? `Filme #${movie.id}`;
    const rating = details?.vote_average;
    
    return (
      <CompactMovieCard>
        {poster ? (
          <CompactPoster src={poster} alt={title} />
        ) : (
          <CompactPoster as="div" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '20px'
          }}>
            🎬
          </CompactPoster>
        )}
        <CompactInfo>
          <CompactTitle title={title}>{title}</CompactTitle>
          <CompactMeta>
            {year && `${year} • `}
            {rating && `⭐ ${parseFloat(rating).toFixed(1)}`}
          </CompactMeta>
        </CompactInfo>
        <RemoveButton onClick={() => remove(movie.id)}>
          Remover
        </RemoveButton>
      </CompactMovieCard>
    );
  };

  return (
    <Container>
      <Header>
        <Title>Assistir depois</Title>
        <Counter>{list.length}</Counter>
      </Header>
      {list.length === 0 ? (
        <EmptyState>
          <span>📽️</span>
          <p>Nenhum filme adicionado ainda.<br/>Adicione filmes para assistir mais tarde!</p>
        </EmptyState>
      ) : (
        <MovieList>
          {list.map((movie) => (
            <CompactMovieItem key={movie.id} movie={movie} />
          ))}
        </MovieList>
      )}
    </Container>
  );
}
