import React from 'react';
import {useState} from 'react';
import '../styles/Calculator.css';

function Calculator(){

  const [calculation, setCalculation] = useState('');
  const [result, setResult] = useState('');
  const [memory, setMemory] = useState(0);

  // Handlers for number and operation buttons
  const handleNumberClick = (number) => setCalculation(calculation + number);
  const handleOperationClick = (operation) => setCalculation(calculation + ` ${operation} `);

  // Handle clear operations
  const handleClearEntry = () => setCalculation('');
  const handleAllClear = () => {
    setCalculation('');
    setResult('');
  };

  // Handle backspace (⌫)
  const handleBackspace = () => setCalculation(calculation.slice(0, -1));

  // Handle memory operations
  const handleMemoryClear = () => setMemory(0);
  const handleMemoryRecall = () => setCalculation(calculation + memory);
  const handleMemoryAdd = () => setMemory(memory + parseFloat(result || 0));
  const handleMemorySubtract = () => setMemory(memory - parseFloat(result || 0));
  const handleMemorySave = () => setMemory(parseFloat(result || 0));

  // Handle special operations
  const handleSquareRoot = () => setResult(Math.sqrt(parseFloat(calculation)));
  const handleSquare = () => setResult(Math.pow(parseFloat(calculation), 2));
  const handleReciprocal = () => setResult(1 / parseFloat(calculation));
  const handleNegate = () => setCalculation(String(-parseFloat(calculation)));

  // Handle decimal point
  const handleDecimal = () => {
    if (!calculation.includes('.')) {
      setCalculation(calculation + '.');
    }
  };

  // Handle "=" to evaluate the expression
  const handleResult = () => {
    try {
      const sanitizedExpression = calculation.replace('÷', '/').replace('×', '*');
      const evalResult = eval(sanitizedExpression); // Use eval with caution
      setResult(evalResult);
    } catch (error) {
      setResult('Error');
    }
  };
  
  // const [currentValue, setCurrentValue] = useState(0);
  // const [calculation, setCalculation] = useState('');
  // const [memory, setMemory] = useState('');

  // const handleNumberClick = (num) => {
  //   setCalculation(calculation + num);
  // };
  // const handleOperationClick = (operation) => {
  //   setCalculation(calculation + operation);
  // };

  // const handleResult = () => {
  //   try {
  //     setCurrentValue(eval(calculation)); 
  //     setCalculation('');
  //   } catch (e) {
  //     setCurrentValue('Error');
  //   }
  // };

  // const handleAllClear = () => {
  //   setCurrentValue(0);
  //   setCalculation('');
  // };

  // const handleClearEntry = () => {

  // }

  // const handleMemoryAdd = () => {
    
  // };


  // const handleMemoryRecall = () => {
    
  // };

  // const handleMemoryClear = () => {
    
  // };


  return (
    <div className="calculator">
      {/* Display */}
      <div className="display">
        <div className="calculation"></div>
        <div className="result"></div>
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
        <button onClick={() => handleOperationClick('%')}>%</button>
        <button onClick={handleClearEntry}>CE</button>
        <button onClick={handleAllClear}>C</button>
        <button onClick={handleBackspace}>⌫</button>
        <button onClick={handleReciprocal}>1/x</button>
        <button onClick={handleSquare}>x²</button>
        <button onClick={handleSquareRoot}>√x</button>
        <button onClick={() => handleOperationClick('÷')}>÷</button>
        <button onClick={() => handleNumberClick('7')}>7</button>
        <button onClick={() => handleNumberClick('8')}>8</button>
        <button onClick={() => handleNumberClick('9')}>9</button>
        <button onClick={() => handleOperationClick('×')}>×</button>
        <button onClick={() => handleNumberClick('4')}>4</button>
        <button onClick={() => handleNumberClick('5')}>5</button>
        <button onClick={() => handleNumberClick('6')}>6</button>
        <button onClick={() => handleOperationClick('-')}>-</button>
        <button onClick={() => handleNumberClick('1')}>1</button>
        <button onClick={() => handleNumberClick('2')}>2</button>
        <button onClick={() => handleNumberClick('3')}>3</button>
        <button onClick={() => handleOperationClick('+')}>+</button>
        <button onClick={handleNegate}>±</button>
        <button onClick={() => handleNumberClick('0')}>0</button>
        <button onClick={handleDecimal}>.</button>
        <button onClick={handleResult} className="highlighted-button">=</button>
      </div>
    </div>
  );
}

export default Calculator;