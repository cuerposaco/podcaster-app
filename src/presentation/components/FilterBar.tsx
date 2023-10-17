import React from 'react';
import styled from 'styled-components';

const FilterBar = ({ className, onFilterChange, itemsCount }: any) => {
  return (
    <div className={`${className} filter-bar`}>
      <span className="filter-bar__counter">{itemsCount}</span>
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

  .filter-bar__counter {
    border-radius: .5rem;
    background-color: dodgerblue;
    padding: 0.2rem 0.5rem;
    margin: 0 0.5rem;
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .filter-bar__filter {
    border: 1px solid #ddd;
    border-radius: .3rem;
    outline: none;
    padding: .5rem;
    min-width: 300px;
  }
  .filter-bar__filter::placeholder {
    color: #ddd;
  }
` ;