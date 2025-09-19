import React from 'react';
import styled from 'styled-components';

const Hero = styled.header`
  padding:48px 0;
  background: linear-gradient(90deg, rgba(6,182,212,0.06), transparent 40%);
  text-align: center;
`;

const Inner = styled.div`
  max-width:1100px;
  margin:0 auto;
  padding:0 16px;
`;

const Title = styled.h1`
  font-size:2rem;
  margin:0 0 8px;
`;

const Subtitle = styled.p`
  color:var(--home-muted);
  margin:0 0 12px;
`;

const Children = styled.div`
  margin-top:16px;
  display:flex;
  justify-content:center;
`;

export default function SearchHero({ title, subtitle, children }) {
  return (
    <Hero>
      <Inner>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        <Children>{children}</Children>
      </Inner>
    </Hero>
  );
}
