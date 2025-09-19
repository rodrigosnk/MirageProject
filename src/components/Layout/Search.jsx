import React from "react";
import styled from "styled-components";
import './Search.css';

const Button = styled.button`
  background: #000307ff;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;

  &:hover { opacity: 0.9; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;


function Search({ onSearch, value, onChange, loading, className }) {
  const [internalQuery, setInternalQuery] = React.useState("");
  const isControlled = value !== undefined;

  function handleSearch(e) {
    e.preventDefault();
    const q = isControlled ? value : internalQuery;
    if (onSearch) onSearch(q);
  }

  const inputValue = isControlled ? value : internalQuery;
  const handleInputChange = (e) => {
    if (isControlled) {
      if (onChange) onChange(e);
    } else {
      setInternalQuery(e.target.value);
    }
  };

  const isHeaderStyle = className && className.split(' ').includes('search--header');

  return (
    <form onSubmit={handleSearch} className={className}>
      <input
        name="search"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Pesquisar titulos..."
        autoComplete="off"
      />
      <Button className={isHeaderStyle ? 'search--header__btn' : ''} type="submit" disabled={loading} aria-busy={loading}>{loading ? 'Buscando...' : 'Pesquisar'}</Button>
    </form>
  );
}

export default Search;
