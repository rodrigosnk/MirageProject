import React from 'react';
import styled from 'styled-components';

const Container = styled.main`
  max-width: 1000px;
  margin: 2.5rem auto;
  padding: 2rem 1.25rem;
  color: inherit; /* use site color */
  background: transparent; /* let page background show through */
  text-align: left;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
`;

const Title = styled.h1`
  font-size: 1.6rem;
  margin: 0;
  color: #e6eef6; /* match body text */
`;

const Intro = styled.p`
  line-height: 1.6;
  margin: 0.75rem 0 1.5rem 0;
  color: rgba(230,238,246,0.92);
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;

  @media (min-width: 720px) {
    grid-template-columns: 1fr 340px;
  }
`;

const Card = styled.article`
  background: rgba(255,255,255,0.02);
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.04);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const List = styled.ul`
  margin: 0;
  padding-left: 1.2rem;
  color: rgba(230,238,246,0.92);
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Authors = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const Author = styled.div`
  display: grid;
  gap: 0.75rem;
  align-items: center;
  justify-items: center;
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg,#6366f1,#ec4899);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  box-shadow: 0 6px 12px rgba(2,6,23,0.45);
`;

const Meta = styled.div`
  font-size: 0.95rem;
  color: rgba(230,238,246,0.96);
`;

const Small = styled.small`
  display: block;
  color: rgba(230,238,246,0.68);
`;

function Sobre() {
  return (
    <Container aria-labelledby="sobre-title">
      <Header>
        <Title id="sobre-title">Sobre este projeto</Title>
      </Header>

      <Intro>
        Este projeto foi criado para explorar a integração com a
        API do TMDB utilizando axios, arquitetura de componentes em React e melhores práticas com Vite.
      </Intro>

      <Grid>
        <Card aria-labelledby="features-title">
          <h2 id="features-title">Funcionalidades</h2>
          <List>
            <li>Listar filmes populares com paginação</li>
            <li>Busca por título com resultados instantâneos</li>
            <li>Página de detalhes com informações e imagens</li>
            <li>Favoritos e "assistir depois" por usuário</li>
            <li>Organização de componentes reutilizáveis</li>
          </List>

          <h3 style={{marginTop: '1rem'}}>Tecnologias</h3>
          <List>
            <li>React + Vite</li>
            <li>styled-components</li>
            <li>React Router</li>
            <li>Consumo de API externa (TMDB)</li>
          </List>
        </Card>

        <Card aria-labelledby="team-title">
          <h2 id="team-title">Autores</h2>
          <Authors>
            <Author>
              <Avatar aria-hidden>RG</Avatar>
              <Meta>
                <strong>Rodrigo Garcia Alves</strong>
                <Small>Aluno • Desenvolvimento frontend, Desenvolvimento de APIs</Small>
              </Meta>
            </Author>

            <Author>
              <Avatar aria-hidden>LR</Avatar>
              <Meta>
                <strong>Lavinia Rocha Brandino Silva</strong>
                <Small>Aluno • Desenvolvimento frontend, UX, Design e testes</Small>
              </Meta>
            </Author>

          </Authors>
        </Card>
      </Grid>
    </Container>
  );
}

export default Sobre;
