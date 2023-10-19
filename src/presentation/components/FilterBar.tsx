import React from 'react';
import styled from 'styled-components';

const FilterBar = ({ className, onFilterChange, itemsCount }: any) => {
  return (
    <div className={`${className} filter-bar`}>
      <span className="filter-bar__counter" data-testid="items-counter">{itemsCount}</span>
      <input
        type="text"
        className="filter-bar__filter"
        placeholder="Filter podcasts..."
        onChange={(e) => onFilterChange(e.currentTarget.value)}
      />
    </div>
  )
}

export default styled(FilterBar)`
  display: flex;
  justify-content: flex-end;
  flex-wrap: nowrap;
  align-items: center;
  padding: 1em 0;

  .filter-bar__counter {
    flex-grow: 1;
    padding: 0.2rem 0.5rem;
    margin: 0 0.5rem;
    max-width: 4rem;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
    color: white;
    border-radius: 0.5rem;
    background-color: dodgerblue;
  }

  .filter-bar__filter {
    flex-grow: 1;
    outline: none;
    padding: 0.5rem;
    min-width: auto;
    max-width: 300px;
    border: 1px solid #ddd;
    border-radius: 0.3rem;
  }
  .filter-bar__filter::placeholder {
    color: #ddd;
  }
`;