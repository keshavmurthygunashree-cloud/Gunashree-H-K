
import React from 'react';
import { AnalysisResult } from '../types';

interface ResultProps {
  data: AnalysisResult;
}

const ResultCard: React.FC<{ title: string; icon: string; children: React.ReactNode; color: string }> = ({ title, icon, children, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
    <div className={`absolute top-0 left-0 w-1 h-full bg-${color}-500`}></div>
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-2 rounded-lg bg-${color}-50 text-${color}-600`}>
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <h3 className="text-lg font-bold text-slate-800">{title}</h3>
    </div>
    {children}
  </div>
);

const AnalysisResultView: React.FC<ResultProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <ResultCard title="Candidate Summary" icon="fa-user-tie" color="indigo">
        <p className="text-slate-600 leading-relaxed italic">"{data.summary}"</p>
      </ResultCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ResultCard title="Key Skills Identified" icon="fa-check-double" color="emerald">
          <div className="flex flex-wrap gap-2">
            {data.keySkills.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100">
                {skill}
              </span>
            ))}
          </div>
        </ResultCard>

        <ResultCard title="Missing / Weak Skills" icon="fa-circle-exclamation" color="orange">
          <div className="flex flex-wrap gap-2">
            {data.missingSkills.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-semibold rounded-full border border-orange-100">
                {skill}
              </span>
            ))}
          </div>
        </ResultCard>
      </div>

      <ResultCard title="Resume Improvements" icon="fa-pen-to-square" color="blue">
        <ul className="space-y-3">
          {data.improvementSuggestions.map((suggestion, i) => (
            <li key={i} className="flex gap-3 text-slate-600 text-sm">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                {i + 1}
              </span>
              {suggestion}
            </li>
          ))}
        </ul>
      </ResultCard>

      <ResultCard title="Short-term Roadmap" icon="fa-map-location-dot" color="purple">
        <div className="relative pl-6 border-l-2 border-purple-100 space-y-6">
          {data.improvementRoadmap.map((step, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-[1.85rem] top-1.5 w-4 h-4 rounded-full bg-purple-500 border-4 border-white"></div>
              <p className="text-slate-700 text-sm font-medium">{step}</p>
            </div>
          ))}
        </div>
      </ResultCard>
    </div>
  );
};

export default AnalysisResultView;
