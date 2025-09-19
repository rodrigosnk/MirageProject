import React from 'react';
import styled from 'styled-components';

const Container = styled.main`
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem 2rem;
  color: #222;
`;
const Heading = styled.h2`
  margin-top: 0;
`;

function Sobre() {
  return (
    <Container>
      <Heading>Sobre este projeto</Heading>
      <p>
        Este é um projeto de faculdade criado para demonstrar consumo da API do TMDB
        usando React e Vite. O objetivo principal é aprender a integrar APIs externas,
        trabalhar com rotas (React Router), e construir componentes reusáveis com
        styled-components.
      </p>

      <h3>Funcionalidades</h3>
      <ul>
        <li>Listar filmes populares</li>
        <li>Buscar filmes por título</li>
        <li>Exibir imagens e detalhes básicos dos filmes</li>
      </ul>

      <h3>Autores</h3>
      <p>Aluno: Rodrigo Garcia Alves</p>
      <p>Aluno: Lavinia Rocha Brandino Silva</p>
    </Container>
  );
}

export default Sobre;
