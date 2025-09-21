import React, { useEffect, useState } from 'react';
import { getProfile, getStoredToken } from '../services/useTilapiaApi';
import * as Style from '../components/UserPage/UserPage.styles';
import MeuTop10 from '../components/UserPage/MeuTop10';
import WatchLater from '../components/UserPage/WatchLater';
import Favorites from '../components/UserPage/Favorites';

const User = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = getStoredToken();
        if (!token) throw new Error('Usuário não autenticado');

        const p = await getProfile();
        setProfile(p);
      } catch (err) {
        setError(err?.response?.data?.message || err.message || 'Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  if (loading) return <Style.Page><Style.Container><p>Carregando perfil...</p></Style.Container></Style.Page>;
  if (error) return <Style.Page><Style.Container><p style={{ color: 'salmon' }}>{error}</p></Style.Container></Style.Page>;

  return (
    <Style.Page>
      <Style.Container>
        <Style.Header>
          <Style.HeaderInfo>
            <h1>Meu Perfil</h1>
            <Style.SmallMuted>Área do usuário • gerenciamento de listas</Style.SmallMuted>
          </Style.HeaderInfo>
          <Style.ProfileCard>
            <Style.Avatar>{profile && (profile.username || profile.name || profile.email || 'U')[0].toUpperCase()}</Style.Avatar>
            <Style.ProfileInfo>
              <div className="username">{profile.username || profile.name || profile.email}</div>
              <div className="email">{profile.email}</div>
            </Style.ProfileInfo>
          </Style.ProfileCard>
        </Style.Header>

        <Style.Sections>
            
            <Style.SectionCard>
              <MeuTop10 />
            </Style.SectionCard>

            <Style.SectionCard>
              <Favorites />
            </Style.SectionCard>

            <Style.SectionCard>
            <WatchLater />
          </Style.SectionCard>
          
        </Style.Sections>
      </Style.Container>
    </Style.Page>
  );
};

export default User;
