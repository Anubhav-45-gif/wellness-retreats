import React, { useState, useEffect } from 'react';
import RetreatItem from './RetreatItem';
import FilterBar from './FilterBar';
import Pagination from './Pagination';
import Loader from '../assets/Loader.gif';
import shoonya from '../assets/shoonya.png';

const RetreatList = () => {
  const [retreats, setRetreats] = useState([]);
  const [filteredRetreats, setFilteredRetreats] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRetreats = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats');
        const data = await response.json();
        setRetreats(data);
        setFilteredRetreats(data);
      } catch (error) {
        console.error('Error fetching retreats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRetreats();
  }, []);

  const handleFilter = async (filters) => {
    try {
      setLoading(true);
      if (!filters) {
        console.error('Filters are not provided');
        return;
      }

      const response = await fetch(`https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?filter=${filters.type || ''}`);
      const data = await response.json();
  
      const filteredByType = data.filter(item => item.type === filters.type || !filters.type);
      const filterDateTimestamp = filters.date ? new Date(filters.date).getTime() / 1000 : null;
  
      const filteredByDate = filteredByType.filter(item => {
        const itemDateTimestamp = new Date(item.date).getTime() / 1000; 
        return itemDateTimestamp === filterDateTimestamp || !filters.date;
      });
  
      setFilteredRetreats(filteredByDate);
      setCurrentPage(1); // Reset to the first page on filter change
    } catch (error) {
      console.error('Error filtering retreats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      setLoading(true);
      if (!searchTerm) {
        setFilteredRetreats(retreats); 
        return;
      }
      const response = await fetch(`https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?search=${searchTerm}`);
      const data = await response.json();
      setFilteredRetreats(data);
      setCurrentPage(1); 
    } catch (error) {
      console.error('Error searching retreats:', error);
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRetreats.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
    <div className="bg-[#e7d2cc] mx-5 mt-5 p-5 max-w-full overflow-hidden  flex-col space-y-4 rounded-lg hidden md:flex">
        <img 
          src="https://cdn.midjourney.com/5d5f32ef-c40a-4258-9856-85db2f4f943a/0_0.jpeg" 
          alt="Shoonya Logo" 
          className="h-56 w-full object-cover" 
        />
        <h1 className="text-xl font-semibold">Discover Your Inner Peace</h1>
        <p>
          Join us for a series of wellness retreats designed to help you find tranquility and rejuvenation.
        </p>
      </div>
    <div className="px-5 pt-4 flex flex-col">
      <FilterBar onFilter={handleFilter} onSearch={handleSearch} />
      {loading ? (
        <div className="flex justify-center items-center flex-1">
          <img src={Loader} alt="Loading..." className='h-16 w-16' />
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          {filteredRetreats.length === 0 ? (
            <div className="flex justify-center items-center flex-1">
              <div className="mt-4 h-56 flex justify-center items-center">No events on this date</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-4">
              {currentItems.map(retreat => (
                <RetreatItem key={retreat.id} retreat={retreat} />
              ))}
            </div>
          )}
          {filteredRetreats.length > 0 && (
            <Pagination 
              itemsPerPage={itemsPerPage} 
              totalItems={filteredRetreats.length} 
              currentPage={currentPage} 
              onPageChange={(page) => setCurrentPage(page)} 
            />
          )}
        </div>
      )}
    </div>
    </>
  );
};

export default RetreatList;
