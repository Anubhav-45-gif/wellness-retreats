import React from 'react';

const RetreatItem = ({ retreat }) => {
    const readableDate=(date)=>{
    const newDate = new Date(date * 1000); 
return newDate.toUTCString();
    }
  return (
    <div className="bg-[#e7d2cc] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg w-7/12 m-4 h-48 object-cover" src={retreat?.image} alt={retreat?.title} />
      <div className="p-5">
        <h1 className='font-semibold mb-3 text-xl'>{retreat?.title}</h1>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{retreat?.description}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Date: {readableDate(retreat?.date)}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Location: {retreat?.location}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Price: ${retreat?.price}</p>
      </div>
    </div>
  );
};

export default RetreatItem;
