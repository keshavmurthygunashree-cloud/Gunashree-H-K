
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <i className="fa-solid fa-file-invoice text-white text-xl"></i>
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">AI Resume Insight</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Analyzer</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Resources</a>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all shadow-sm">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
