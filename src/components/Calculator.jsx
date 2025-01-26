import React, { useState } from 'react';
import '../styles/Calculator.css';

function Calculator() {
  const [currentInput, setCurrentInput] = useState(""); // Tracks the current number
  const [previousValue, setPreviousValue] = useState(null); // Stores the previous value
  const [operator, setOperator] = useState(null); // Stores the selected operator
  const [result, setResult] = useState(null); // Stores the result of the calculation
  const [calculationHistory, setCalculationHistory] = useState(""); // Tracks the last result or expression
  const [memory, setMemory] = useState(0); //Memory Value
  // const [isMemoryStored, setIsMemoryStored] = useState(false);

  const handleNumberClick = (num) => {
    if (currentInput === "0" && num !== "0") {
      setCurrentInput(num);
    } else if (result !== null) {
      setCurrentInput(num); // Start fresh with the clicked number
      setResult(null); // Reset result after using it
      setCalculationHistory(""); // Clear the calculation history
    } else if (operator !== null && currentInput === "") {
      setCurrentInput(num);
    } else {
      setCurrentInput((prev) => prev + num);
    }
  };

  const handleOperatorClick = (op) => {
    if (op === "%" && previousValue !== null && currentInput !== "") {
      const percentageValue = (previousValue * parseFloat(currentInput)) / 100;
      setCurrentInput(percentageValue.toString());
      setCalculationHistory(`${previousValue} * (${currentInput}%)`);
      return;
    }

    if (currentInput !== "") {
      if (result !== null) {
        setPreviousValue(result); // Use result as the starting point
        setResult(null); // Reset result
        setCalculationHistory("");
      } else {
        setPreviousValue(parseFloat(currentInput)); // Set current input as previous value
      }

      setOperator(op); // Directly use the operator passed
      setCalculationHistory((prev) => prev + " " + currentInput + " " + op);
      setCurrentInput("");
    } else if (previousValue !== null) {
      setOperator(op); // Update operator if no current input
      setCalculationHistory((prev) => prev + " " + op);
    }
  };

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
        case "/":
          calculation = current !== 0 ? previousValue / current : "Error";
          break;
        case "%":
          calculation = previousValue % current;
          break;
        default:
          break;
      }

      const expression = `${previousValue} ${operator} ${current} =`;

      if (calculation === "Error") {
        handleAllClear();
      } else {
        setCalculationHistory(expression);
        setResult(calculation);
        setCurrentInput(calculation.toString());
      }

      setPreviousValue(null);
      setOperator(null);
    }
  };

  const handleAllClear = () => {
    setCurrentInput("");
    setPreviousValue(null);
    setOperator(null);
    setResult(null);
    setCalculationHistory("");
  };

  const handleClearEntry = () => {
    setCurrentInput("0");
  };

  const handleMemoryClear = () => {
    setMemory(0);
  }
  const handleMemoryRecall = () => {
    setCurrentInput(memory.toString());
    setCalculationHistory(`Memory Recall: ${memory}`);
  }
  const handleMemoryAdd = () => {
    setMemory(memory + parseFloat(currentInput || 0));
    setCalculationHistory(`Memory Add: ${currentInput}`);
  }
  const handleMemorySubtract = () => {
    setMemory(memory - parseFloat(currentInput || 0));
    setCalculationHistory(`Memory Subtract: ${currentInput}`);
  }
  const handleMemorySave = () => {
    setMemory(parseFloat(currentInput || 0));
    setCalculationHistory(`Memory Save: ${currentInput}`);
  }

  return (
    <div className="calculator">
      {/* Display */}
      <div className="display">
        <div className="calculation">{calculationHistory}</div>
        <div className="result">
          {result !== null ? result : currentInput || previousValue}
        </div>
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
        <button onClick={() => handleOperatorClick('%')}>%</button>
        <button onClick={handleClearEntry}>CE</button>
        <button onClick={handleAllClear}>C</button>
        <button onClick={() => handleOperatorClick('/')}>/</button>
        <button onClick={() => handleNumberClick('7')}>7</button>
        <button onClick={() => handleNumberClick('8')}>8</button>
        <button onClick={() => handleNumberClick('9')}>9</button>
        <button onClick={() => handleOperatorClick('*')}>*</button>
        <button onClick={() => handleNumberClick('4')}>4</button>
        <button onClick={() => handleNumberClick('5')}>5</button>
        <button onClick={() => handleNumberClick('6')}>6</button>
        <button onClick={() => handleOperatorClick('-')}>-</button>
        <button onClick={() => handleNumberClick('1')}>1</button>
        <button onClick={() => handleNumberClick('2')}>2</button>
        <button onClick={() => handleNumberClick('3')}>3</button>
        <button onClick={() => handleOperatorClick('+')}>+</button>
        <button onClick={() => handleNumberClick('0')}>0</button>
        <button onClick={handleCalculate} className="highlighted-button">=</button>
      </div>
    </div>
  );
}

export default Calculator;
