import React, { useState, useEffect } from 'react';
import './App.css';

const createShuffledDeck = () => {
  const deck = Array.from({ length: 18 }, (_, i) => i + 1);
  const doubledDeck = [...deck, ...deck];
  for (let i = doubledDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [doubledDeck[i], doubledDeck[j]] = [doubledDeck[j], doubledDeck[i]];
  }
  return doubledDeck;
};

const Card = ({ value, onClick, isFlipped, isMatched }) => (
  <div 
    className={`card ${isFlipped || isMatched ? 'flipped' : ''}`} 
    onClick={onClick}
  >
    <div className="card-inner">
      <div className="card-front">?</div>
      <div className="card-back">{value}</div>
    </div>
  </div>
);

const MemoryGame = () => {
  const [deck, setDeck] = useState(createShuffledDeck());
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      if (deck[firstIndex] === deck[secondIndex]) {
        setMatchedCards([...matchedCards, deck[firstIndex]]);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  }, [flippedCards, deck, matchedCards]);

  useEffect(() => {
    if (matchedCards.length === 18) {
      setHasWon(true);
    }
  }, [matchedCards]);

  const handleCardClick = (index) => {
    if (flippedCards.length < 2 && !flippedCards.includes(index) && !matchedCards.includes(deck[index])) {
      setFlippedCards([...flippedCards, index]);
    }
  };

  return (
    <div className="game-board">
      {deck.map((value, index) => (
        <Card 
          key={index} 
          value={value} 
          onClick={() => handleCardClick(index)} 
          isFlipped={flippedCards.includes(index)} 
          isMatched={matchedCards.includes(value)} 
        />
      ))}
      {hasWon && <div className="winning-message">You Win!</div>}
    </div>
  );
};

const App = () => (
  <div className="app">
    <h1>Memory Match Game</h1>
    <MemoryGame />
  </div>
);

export default App;
