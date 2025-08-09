import React from 'react';

const ListView = ({ 
  numbers, 
  sortAscending, 
  onSort, 
  onReset 
}) => {
  const getHighestLowest = () => {
    if (numbers.length === 0) return { highest: null, lowest: null };
    const highest = Math.max(...numbers);
    const lowest = Math.min(...numbers);
    return { highest, lowest };
  };

  const { highest, lowest } = getHighestLowest();

  const getItemClass = (number) => {
    let className = 'number-item';
    if (numbers.length > 1) {
      if (number === highest && number !== lowest) {
        className += ' highest';
      } else if (number === lowest && number !== highest) {
        className += ' lowest';
      }
    }
    return className;
  };

  return (
    <div className="list-section">
      <div className="list-header">
        <h3 className="list-title">
          Numbers ({numbers.length})
        </h3>
        
        <div>
          <button 
            className="btn btn-sort"
            onClick={onSort}
            disabled={numbers.length === 0}
            aria-label={`Sort ${sortAscending ? 'descending' : 'ascending'}`}
          >
            Sort {sortAscending ? '↓' : '↑'}
          </button>
          
          {numbers.length > 0 && (
            <button 
              className="btn btn-reset"
              onClick={onReset}
              aria-label="Clear all numbers"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {numbers.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📝</div>
          <p className="empty-text">
            Add some numbers to see them here!
          </p>
        </div>
      ) : (
        <div className="numbers-list">
          {numbers.map((number, index) => (
            <div 
              key={`${number}-${index}`}
              className={getItemClass(number)}
            >
              {number}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListView;