import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useMovieDetails } from '../../services/useMovieApi';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

// Generic user list component used by Favorites, WatchLater and MeuTop10
// Props:
// - title: string
// - storageKey: string
// - apiGet: function -> Promise<array|void>
// - apiRemove: function(id) -> Promise
// - allowMove: boolean (shows move controls)
// - moveApi: function(id, desired) -> Promise

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
  
  p { margin: 0; font-size: 14px; line-height: 1.4; }
  span { font-size: 20px; display: block; margin-bottom: 8px; }
`;

const MovieList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 4px;
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
  &:hover { transform: translateY(-2px); }
`;

const CompactPoster = styled.img`
  width: 48px; height: 72px; object-fit: cover; border-radius: 8px; background: #141a22; flex-shrink: 0;
`;

const CompactInfo = styled.div` flex:1; min-width:0; `;
const CompactTitle = styled.h4`
  margin: 0 0 4px 0; font-size: 14px; font-weight: 600; color: #e6eef8; line-height:1.2;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
`;
const CompactMeta = styled.p` margin:0; color:#9fb0c8; font-size:12px; `;

const RemoveButton = styled.button`
  background: transparent; color: #ff6b6b; border: 1px solid rgba(255,107,107,0.2);
  padding: 6px 12px; border-radius: 8px; cursor: pointer; font-size: 12px; font-weight:600;
`;

const TradeButton = styled.button`
  background: transparent; color: #7db2f8ff; border: 1px solid rgba(4, 24, 204, 0.2);
  padding: 6px 12px; border-radius: 8px; cursor:pointer; font-size:12px; font-weight:600;
`;

const ConfirmButton = styled.button`
  background: linear-gradient(90deg, #10b981, #06b6d4); color: white; border: none; padding: 6px 12px; border-radius:8px; cursor:pointer; font-weight:600;
`;

const CancelButton = styled.button`
  background: transparent; color: #9fb0c8; border: 1px solid rgba(159,176,200,0.12); padding:6px 12px; border-radius:8px; cursor:pointer; font-weight:600;
`;

const InputtoTrade = styled.input`
  width:60px; height:32px; font-size:14px; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.02); color:#e6eef8; padding:0 12px; margin-right:8px; font-weight:500;
  &:focus{ border-color:#3b82f6; outline:none }
`;

function readStorage(key) {
  try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : []; } catch { return []; }
}
function writeStorage(key, list) {
  try { localStorage.setItem(key, JSON.stringify(list)); } catch (err) { console.warn('storage write failed', err); }
}

export default function UserList({ title, storageKey, apiGet, apiRemove, allowMove = false, moveApi = null, emptyText }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (!apiGet) return setList(readStorage(storageKey));
    apiGet()
      .then((res) => {
        if (!Array.isArray(res)) return setList([]);
        const ids = res.map((r) => (typeof r === 'object' ? r.id : r));
        const local = readStorage(storageKey);
        const result = ids.map((id) => local.find((m) => m.id === id) || { id, title: `Filme #${id}`, poster_path: null });
        setList(result);
        writeStorage(storageKey, result);
      })
      .catch(() => setList(readStorage(storageKey)));
  }, [apiGet, storageKey]);

  async function remove(id) {
    setList((prev) => {
      const next = prev.filter((m) => m.id !== id);
      writeStorage(storageKey, next);
      return next;
    });
    if (apiRemove) {
      try {
        await apiRemove(id);
        toast.success('Removido com sucesso!');
      } catch (err) {
        console.error('Erro ao remover:', err);
        toast.error('Erro ao remover.');
      }
    }
  }

  async function movePosition(id, desired) {
    if (!allowMove || !moveApi) return true;
    if (Number.isNaN(desired) || desired < 1 || desired > list.length) {
      toast.error(`Posição inválida. Escolha um número entre 1 e ${list.length}.`);
      return false;
    }
    const fromIndex = list.findIndex((m) => m.id === id);
    const toIndex = desired - 1;
    if (fromIndex === -1 || fromIndex === toIndex) return true;
    try {
      await moveApi(id, desired);
      if (apiGet) {
        const res = await apiGet();
        if (Array.isArray(res)) {
          const ids = res.map((r) => (typeof r === 'object' ? r.id : r));
          const local = readStorage(storageKey);
          const result = ids.map((id) => local.find((m) => m.id === id) || { id, title: `Filme #${id}`, poster_path: null });
          setList(result);
          writeStorage(storageKey, result);
        }
      }
      toast.success('Posição atualizada.');
      return true;
    } catch (error) {
      toast.error('Erro ao mover posição.');
      console.error(error);
      return false;
    }
  }

  const CompactMovieItem = React.memo(function CompactMovieItem({ movie, position }) {
    const { data: details } = useMovieDetails(movie.id);
    const posterPath = details?.poster_path ?? movie.poster_path ?? null;
    const poster = posterPath ? `https://image.tmdb.org/t/p/w92${posterPath}` : null;
    const year = (details?.release_date ?? movie.release_date) ? (details?.release_date ?? movie.release_date).split('-')[0] : '';
    const titleText = details?.title ?? movie.title ?? `Filme #${movie.id}`;
    const rating = details?.vote_average;
    const id = details?.id ?? movie.id;

    const [editing, setEditing] = useState(false);
    const [localValue, setLocalValue] = useState(String(position));
    const localRef = useRef(null);

    useEffect(() => setLocalValue(String(position)), [position]);
    useEffect(() => { if (editing) setTimeout(() => localRef.current?.focus?.(), 40); }, [editing]);

    async function handleConfirm() {
      const desired = parseInt(localValue, 10);
      const success = await movePosition(movie.id, desired);
      if (success) setEditing(false);
    }

    return (
      <CompactMovieCard>
        {allowMove && `${position}.`}
        {poster ? <CompactPoster src={poster} alt={titleText} /> : <CompactPoster as="div" style={{display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px'}}>🎬</CompactPoster>}
        <CompactInfo>
          <Link to={id ? `/busca/${id}` : '#'} aria-label={`Ver detalhes de ${titleText}`}><CompactTitle title={titleText}>{titleText}</CompactTitle></Link>
          <CompactMeta>{year && `${year} • `}{rating && `⭐ ${parseFloat(rating).toFixed(1)}`}</CompactMeta>
        </CompactInfo>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
          <RemoveButton onClick={() => remove(movie.id)}>Remover</RemoveButton>

          {allowMove && (editing ? (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <InputtoTrade ref={localRef} value={localValue} onChange={(e) => setLocalValue(e.target.value)} inputMode="numeric" />
              <div style={{ display: 'flex', gap: 8 }}>
                <ConfirmButton onClick={handleConfirm}>OK</ConfirmButton>
                <CancelButton onClick={() => { setEditing(false); setLocalValue(String(position)); }}>Cancelar</CancelButton>
              </div>
            </div>
          ) : (
            <TradeButton onClick={() => setEditing(true)}>Trocar</TradeButton>
          ))}
        </div>
      </CompactMovieCard>
    );
  });

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <Counter>{list.length}</Counter>
      </Header>
      {list.length === 0 ? (
        <EmptyState>
          <span>📽️</span>
          <p>{emptyText ?? 'Nenhum filme adicionado ainda.'}</p>
        </EmptyState>
      ) : (
        <MovieList>
          {list.map((movie, idx) => (
            <CompactMovieItem key={movie.id} movie={movie} position={idx + 1} />
          ))}
        </MovieList>
      )}
    </Container>
  );
}
