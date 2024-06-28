import React, { useState, useEffect } from 'react';
import { Search } from "lucide-react";
import './App.css';
import Login from "./login";

const navItems = {
  Text_API: ['Video sum API', 'TTS API', 'STT API'],
  App_API: ['Weather API', 'App API', 'Map API'],
  Data_API: ['Finance API', 'Sports API', 'News API'],
  Utility_API: ['Email API', 'SMS API', 'Notification API'],
  Social_API: ['Twitter API', 'Facebook API', 'Instagram API'],
};

function App() {
  const [activeNavItem, setActiveNavItem] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [relatedItems, setRelatedItems] = useState(Object.values(navItems).flat());
  const [isCooldown, setIsCooldown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isCooldown) {
      const cooldownTimeout = setTimeout(() => {
        setIsCooldown(false);
      }, 300);

      return () => clearTimeout(cooldownTimeout);
    }
  }, [isCooldown]);

  const handleNavItemClick = (itemName) => {
    if (!isCooldown) {
      if (activeNavItem === itemName) {
        setActiveNavItem('');
        setRelatedItems(Object.values(navItems).flat());
      } else {
        setActiveNavItem(itemName);
        setRelatedItems(navItems[itemName] || Object.values(navItems).flat());
      }
      setIsCooldown(true);
    }
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    setIsCooldown(false);
  };

  const normalizedSearchTerm = searchTerm.toLowerCase().replace(/\s+/g, '');
  const filteredRelatedItems = relatedItems.filter((item) =>
    item.toLowerCase().replace(/\s+/g, '').includes(normalizedSearchTerm)
  );

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  useEffect(() => {
    fetchData("https://api.rinzdev.com/trashapidelta/listapimotherfucker")
      .then(items => {
        console.log("Fetched items:", items);
      });
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="logo">Delta API</h1>
      </header>
      {isLoggedIn ? (
        <div className='tesets'>
          <nav className="sidebar">
            <ul className="nav-list">
              {Object.keys(navItems).map((itemName) => (
                <li
                  key={itemName}
                  className={`nav-item ${activeNavItem === itemName ? 'active' : ''}`}
                  onClick={() => handleNavItemClick(itemName)}
                >
                  <a href="#">{itemName}</a>
                </li>
              ))}
            </ul>
          </nav>
          <main className="main">
            <div className="search-bar">
              <Search width={30} height={30} />
              <input
                className="search-input"
                type="text"
                placeholder="Search all APIs…"
                value={searchTerm}
                onChange={handleSearchTermChange}
              />
            </div>
            {filteredRelatedItems.length > 0 ? (
              <ul className="related-items-list">
                {filteredRelatedItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>No results found.</p>
            )}
          </main>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return processData(data);
  } catch (error) {
    console.error(error);
  }
}

function processData(data) {
  return data.map(item => ({
    name: item.name,
    description: item.description
  }));
}

export default App;
