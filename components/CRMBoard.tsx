import React from 'react';
import { MoreHorizontal, Plus, TrendingUp, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';
import { MOCK_LEADS } from '../constants';
import { Lead } from '../types';

const COLUMNS: { id: Lead['status'], title: string, color: string }[] = [
  { id: 'New', title: 'New Leads', color: 'bg-blue-500' },
  { id: 'Contacted', title: 'Contacted', color: 'bg-amber-500' },
  { id: 'Qualified', title: 'Qualified', color: 'bg-emerald-500' },
  { id: 'Proposal', title: 'Proposal Sent', color: 'bg-purple-500' },
  { id: 'Closed', title: 'Closed Won', color: 'bg-slate-900' },
];

export const CRMBoard: React.FC = () => {
  const getPriorityColor = (priority: Lead['followUpPriority']) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 border-red-100';
      case 'Medium': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'Low': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      default: return 'text-slate-600 bg-slate-50 border-slate-100';
    }
  };

  const getPriorityIcon = (priority: Lead['followUpPriority']) => {
    switch (priority) {
      case 'High': return <AlertTriangle className="w-3 h-3" />;
      case 'Medium': return <Clock className="w-3 h-3" />;
      case 'Low': return <CheckCircle2 className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pipeline</h1>
          <p className="text-slate-500">Drag and drop leads. AI predicts conversion probability to sort prioritization.</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Deal
        </button>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 h-full min-w-[1000px]">
          {COLUMNS.map((col) => (
            <div key={col.id} className="flex-1 flex flex-col min-w-[280px] bg-slate-100/50 rounded-xl border border-slate-200/60">
              <div className="p-4 flex items-center justify-between sticky top-0 bg-slate-100/50 backdrop-blur-sm rounded-t-xl z-10 border-b border-slate-200/60">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${col.color}`}></span>
                  <h3 className="font-semibold text-slate-700 text-sm">{col.title}</h3>
                  <span className="bg-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded-full font-medium">
                    {MOCK_LEADS.filter(l => l.status === col.id).length}
                  </span>
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 space-y-3 overflow-y-auto flex-1 custom-scrollbar">
                {MOCK_LEADS.filter(lead => lead.status === col.id).map((lead) => (
                  <div key={lead.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md cursor-grab active:cursor-grabbing transition-all group">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded border border-primary-100">{lead.industry}</span>
                      <div className={`flex items-center gap-1 text-xs font-bold border px-2 py-1 rounded ${getPriorityColor(lead.followUpPriority)}`}>
                        {getPriorityIcon(lead.followUpPriority)}
                        {lead.followUpPriority} Priority
                      </div>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-primary-600 transition-colors">{lead.company}</h4>
                    <p className="text-xs text-slate-500 mb-3">{lead.contactName}</p>
                    
                    {/* Predictive Analytics Section */}
                    <div className="mb-3">
                        <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                            <span>Conversion Prob.</span>
                            <span className="font-bold text-slate-700">{lead.conversionProbability}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full ${
                                    lead.conversionProbability >= 80 ? 'bg-emerald-500' : 
                                    lead.conversionProbability >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                                }`}
                                style={{ width: `${lead.conversionProbability}%` }}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <span className="text-xs font-medium text-slate-600">${lead.value.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-400">{lead.lastContact}</span>
                    </div>
                  </div>
                ))}
                
                <button className="w-full py-2 border border-dashed border-slate-300 rounded-lg text-sm text-slate-500 hover:bg-slate-50 hover:border-slate-400 transition-colors">
                  + New Deal
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};