import React from 'react';
import './App.css';
import  Dashboard from './components/Dashboard';
function App() {
  return (
    <div className="App">
      <header className="header">
      <nav> Project Dashboard</nav>
      </header>
      <main>
      <Dashboard />
      </main> 
      <footer> ©2022 A.G.I Production LLC</footer>
    </div>
  );
}

export default App;
