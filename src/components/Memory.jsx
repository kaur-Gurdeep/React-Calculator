import React from 'react';

function Memory() {
  return (
    <div className="memory-tab">
      <p>There's nothing saved in your memory</p>
    </div>
  );
}

export default Memory;


// import React, { useState } from 'react';

// function Memory() {
//   const [memory, setMemory] = useState(null);

//   const handleMemoryAdd = (value) => {
//     setMemory(memory + value);
//   };

//   const handleMemorySubtract = (value) => {
//     setMemory(memory - value);
//   };

//   const handleMemoryRecall = () => {
//     alert(`Memory value is: ${memory}`);
//   };

//   const handleMemoryClear = () => {
//     setMemory(null);
//   };

//   return (
//     <div className="memory-tab">
//       <p>{memory !== null ? `Memory: ${memory}` : 'No memory saved'}</p>
//       <button onClick={() => handleMemoryAdd(10)}>M+</button>
//       <button onClick={() => handleMemorySubtract(10)}>M-</button>
//       <button onClick={handleMemoryRecall}>MR</button>
//       <button onClick={handleMemoryClear}>MC</button>
//     </div>
//   );
// }

// export default Memory;
