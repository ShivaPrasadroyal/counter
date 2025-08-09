import React from 'react';

const Counter = ({ 
  counterValue, 
  onIncrement, 
  onDecrement, 
  onAdd 
}) => {
  return (
    <div className="counter-section">
      <div className="counter-display">
        <h2 className="counter-value">{counterValue}</h2>
      </div>
      
      <div className="counter-controls">
        <button 
          className="btn btn-decrement"
          onClick={onDecrement}
          aria-label="Decrement counter"
        >
          –
        </button>
        
        <button 
          className="btn btn-increment"
          onClick={onIncrement}
          aria-label="Increment counter"
        >
          +
        </button>
        
        <button 
          className="btn btn-add"
          onClick={onAdd}
          disabled={counterValue === 0}
          aria-label="Add number to list"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Counter;