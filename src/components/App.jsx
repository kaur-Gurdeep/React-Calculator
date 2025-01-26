import React, { useState } from 'react';
import Calculator from './Calculator.jsx';
import Tabs from './Tabs.jsx';
import '../styles/App.css';

function App() {
  const [memory, setMemory] = useState([]); // Manage memory state

  return (
    <div className="app-container">
      {/* Calculator Section */}
      <div className="calculator-section">
        <Calculator memory={memory} setMemory={setMemory} />
      </div>
      {/* Tabs Section */}
      <Tabs memory={memory} setMemory={setMemory} />
    </div>
  );
}

export default App;
