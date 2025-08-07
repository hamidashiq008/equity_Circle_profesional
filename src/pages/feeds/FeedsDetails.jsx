// src/pages/feeds/FeedsDetails.jsx
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const FeedsDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const card = location.state?.card;

  if (!card) {
    return <p className="text-center mt-5">❌ No card data found for ID: {id}</p>;
  }

  return (
    <div className="container my-5">
      <div className="card mx-auto shadow" style={{ maxWidth: '600px' }}>
        <img src={card.image} className="card-img-top" alt={card.title} />
        <div className="card-body">
          <h3 className="card-title">{card.title}</h3>
          <p className="card-text">{card.description}</p>
          <button className="btn btn-outline-primary">Add It</button>
        </div>
      </div>
    </div>
  );
};

export default FeedsDetails;
