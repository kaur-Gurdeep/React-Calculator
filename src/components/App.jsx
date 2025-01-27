import React from 'react';
import { useState } from 'react';
import Calculator from './Calculator.jsx';
import Tabs from './Tabs.jsx';
import '../styles/App.css';

function App() {
  const [memory, setMemory] = useState([]); // Manage memory state
  const [history, setHistory] = useState([]); //Manage History

  return (
    <div className="app-container">
      {/* Calculator Section */}
      <div className="calculator-section">
        <Calculator 
        memory={memory} 
        setMemory={setMemory} 
        setHistory={setHistory}/>
      </div>
      {/* Tabs Section */}
      <Tabs 
      memory={memory} 
      setMemory={setMemory} 
      history={history} />
    </div>
  );
}

export default App;
