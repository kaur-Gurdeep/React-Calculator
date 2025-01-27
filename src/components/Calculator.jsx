import React, { useState } from 'react';
import '../styles/Calculator.css';

function Calculator({ memory, setMemory, setHistory}) {
  const [currentInput, setCurrentInput] = useState(""); // Tracks the current number
  const [previousValue, setPreviousValue] = useState(null); // Stores the previous value
  const [operator, setOperator] = useState(null); // Stores the selected operator
  const [result, setResult] = useState(null); // Stores the result of the calculation
  const [calculationHistory, setCalculationHistory] = useState(""); // Tracks the last result or expression
  const [isResultFinal, setIsResultFinal] = useState(false); //Store the results

  const handleNumberClick = (num) => {
    if (isResultFinal) {
      setCurrentInput(num);
      setResult(null);
      setCalculationHistory(""); 
      setIsResultFinal(false); 
    } 
    else if (result !== null) {
      setCurrentInput(num);
      setResult(null);
      setCalculationHistory(""); 
    } 
    else if (operator && currentInput === "") {
      setCurrentInput(num);
    } 
    else if (currentInput === "0") {
      // Prevent leading zeroes
      setCurrentInput(num);
    } 
    else {
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
      } 
      else {
        setPreviousValue(parseFloat(currentInput)); // Set current input as previous value
      }

      setOperator(op); // Directly use the operator passed
      setCalculationHistory((prev) => prev + " " + currentInput + " " + op);
      setCurrentInput("");
    } 
    else if (previousValue !== null) {
      if (operator) {
        // If an operator is already set, replace it with the new one
        setOperator(op);
        setCalculationHistory((prev) => prev.slice(0, -1) + op); // Replace the last operator in history
      } 
      else {
        setOperator(op); // Update the operator if no operator was previously set
        setCalculationHistory((prev) => prev + " " + op);
      }
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
      } 
      else {
        const formattedCalculation = formatScientific(calculation);
        setCalculationHistory(expression);
        setResult(calculation);
        setCurrentInput(calculation.toString());

        // Add the calculation to history
        setHistory((prevHistory) => [
          ...prevHistory,
          { expression: `${expression} ${formattedCalculation}` },
        ]);
      }

      setPreviousValue(null);
      setOperator(null);
    }
  };

  const formatScientific = (num) => {
    if (Math.abs(num) >= 1e20 || Math.abs(num) < 1e-4) {
      return num.toExponential(6); // Display in scientific notation with 6 decimal places
    } 
    else {
      if(Number.isInteger(num)){
        return num.toString();
      } 
      else {
        return num.toFixed(6);  // Display with 6 decimal places
      }
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
  
      // If the result is null but there's a memory value, update currentInput
      if (result === null || currentInput === "") {
        setCurrentInput(lastMemoryValue.toString()); // Show the memory value in the result div
      } 
      else {
        // Update the result with the memory value if a calculation was performed
        setResult(parseFloat(lastMemoryValue));
        setCurrentInput(lastMemoryValue.toString());
      }
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
    } 
    else if (result) {
      const current = parseFloat(result);
      setMemory([...memory, current]); // Save the result if there's no current input
    }
  };

  const handleReciprocal = () => {
    let value = result !== null ? result : currentInput; // Use result if available, else currentInput
    if (value !== "Error" && value !== "") {
      value = parseFloat(value);
      if (value === 0) {
        setCurrentInput("Error");
      } 
      else {
        const reciprocal = 1 / value;
        setCurrentInput(reciprocal.toString());
        setCalculationHistory(`1/(${value})`);
        setResult(reciprocal); 
      
      setHistory(prevHistory => [
        ...prevHistory,
        {expression : `1/(${value}) =`, result: reciprocal}
      ]);
      }
    }
  };

  const handleSquare = () => {
    if (currentInput !== "") {
      const value = parseFloat(currentInput);
      const result = value * value;
      setCurrentInput(result.toString());
      setCalculationHistory(`(${value})²`);
      setIsResultFinal(true);
      setResult(result);

    setHistory(prevHistory => [
      ...prevHistory,
      { expression: `(${value})² =`, result: result }
    ]);
    }
  };

 const handleSquareRoot = () => {
  if (currentInput !== "") {
    const value = parseFloat(currentInput);
    if (value < 0) {
      setCurrentInput("Error"); // Square root of a negative number is undefined
    } 
    else {
      const result = Math.sqrt(value);
      setCurrentInput(result.toString());
      setCalculationHistory(`√(${value})`);
      setIsResultFinal(true);
      setResult(result);

      setHistory(prevHistory => [
        ...prevHistory,
        { expression: `√(${value}) =`, result: result }
      ]);
    }
  }
};

const handleNegate = () => {
  let valueToNegate;

  if (result !== null) {
    valueToNegate = result;  // Negate the result if it exists
    setResult(-valueToNegate);  // Update the result with the negated value
    setCurrentInput((-valueToNegate).toString());  // Show the negated result in the current input
  } 
  else {
    // No result yet, negate the current input
    valueToNegate = parseFloat(currentInput);
    if (isNaN(valueToNegate)) {
      setCurrentInput("Invalid Input");
    } 
    else {
      setCurrentInput((-valueToNegate).toString());  // Negate the current input
    
    setHistory(prevHistory => [
      ...prevHistory,
      { expression: `-${valueToNegate} =`, result: -valueToNegate }
    ]);
    }
  }
};

const handleDecimal = () => {
  // If there's no input, start with 0.
  if (currentInput === "") {
    setCurrentInput("0.");
  } 
  else if (!currentInput.includes(".")) {
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
        <button onClick={() => handleOperatorClick('/')}>/</button>
        <button onClick={handleReciprocal}>1/x</button>
        <button onClick={handleSquare}>x²</button>
        <button onClick={handleSquareRoot}>√x</button>
        <button onClick={() => handleOperatorClick('*')}>*</button>
        <button onClick={() => handleNumberClick('7')}>7</button>
        <button onClick={() => handleNumberClick('8')}>8</button>
        <button onClick={() => handleNumberClick('9')}>9</button>
        <button onClick={() => handleOperatorClick('-')}>-</button>
        <button onClick={() => handleNumberClick('4')}>4</button>
        <button onClick={() => handleNumberClick('5')}>5</button>
        <button onClick={() => handleNumberClick('6')}>6</button>
        <button onClick={() => handleOperatorClick('+')}>+</button> 
        <button onClick={() => handleNumberClick('1')}>1</button>
        <button onClick={() => handleNumberClick('2')}>2</button>
        <button onClick={() => handleNumberClick('3')}>3</button> 
        <button onClick={handleNegate}>±</button>
        <button onClick={() => handleNumberClick('0')}>0</button>
        <button onClick={handleDecimal}>.</button>
        <button onClick={handleCalculate} className="highlighted-button">=</button>
      </div>
    </div>
  );
}

export default Calculator;
