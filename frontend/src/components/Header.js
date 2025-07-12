import React from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">LexiForge</span>
            <span className="text-sm bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
              Revolutionary AI
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Demo
            </Link>
            <Link to="/pricing" className="text-gray-700 hover:text-blue-600 font-medium">
              Pricing
            </Link>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">
              Get Started
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

