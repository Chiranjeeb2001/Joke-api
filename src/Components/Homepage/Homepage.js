
import React, { useEffect, useState } from 'react';
import './Homepage.css'; 

const Homepage = ({ onBack,onLogout }) => {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    fetchJokes();
  }, []);

  const fetchJokes = async () => {
    try {
      const response = await fetch(
        'https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10'
      );
      const data = await response.json();
      setJokes(data.jokes || []);
    } catch (error) {
      console.error('Error fetching jokes:', error);
    }
  };

  return (
    <div className="homepage-container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Jokes</h2>
        <button className="btn logout-btn" onClick={onBack}>
          Logout
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Joke</th>
          </tr>
        </thead>
        <tbody>
          {jokes.map((joke) => (
            <tr key={joke.id}>
              <td>{joke.id}</td>
              <td>{joke.joke}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Homepage;
