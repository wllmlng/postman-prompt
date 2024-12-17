import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar.tsx'
import '@fortawesome/fontawesome-free/css/all.min.css';
import HealthDashboard from './components/HealthDashboard/HealthDashboard.tsx'

function App() {
  return (
    <div className="App">
      <Navbar />
      <HealthDashboard />
    </div>
  );
}

export default App;
