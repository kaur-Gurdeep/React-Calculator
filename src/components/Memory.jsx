import React from 'react';
import '../styles/Memory.css';

function Memory({ memory }) {
  return (
    <div className="memory-tab">
      {memory.length === 0 ? (
        <p>There's nothing saved in your memory</p>
      ) : (
        <div className="memory-list">
          {memory
            .slice()
            .reverse()
            .map((value, index) => (
              <div key={index} className="memory-item">
                {value}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Memory;
