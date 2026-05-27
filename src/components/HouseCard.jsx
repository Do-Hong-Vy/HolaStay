import React from 'react';

const HouseCard = ({ house }) => {
  return (
    <div className="house-card">
      <h3>{house?.name || 'House'}</h3>
    </div>
  );
};

export default HouseCard;
