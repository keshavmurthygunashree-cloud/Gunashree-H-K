
import React, { useState } from 'react';
import Header from './components/Header';
import ResumeForm from './components/ResumeForm';
import AnalysisResultView from './components/AnalysisResult';
import { AnalysisResult, LoadingState, UserInput } from './types';
import { analyzeResume } from './services/geminiService';

const App: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async (input: UserInput) => {
    setLoadingState(LoadingState.ANALYZING);
    setError(null);
    try {
      const data = await analyzeResume(input);
      setResult(data);
      setLoadingState(LoadingState.SUCCESS);
      // Scroll to results
      setTimeout(() => {
        document.getElementById('analysis-result')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred during analysis.');
      setLoadingState(LoadingState.ERROR);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Intro & Form */}
          <div className="lg:col-span-5 space-y-8">
            <section>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                Unlock Your Next <span className="text-indigo-600">Career Leap</span> with AI Analysis
              </h1>
              <p className="text-lg text-slate-600 font-medium">
                Our advanced AI compares your resume to target roles, identifying skill gaps and providing a direct roadmap to success.
              </p>
            </section>

            <ResumeForm onSubmit={handleAnalysis} isLoading={loadingState === LoadingState.ANALYZING} />
            
            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
              <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                <i className="fa-solid fa-lightbulb"></i>
                Pro Tip
              </h4>
              <p className="text-sm text-indigo-700 leading-relaxed">
                Be as specific as possible with the "Target Job Role" to get more accurate skill matching and suggestions.
              </p>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7" id="analysis-result">
            {loadingState === LoadingState.IDLE && (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                <div className="bg-slate-50 p-4 rounded-full mb-4">
                  <i className="fa-solid fa-file-export text-slate-400 text-3xl"></i>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Ready to Analyze</h3>
                <p className="text-slate-500 max-w-sm">
                  Upload or paste your resume and specify your goal to see the AI magic happen here.
                </p>
              </div>
            )}

            {loadingState === LoadingState.ANALYZING && (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-slate-200">
                <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-6"></div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Analyzing your Profile...</h3>
                <p className="text-slate-500 text-center animate-pulse">
                  Identifying key skills, spotting improvements, and drafting your career roadmap.
                </p>
              </div>
            )}

            {loadingState === LoadingState.ERROR && (
              <div className="bg-red-50 p-8 rounded-2xl border border-red-100 text-center">
                <i className="fa-solid fa-triangle-exclamation text-red-500 text-4xl mb-4"></i>
                <h3 className="text-xl font-bold text-red-900 mb-2">Analysis Failed</h3>
                <p className="text-red-700 mb-6">{error}</p>
                <button 
                  onClick={() => setLoadingState(LoadingState.IDLE)}
                  className="bg-red-600 text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {loadingState === LoadingState.SUCCESS && result && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Analysis Result</h2>
                  <button 
                    onClick={() => window.print()} 
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-2"
                  >
                    <i className="fa-solid fa-print"></i>
                    Export to PDF
                  </button>
                </div>
                <AnalysisResultView data={result} />
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} AI Resume Insight. Empowering careers with Generative AI.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
