"use client";
import React from 'react';

interface CloseMenuProps {
  onClose: () => void;
  className?: string;
}

const CloseMenu: React.FC<CloseMenuProps> = ({ onClose, className = '' }) => {
  return (
    <button
      onClick={onClose}
      className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${className}`}
      aria-label="Close menu"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
};

export default CloseMenu;
