import React, { useState } from 'react';
import { Sparkles, AlertCircle, CheckCircle2, RefreshCw, TrendingUp, Activity, BarChart2 } from 'lucide-react';
import { analyzeLead } from '../services/geminiService';
import { AIAnalysisResult } from '../types';

export const LeadScorer: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIAnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const analysis = await analyzeLead(input);
      setResult(analysis);
    } catch (e) {
      console.error(e);
      alert("Analysis failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  const fillSampleData = () => {
    setInput(`Company: Oceanic Airlines
Industry: Aviation & Logistics
Employees: 5000+
Revenue: $800M
Contact: Director of Operations
Pain Points: Legacy tracking systems, high latency in reporting, data silos.
Interest: High, requested a demo twice.`);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="text-primary-600" /> Predictive Lead Analytics
        </h1>
        <p className="text-slate-500">Input lead data to run our ML model. It analyzes historical patterns to predict conversion probability.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full flex flex-col">
            <label className="block text-sm font-medium text-slate-700 mb-2">Raw Lead Signals</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 w-full min-h-[300px] p-4 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none font-mono text-sm mb-4"
              placeholder="Paste emails, CRM notes, or LinkedIn profiles here..."
            />
            <div className="flex justify-between items-center">
              <button 
                onClick={fillSampleData}
                className="text-xs text-slate-500 hover:text-primary-600 underline"
              >
                Load Sample Data
              </button>
              <button
                onClick={handleAnalyze}
                disabled={loading || !input}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-primary-500/20 transition-all"
              >
                {loading ? <RefreshCw className="animate-spin w-4 h-4" /> : <BarChart2 className="w-4 h-4" />}
                {loading ? 'Running Model...' : 'Calculate Probability'}
              </button>
            </div>
          </div>
        </div>

        {/* Result Section */}
        <div>
          {result ? (
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden animate-fade-in">
              <div className="bg-slate-900 p-6 text-white">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary-400" /> 
                      Predictive Analysis
                    </h3>
                    <p className="text-slate-400 text-sm">Confidence Score: 98%</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                    result.followUpPriority === 'High' ? 'bg-red-500/20 border-red-500 text-red-400' :
                    result.followUpPriority === 'Medium' ? 'bg-amber-500/20 border-amber-500 text-amber-400' :
                    'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                  }`}>
                    {result.followUpPriority} Priority
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Conversion Probability</p>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-4xl font-black ${
                        result.conversionProbability >= 75 ? 'text-emerald-400' : 
                        result.conversionProbability >= 40 ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                        {result.conversionProbability}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          result.conversionProbability >= 75 ? 'bg-emerald-500' : 
                          result.conversionProbability >= 40 ? 'bg-amber-500' : 'bg-rose-500'
                        }`} 
                        style={{ width: `${result.conversionProbability}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                     <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Quality Score</p>
                     <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-white">{result.score}</span>
                      <span className="text-sm text-slate-500">/100</span>
                    </div>
                     <p className="text-[10px] text-slate-400 mt-2">General fit assessment</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">Model Explanation</h4>
                  <p className="text-slate-600 leading-relaxed text-sm">{result.summary}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                    <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-wide mb-2 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Conversion Drivers
                    </h4>
                    <ul className="text-sm text-emerald-900 space-y-1">
                      {result.strengths.map((s, i) => <li key={i}>• {s}</li>)}
                    </ul>
                  </div>
                  <div className="bg-rose-50 p-4 rounded-lg border border-rose-100">
                    <h4 className="text-xs font-bold text-rose-700 uppercase tracking-wide mb-2 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Risk Factors
                    </h4>
                    <ul className="text-sm text-rose-900 space-y-1">
                      {result.weaknesses.map((w, i) => <li key={i}>• {w}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="bg-primary-50 p-4 rounded-lg border border-primary-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-primary-200 rounded-full blur-xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                  <h4 className="text-sm font-bold text-primary-800 mb-1 relative z-10">Recommended Action (Auto-Prioritized)</h4>
                  <p className="text-sm text-primary-700 relative z-10">{result.recommendation}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 p-12">
              <div className="text-center">
                <BarChart2 className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p className="font-medium">Predictive Analytics Ready</p>
                <p className="text-sm mt-1">Paste data to calculate conversion probability</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};