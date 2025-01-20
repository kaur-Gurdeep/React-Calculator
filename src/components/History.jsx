import React from 'react';

function History() {
  return (
    <div className="history-tab">
      <p>No history available</p>
    </div>
  );
}

export default History


// import React, { useState } from 'react';

// function History() {
//   const [history, setHistory] = useState([]);

//   const addToHistory = (calculation) => {
//     setHistory((prevHistory) => [...prevHistory, calculation]);
//   };

//   return (
//     <div className="history-tab">
//       <h3>History</h3>
//       {history.length === 0 ? (
//         <p>No history available</p>
//       ) : (
//         <ul>
//           {history.map((item, index) => (
//             <li key={index}>{item}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default History;