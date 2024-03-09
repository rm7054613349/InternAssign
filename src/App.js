// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'https://api.punkapi.com/v2/beers';

function App() {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setBeers(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Beer Catalog</h1>
        <input
          type="text"
          placeholder="Search for a beer"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="beer-container">
          {filteredBeers.map((beer) => (
            <div key={beer.id} className="beer-card">
              <img src={beer.image_url} alt={beer.name} />
              <h3>{beer.name}</h3>
              <p>{beer.tagline}</p>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
