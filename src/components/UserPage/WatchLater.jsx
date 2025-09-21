import React from 'react';
import UserList from './UserList';
import { getWatchLater as apiGetWatchLater, removeWatchLater as apiRemoveWatchLater } from '../../services/useTilapiaApi';

export default function WatchLater() {
  return (
    <UserList
      title="Assistir depois"
      storageKey="watch_later"
      apiGet={apiGetWatchLater}
      apiRemove={apiRemoveWatchLater}
      emptyText={'Nenhum filme adicionado ainda.\nAdicione filmes para assistir mais tarde!'}
    />
  );
}
