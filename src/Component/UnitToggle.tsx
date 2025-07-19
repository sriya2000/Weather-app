import React from 'react';

interface UnitToggleProps {
  unit: 'C' | 'F';
  onToggle: (unit: 'C' | 'F') => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ unit, onToggle }) => {
  return (
    <div className="unit-toggle">
      <button
        className={`unit-btn ${unit === 'C' ? 'active' : ''}`}
        onClick={() => onToggle('C')}
      >
        °C
      </button>
      <button
        className={`unit-btn ${unit === 'F' ? 'active' : ''}`}
        onClick={() => onToggle('F')}
      >
        °F
      </button>
    </div>
  );
};

export default UnitToggle;
