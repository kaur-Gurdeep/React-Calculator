import React, { useState } from 'react';
import History from './History.jsx';
import Memory from './Memory.jsx';
import '../styles/Tabs.css';

function Tabs({ memory }) {
  const [activeTab, changeTab] = useState('History');

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
        {activeTab === 'History' ? <History /> : <Memory memory={memory} />}
      </div>
    </div>
  );
}

export default Tabs;
