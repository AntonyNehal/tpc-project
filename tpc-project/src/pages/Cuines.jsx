import React from 'react';

const CuisineDetail = () => {
  // Sample biryani data
  const cuisine = {
    name: 'Biryani',
    photoUrl: 'https://th.bing.com/th?id=OIP.wBu0Xsb774mtzvjhq1C3DgHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={cuisine.photoUrl}
          alt={cuisine.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center">{cuisine.name}</h2>
          <p className="mt-2 text-gray-600 text-center">
            Biryani is a delicious and aromatic dish made with basmati rice, spices, and meat or vegetables, often served at special occasions and gatherings.
          </p>
          <div className="mt-4 flex justify-center">
            <button className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-200">
              Cook Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuisineDetail;
