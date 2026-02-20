
import React, { useState } from 'react';
import { UserInput } from '../types';

interface ResumeFormProps {
  onSubmit: (data: UserInput) => void;
  isLoading: boolean;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ onSubmit, isLoading }) => {
  const [resumeText, setResumeText] = useState('');
  const [jobRole, setJobRole] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setResumeText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resumeText.trim() && jobRole.trim()) {
      onSubmit({ resumeText, jobRole });
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <i className="fa-solid fa-wand-magic-sparkles text-indigo-500"></i>
        Start Analysis
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Target Job Role</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="e.g. Senior Frontend Engineer"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Resume Text</label>
          <textarea
            className="w-full h-48 px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none text-sm"
            placeholder="Paste your resume content here..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-500">OR</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Upload Text File</label>
          <input
            type="file"
            accept=".txt"
            onChange={handleFileChange}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 ${
            isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5'
          }`}
        >
          {isLoading ? (
            <>
              <i className="fa-solid fa-spinner animate-spin"></i>
              Analyzing...
            </>
          ) : (
            <>
              <i className="fa-solid fa-magnifying-glass-chart"></i>
              Analyze Resume
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ResumeForm;
