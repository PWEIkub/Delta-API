import React, { useState, useEffect } from 'react';
import './App.css';

function Home() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    fetch('https://api.rinzdev.com/trashapidelta/listapimotherfucker')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    setFilteredItems(
      items.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, items]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="main">
      <div className="search-bar">
        <input
          className="search-input"
          type="text"
          placeholder="Search items..."
          value={query}
          onChange={handleQueryChange}
        />
      </div>
      <ul className="related-items-list">
        {filteredItems.map(item => (
          <li key={item.name}>
            <a href="#">{item.name}</a>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
