import React from 'react';

function History({ history }) {
  return (
    <div className="history-tab">
      {history.length === 0 ? (
        <p>There's no history yet</p>
      ) : (
        history.map((entry, index) => (
          <div key={index}>
            <p>{entry.expression}  {entry.result}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default History;
