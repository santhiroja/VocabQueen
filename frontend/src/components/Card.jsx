
import React from 'react';

function Card({ word, meaning }) {
  return (
    <div className="card">
      <h2>{word}</h2>
      <p>{meaning}</p>
    </div>
  );
}

export default Card;
