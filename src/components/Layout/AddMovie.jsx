import React from "react";
import styled from "styled-components";
import{addFavorite, addTop10, addWatchLater } from '../../services/useTilapiaApi'
import { toast } from "sonner";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 40px;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  background: rgba(7, 7, 7, 0.61);
  padding: 14px 18px;
  border-radius: 999px;
`;

const Controls = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #3b2bd1 0%, #2563eb 100%);
  color: #ffffff;
  padding: 10px 14px;
  border-radius: 999px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(37,99,235,0.18), inset 0 -2px 0 rgba(255,255,255,0.06);
  transition: transform 120ms ease, box-shadow 120ms ease, opacity 120ms ease;
  white-space: nowrap;

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    fill: currentColor;
    opacity: 0.95;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 30px rgba(37,99,235,0.18);
  }

  &:active {
    transform: translateY(-1px) scale(0.995);
  }

  &:focus {
    outline: 3px solid rgba(37,99,235,0.18);
    outline-offset: 3px;
  }

  @media (max-width: 480px) {
    padding: 8px 10px;
    font-size: 13px;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  color: #e9eef9;
`;

const IconHeart = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 21s-7.5-4.35-9.3-6.05C1.9 13.9 1 12.7 1 11.2 1 8.4 3.2 6 6 6c1.7 0 3.2.9 4 2.3C11.8 6.9 13.3 6 15 6c2.8 0 5 2.4 5 5.2 0 1.5-.9 2.7-1.7 3.75C19.5 16.65 12 21 12 21z" />
  </svg>
);

const IconStar = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 19.897 4.665 24 6 15.595 0 9.748l8.332-1.73z" />
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 1a11 11 0 1 0 11 11A11.013 11.013 0 0 0 12 1zm1 12.59L7.71 9.3 9.12 7.88 13 11.76V13.59z" />
  </svg>
);

const AddMovie = ( props) => {
    const id = props.movie;
    const handleAddFavorite = async () => {
        try {
            await addFavorite(id);
            toast.success('Adicionado aos favoritos com sucesso!');
        } catch (e) {
            toast.error('Erro ao adicionar aos favoritos.', { description: e.response.data.message });
        }
    };
    const handleAddTop10 = async () => {
        try {
            await addTop10(id);
            toast.success('Adicionado ao Top 10 com sucesso!');
        } catch (e) {
            toast.error('Erro ao adicionar ao Top 10.', { description: e.response.data.message });
        }
    };
    const handleAddWatchLater = async () => {
        try {
            await addWatchLater(id);
            toast.success('Adicionado para assistir depois com sucesso!');
        } catch (e) {
            toast.error('Erro ao adicionar para assistir depois.', { description: e.response.data.message });
        }
    };
  return (
    <Container>
      <div>
        <Title>Adicionar Titulo a sua biblioteca</Title>
      </div>
      <Controls>
        <Button aria-label="Adicionar aos favoritos" onClick={handleAddFavorite}>
          <IconHeart />
          <span>Favoritos</span>
        </Button>
        <Button aria-label="Adicionar ao Top 10" onClick={handleAddTop10}>
          <IconStar />
          <span>Top 10</span>
        </Button>
        <Button aria-label="Adicionar para assistir depois" onClick={handleAddWatchLater}>
          <IconClock />
          <span>Assistir depois</span>
        </Button>
      </Controls>
    </Container>
  );
};

export default AddMovie;
