import React from 'react';
import { useState } from 'react';
import Calculator from './Calculator.jsx';
import Tabs from './Tabs.jsx';
import '../styles/App.css';

function App() {
  return (
    <div className="app-container">
      {/* Calculator Section */}
      <div className="calculator-section">
        <Calculator />
      </div>
      {/* Tabs Section */}
      <Tabs/>
    </div>
  );
}

export default App;
