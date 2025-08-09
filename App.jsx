import React, { useState, useEffect } from 'react';
import Counter from './Counter.jsx';
import ListView from './ListView.jsx';

const App = () => {
  // State management
  const [counterValue, setCounterValue] = useState(0);
  const [numbers, setNumbers] = useState([]);
  const [sortAscending, setSortAscending] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const savedNumbers = localStorage.getItem('raiqa_numbers');
    const savedSortOrder = localStorage.getItem('raiqa_sort_order');
    
    if (savedNumbers) {
      try {
        const parsedNumbers = JSON.parse(savedNumbers);
        setNumbers(parsedNumbers);
      } catch (error) {
        console.error('Error loading saved numbers:', error);
      }
    }
    
    if (savedSortOrder) {
      setSortAscending(savedSortOrder === 'true');
    }
  }, []);

  // Save to localStorage whenever numbers or sort order changes
  useEffect(() => {
    localStorage.setItem('raiqa_numbers', JSON.stringify(numbers));
  }, [numbers]);

  useEffect(() => {
    localStorage.setItem('raiqa_sort_order', sortAscending.toString());
  }, [sortAscending]);

  // Counter handlers
  const handleIncrement = () => {
    setCounterValue(prev => prev + 1);
  };

  const handleDecrement = () => {
    setCounterValue(prev => Math.max(0, prev - 1));
  };

  const handleAdd = () => {
    if (counterValue > 0) {
      // Prevent duplicates (optional feature)
      if (!numbers.includes(counterValue)) {
        const newNumbers = [...numbers, counterValue];
        // Sort immediately based on current sort order
        const sortedNumbers = sortAscending 
          ? newNumbers.sort((a, b) => a - b)
          : newNumbers.sort((a, b) => b - a);
        
        setNumbers(sortedNumbers);
      }
      setCounterValue(0);
    }
  };

  // List handlers
  const handleSort = () => {
    const newSortOrder = !sortAscending;
    setSortAscending(newSortOrder);
    
    const sortedNumbers = [...numbers].sort((a, b) => 
      newSortOrder ? a - b : b - a
    );
    setNumbers(sortedNumbers);
  };

  const handleReset = () => {
    setNumbers([]);
    setCounterValue(0);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Number Counter & List</h1>
      </header>
      
      <Counter 
        counterValue={counterValue}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onAdd={handleAdd}
      />
      
      <ListView 
        numbers={numbers}
        sortAscending={sortAscending}
        onSort={handleSort}
        onReset={handleReset}
      />
    </div>
  );
};

export default App;