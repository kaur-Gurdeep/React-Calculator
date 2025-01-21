import React from 'react';
import {useState} from 'react';
import '../styles/Calculator.css';

function Calculator(){

  const [currentInput, setCurrentInput] = useState(""); // Tracks the current number
  const [previousValue, setPreviousValue] = useState(null); // Stores the previous value
  const [operator, setOperator] = useState(null); // Stores the selected operator
  const [result, setResult] = useState(null); // Tracks the final result

  const handleNumberClick = (num) => {
    setCurrentInput((prev) => prev + num);
  };
  // Handle operator clicks (+, -, *, /)
  const handleOperatorClick = (op) => {
    const mappedOperator = op === "×" ? "*" : op === "÷" ? "/" : op;
    if (currentInput !== "") {
      if (result !== null) {
        setPreviousValue(result);
        setResult(null);
      } else {
        setPreviousValue(parseFloat(currentInput));
      }
      setCurrentInput("");
      setOperator(mappedOperator);
    }
  };

// Perform the calculation
const handleCalculate = () => {
  if (operator && previousValue !== null && currentInput !== "") {
    const current = parseFloat(currentInput);
    let calculation = 0;
  
    switch (operator) {
      case "+":
        calculation = previousValue + current;
        break;
      case "-":
        calculation = previousValue - current;
        break;
      case "*":
        calculation = previousValue * current;
        break;
      case "%":
        calculation = previousValue % current;
        break;
      case "/":
        calculation = current !== 0 ? previousValue / current : "Error";
        break;
      default:
        break;
    }
  
    if (calculation === "Error") {
      handleAllClear(); // Clear all states on error
    } else {
      setResult(calculation);
    }
  
    setCurrentInput("");
    setPreviousValue(null);
    setOperator(null);
  }
};

// Clear all (AC)
const handleAllClear = () => {
  setCurrentInput("");
  setPreviousValue(null);
  setOperator(null);
  setResult(null);
};

// Clear current entry (C)
const handleClearEntry = () => {
  setCurrentInput("");
};

// Handle decimal point
const handleDecimal = () => {
  if (!currentInput.includes(".")) {
    setCurrentInput((prev) => prev + ".");
  }
};

// Handle positive/negative toggle
const handleNegate = () => {
  setCurrentInput((prev) => (prev.startsWith("-") ? prev.slice(1) : `-${prev}`));
};

const handleMemoryClear = () => {
  console.log("Memory Clear");
};

const handleMemoryRecall = () => {
  console.log("Memory Recall");
};

const handleMemoryAdd = () => {
  console.log("Memory Add");
};

const handleMemorySubtract = () => {
  console.log("Memory Subtract");
};

const handleMemorySave = () => {
  console.log("Memory Save");
};

const handleReciprocal = () => {
  console.log("Reciprocal function not implemented yet");
};

const handleSquare = () => {
  console.log("Square function not implemented yet");
};

const handleSquareRoot = () => {
  console.log("Square Root function not implemented yet");
};

  return (
    <div className="calculator">
      {/* Display */}
      <div className="display">
        <div className="calculation">
          {previousValue} {operator} {currentInput}
        </div>
        <div className="result">{result !== null ? `= ${result}` : ""}</div>
      </div>

      {/* Memory and Operation Buttons */}
      <div className="memory-operations">
        <button onClick={handleMemoryClear}>MC</button>
        <button onClick={handleMemoryRecall}>MR</button>
        <button onClick={handleMemoryAdd}>M+</button>
        <button onClick={handleMemorySubtract}>M-</button>
        <button onClick={handleMemorySave}>MS</button>
      </div>

      {/* Calculator Buttons */}
      <div className="buttons">
        <button onClick={() =>  handleOperatorClick('%')}>%</button>
        <button onClick={handleClearEntry}>CE</button>
        <button onClick={handleAllClear}>C</button>
        {/* <button onClick={handleBackspace}>⌫</button> */}
        <button onClick={handleReciprocal}>1/x</button>
        <button onClick={handleSquare}>x²</button>
        <button onClick={handleSquareRoot}>√x</button>
        <button onClick={() =>  handleOperatorClick('÷')}>÷</button>
        <button onClick={() => handleNumberClick('7')}>7</button>
        <button onClick={() => handleNumberClick('8')}>8</button>
        <button onClick={() => handleNumberClick('9')}>9</button>
        <button onClick={() =>  handleOperatorClick('×')}>×</button>
        <button onClick={() => handleNumberClick('4')}>4</button>
        <button onClick={() => handleNumberClick('5')}>5</button>
        <button onClick={() => handleNumberClick('6')}>6</button>
        <button onClick={() =>  handleOperatorClick('-')}>-</button>
        <button onClick={() => handleNumberClick('1')}>1</button>
        <button onClick={() => handleNumberClick('2')}>2</button>
        <button onClick={() => handleNumberClick('3')}>3</button>
        <button onClick={() =>  handleOperatorClick('+')}>+</button>
        <button onClick={handleNegate}>±</button>
        <button onClick={() => handleNumberClick('0')}>0</button>
        <button onClick={handleDecimal}>.</button>
        <button onClick={handleCalculate} className="highlighted-button">=</button>
      </div>
    </div>
  );
}

export default Calculator;