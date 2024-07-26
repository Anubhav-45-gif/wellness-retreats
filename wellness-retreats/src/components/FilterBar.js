import React, { useState } from 'react';

const FilterBar = ({ onFilter, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ date: '', type: '' });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters, [name]: value };
      onFilter(newFilters);
      return newFilters;
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const applySearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between rounded-lg p-4 bg-white">
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto mb-4 sm:mb-0">
        <input 
          type="text" 
          placeholder="Search by title" 
          value={searchTerm} 
          onChange={handleSearchChange} 
          className="p-2 border rounded-lg w-full sm:w-auto border-black text-black"
        />
        <button 
          onClick={applySearch} 
          className="bg-blue-950 text-white p-2 rounded-lg w-full sm:w-auto mt-2 sm:mt-0"
        >
          Search
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <select 
          name="type" 
          value={filters.type} 
          onChange={handleFilterChange} 
          className="p-2 border rounded-lg w-full sm:w-auto bg-blue-950 text-white"
        >
          <option value="">All Types</option>
          <option value="Signature">Signature</option>
          <option value="Standalone">Standalone</option>
        </select>
        <input 
          type="date" 
          name="date" 
          value={filters.date} 
          onChange={handleFilterChange} 
          className="p-2 border rounded-lg w-full sm:w-auto bg-blue-950 text-white"
        />
      </div>
    </div>
  );
};

export default FilterBar;
