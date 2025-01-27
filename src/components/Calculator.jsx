import React, { useState } from 'react';
import '../styles/Calculator.css';

function Calculator({ memory, setMemory}) {
  const [currentInput, setCurrentInput] = useState(""); // Tracks the current number
  const [previousValue, setPreviousValue] = useState(null); // Stores the previous value
  const [operator, setOperator] = useState(null); // Stores the selected operator
  const [result, setResult] = useState(null); // Stores the result of the calculation
  const [calculationHistory, setCalculationHistory] = useState(""); // Tracks the last result or expression
  const [isResultFinal, setIsResultFinal] = useState(false);

  const handleNumberClick = (num) => {
    if (isResultFinal) {
      // Reset everything for a fresh calculation after a result
      setCurrentInput(num);
      setResult(null);
      setCalculationHistory(""); // Clear history for a fresh start
      setIsResultFinal(false); // Reset the result state
    } else if (result !== null) {
      // Handle fresh calculation after showing a result
      setCurrentInput(num);
      setResult(null);
      setCalculationHistory(""); // Clear history for a fresh start
    } else if (operator && currentInput === "") {
      // Start entering new input after an operator is selected
      setCurrentInput(num);
    } else if (currentInput === "0") {
      // Prevent leading zeroes
      setCurrentInput(num);
    } else {
      // Append the new number to the current input
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
          calculation = current === 0 ? "Error" : previousValue / current;
          // calculation = current !== 0 ? previousValue / current : "Error";
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
    setMemory([]);
  };

  const handleMemoryRecall = () => {
    if (memory.length > 0) {
      const lastMemoryValue = memory[memory.length - 1];
      setCurrentInput(lastMemoryValue.toString()); // Show the memory value in the result div
    }
  };

  const handleMemoryAdd = () => {
    if (memory.length > 0) {
      const lastMemoryValue = memory[memory.length - 1];
      const current = parseFloat(currentInput || result || 0);
      const newMemoryValue = lastMemoryValue + current;
      setMemory([...memory.slice(0, memory.length - 1), newMemoryValue]);
      setCalculationHistory(`${current}`);
    }
  };

  const handleMemorySubtract = () => {
    if (memory.length > 0) {
      const lastMemoryValue = memory[memory.length - 1];
      const current = parseFloat(currentInput || result || 0);
      const newMemoryValue = lastMemoryValue - current;
      setMemory([...memory.slice(0, memory.length - 1), newMemoryValue]);
      setCalculationHistory(`${current}`);
    }
  };

  const handleMemorySave = () => {
    if (currentInput) {
      const current = parseFloat(currentInput);
      setMemory([...memory, current]); // Save only the current input value
    } else if (result) {
      const current = parseFloat(result);
      setMemory([...memory, current]); // Save the result if there's no current input
    }
  };

  const handleReciprocal = () => {
    if(currentInput != ""){
      const value = parseFloat(currentInput);
      if(value === 0){
        setCurrentInput("Error");
      }
      else
      {
        const result = 1/value;
        setCurrentInput(result.toString());
        setCalculationHistory(`1/(${value})`);
      }
    }

  }
  const handleSquare = () => {
    if (currentInput !== "") {
      const value = parseFloat(currentInput);
      const result = value * value;
      setCurrentInput(result.toString());
      setCalculationHistory(`(${value})²`);
      setIsResultFinal(true);
    }
  };

 const handleSquareRoot = () => {
  if (currentInput !== "") {
    const value = parseFloat(currentInput);
    if (value < 0) {
      setCurrentInput("Error"); // Square root of a negative number is undefined
    } else {
      const result = Math.sqrt(value);
      setCurrentInput(result.toString());
      setCalculationHistory(`√(${value})`);
      setIsResultFinal(true);
    }
  }
};

const handleNegate = () => {
  if(currentInput !== "") {
    const value = parseFloat(currentInput);
    if(value === 0){
      setCurrentInput("0");
    }
    else{
      const result = -value;
      setCurrentInput(result.toString()); 
    }
  }
}
const handleDecimal = () => {
  // If there's no input, start with '0.'
  if (currentInput === "") {
    setCurrentInput("0.");
  } else if (!currentInput.includes(".")) {
    // If the input does not already contain a decimal point, append one
    setCurrentInput(currentInput + ".");
  }
};

  return (
    <div className="calculator">
      {/* Display */}
      <div className="display">
        <div className="calculation">{calculationHistory}</div>
        <div className="result">
          {result !== null ? result : currentInput || previousValue || "0"}
        </div>
      </div>

      {/* Memory and Operation Buttons */}
      <div className="memory-operations">
         <button onClick={handleMemoryClear} disabled={memory.length === 0}>MC</button> {/*Clears all stored memory values*/}
        <button onClick={handleMemoryRecall} disabled={memory.length === 0}>MR</button> {/*Displays the most recently saved memory value in the result div*/}
        <button onClick={handleMemoryAdd}>M+</button> {/*Adds the current result or currentInput value to the last saved memory value*/}
        <button onClick={handleMemorySubtract}>M-</button> {/*Subtracts the current result or currentInput value from the last saved memory value*/}
        <button onClick={handleMemorySave}>MS</button> {/*Stores the current input value in memory without overwriting previous memory values*/}
      </div>

      {/* Calculator Buttons */}
      <div className="buttons">
        <button onClick={() => handleOperatorClick('%')}>%</button>
        <button onClick={handleClearEntry}>CE</button>
        <button onClick={handleAllClear}>C</button>
        <button onClick={handleReciprocal}>1/x</button>
        <button onClick={handleSquare}>x²</button>
        <button onClick={handleSquareRoot}>√x</button>
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
        <button onClick={handleNegate}>±</button>
        <button onClick={() => handleNumberClick('0')}>0</button>
        <button onClick={handleDecimal}>.</button>
        <button onClick={handleCalculate} className="highlighted-button">=</button>
      </div>
    </div>
  );
}

export default Calculator;
