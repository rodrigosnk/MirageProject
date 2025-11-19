import React from 'react';
import UserList from './UserList';
import { getTop10 as apiGetTop10, removeTop10 as apiRemoveTop10, moveTop10Position } from '../../services/useTilapiaApi';

export default function MeuTop10() {
  return (
    <UserList
      title="Top 10"
      storageKey="top_10"
      apiGet={apiGetTop10}
      apiRemove={apiRemoveTop10}
      allowMove={true}
      moveApi={moveTop10Position}
      emptyText={'Nenhum filme adicionado ainda.\nAdicione filmes para o seu Top 10!'}
      serverName="top-10"
    />
  );
}
