import React from 'react';
import { useState } from 'react';
import Calculator from './Calculator.jsx';
import History from './History.jsx';
import Memory from './Memory.jsx';
import '../styles/App.css';
import '../styles/Tabs.css'; 

function App() {
  const [activeTab, changeTab] = useState('Memory');
  return (
    <div className="app-container">
      {/* Calculator Section */}
      <div className="calculator-section">
        <Calculator />
      </div>

      {/* Tabs Section */}
      <div className="tabs-section">
        {/* Tabs Buttons */}
        <div className="tabs">
          <button className={activeTab == 'Memory' ? 'active-tab' : ''}
          onClick={() => changeTab('Memory')}>
            Memory
          </button>
          <button className={activeTab == 'History' ? 'active-tab' : ''}
          onClick={() => changeTab('History')}>
            History 
          </button>
        </div>
        {/* Tab Content */}
        <div className="tab-content">
          {activeTab == 'History' ? <History/> : <Memory/>}
        </div>     
      </div> 
    </div>
  );
}

export default App;
