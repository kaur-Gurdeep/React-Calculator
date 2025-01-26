import React, { useState } from 'react';
import History from './History.jsx';
import Memory from './Memory.jsx';
import Calculator from './Calculator.jsx';
import '../styles/Tabs.css';

function Tabs() {
  const [activeTab, changeTab] = useState('History');
  const [memory, setMemory] = useState(0); 
  
  return (
    <div className="tabs-section">
      {/* Tabs Buttons */}
      <div className="tabs">
      <button 
          className={activeTab === 'History' ? 'active-tab' : ''} 
          onClick={() => changeTab('History')}
        >
          History
        </button>

        <button 
          className={activeTab === 'Memory' ? 'active-tab' : ''} 
          onClick={() => changeTab('Memory')}
        >
          Memory
        </button>
      </div>
      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'History' ? <History /> : <Memory />}
      </div>
    </div>
  );
}

export default Tabs;
