import React from 'react';

const FilterBar = ({ onFilterChange, itemsCount }) => {
  return (
    <>
      <div className="filter-bar">
        <span className="filter-bar__counter">{itemsCount}</span>
        <input type="text" onChange={(e) => onFilterChange(e.currentTarget.value)}/>
      </div>
    </>
  )
}

export default FilterBar;