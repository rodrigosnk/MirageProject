import React from 'react';
import UserList from './UserList';
import { getFavorites as apiGetFavorites, removeFavorite as apiRemoveFavorite } from '../../services/useTilapiaApi';

export default function Favorites() {
  return (
    <UserList
      title="Favoritos"
      storageKey="favorites"
      apiGet={apiGetFavorites}
      apiRemove={apiRemoveFavorite}
      emptyText={'Nenhum filme adicionado ainda.\nAdicione filmes para a sua lista de favoritos!'}
    />
  );
}
