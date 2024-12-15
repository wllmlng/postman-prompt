import React from 'react';
import './App.css';
import data from './Data/mock-request-data.json'
import Navbar from './components/Navbar/Navbar.tsx'
import '@fortawesome/fontawesome-free/css/all.min.css';
import HealthDashboard from './components/HealthDashboard/HealthDashboard.tsx'
// error: ""
// path: "/"
// response_time: 852
// status_code: 201
// timestamp: "2023-09-01T01:09:24.000Z"
function App() {
  console.log('dataa', data)
  return (
    <div className="App">
      <Navbar />
      <HealthDashboard />
      {/* {data.map(({error, path, response_time, status_code, timestamp})=>{
        return (
          <div >
            <div>{error}</div>
            <div>{path}</div>
            <div>{response_time}</div>
            <div>{status_code}</div>
            <div>{timestamp}</div>
          </div>
        )
      })} */}
    </div>
  );
}

export default App;
