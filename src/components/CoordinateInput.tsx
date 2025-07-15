import React, { useState } from 'react';
import { MapPin, Package, CheckCircle, AlertCircle, ChevronDown, ChevronUp, Gamepad2, Smartphone } from 'lucide-react';
import { DistanceCalculator } from '../utils/distanceCalculator';

interface CoordinateInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: React.ReactNode;
  error?: string;
  type: 'pickup' | 'delivery';
}

const CoordinateInput: React.FC<CoordinateInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  icon,
  error,
  type
}) => {
  const [isValid, setIsValid] = useState(false);
  
  const handleChange = (inputValue: string) => {
    onChange(inputValue);
    
    // Real-time validation feedback
    const validation = DistanceCalculator.validateCoordinates(inputValue);
    setIsValid(validation.isValid);
  };
  
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </label>
      
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors ${
            error 
              ? 'border-red-500 focus:ring-red-500' 
              : isValid && value
              ? 'border-green-500 focus:ring-green-500'
              : 'border-gray-600 focus:ring-blue-500'
          }`}
        />
        
        {/* Validation indicator */}
        <div className="absolute right-3 top-3">
          {value && (isValid ? 
            <CheckCircle className="h-5 w-5 text-green-400" /> :
            <AlertCircle className="h-5 w-5 text-red-400" />
          )}
        </div>
      </div>
      
      {error && (
        <p className="text-red-400 text-sm mt-1">{error}</p>
      )}
      
      {/* Format helper */}
      <p className="text-gray-500 text-xs mt-1">
        Format: X, Y, Z (e.g., {placeholder})
      </p>
    </div>
  );
};

const CoordinateTips: React.FC = () => {
  const [showTips, setShowTips] = useState(false);
  
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <button
        type="button"
        onClick={() => setShowTips(!showTips)}
        className="flex items-center justify-between w-full text-left"
      >
        <span className="text-blue-400 font-medium">How to get coordinates</span>
        {showTips ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      
      {showTips && (
        <div className="mt-3 space-y-2 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <Gamepad2 className="h-4 w-4 text-green-400" />
            <span><strong>Java Edition:</strong> Press F3, look for XYZ coordinates</span>
          </div>
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-blue-400" />
            <span><strong>Bedrock Edition:</strong> Enable "Show Coordinates" in world settings</span>
          </div>
          <div className="bg-gray-700 rounded p-2 mt-2">
            <div className="text-xs text-gray-400 mb-1">Example formats:</div>
            <div className="font-mono text-green-400">100, 64, -200</div>
            <div className="font-mono text-green-400">X: 100 Y: 64 Z: -200</div>
            <div className="font-mono text-green-400">100 64 -200</div>
          </div>
        </div>
      )}
    </div>
  );
};

export { CoordinateInput, CoordinateTips };