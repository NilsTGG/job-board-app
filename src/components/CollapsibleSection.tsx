import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CollapsibleSectionProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  previewContent?: React.ReactNode;
  className?: string;
  headerClassName?: string;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  subtitle,
  icon,
  children,
  defaultOpen = false,
  previewContent,
  className = '',
  headerClassName = ''
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`bg-gray-800 rounded-lg border border-gray-700 overflow-hidden ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-700 transition-colors ${headerClassName}`}
      >
        <div className="flex items-center space-x-3">
          {icon && <div className="flex-shrink-0">{icon}</div>}
          <div>
            <h3 className="text-white font-semibold text-lg">{title}</h3>
            {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {!isOpen && previewContent && (
            <div className="text-gray-400 text-sm hidden sm:block">
              {previewContent}
            </div>
          )}
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </button>
      
      {isOpen && (
        <div className="px-6 pb-6 border-t border-gray-700">
          <div className="pt-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollapsibleSection;