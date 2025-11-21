import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ArrowUpRight, Users, DollarSign, Activity, Target } from 'lucide-react';
import { MOCK_LEADS } from '../constants';

const data = [
  { name: 'Mon', leads: 12, value: 2400 },
  { name: 'Tue', leads: 19, value: 4500 },
  { name: 'Wed', leads: 15, value: 3200 },
  { name: 'Thu', leads: 22, value: 6000 },
  { name: 'Fri', leads: 28, value: 8500 },
  { name: 'Sat', leads: 10, value: 1500 },
  { name: 'Sun', leads: 8, value: 1000 },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500">Welcome back, Hector. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$128,500', change: '+12.5%', icon: DollarSign, color: 'text-emerald-600' },
          { label: 'Active Leads', value: '432', change: '+5.2%', icon: Users, color: 'text-blue-600' },
          { label: 'Conversion Rate', value: '3.2%', change: '+0.8%', icon: Activity, color: 'text-purple-600' },
          { label: 'Pipeline Value', value: '$1.2M', change: '+15.3%', icon: Target, color: 'text-orange-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">{stat.value}</h3>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full mt-2">
                <ArrowUpRight className="w-3 h-3" /> {stat.change}
              </span>
            </div>
            <div className={`p-3 rounded-lg bg-slate-50 ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-900">Lead Acquisition Trend</h3>
            <select className="bg-slate-50 border border-slate-200 text-sm rounded-lg p-2 outline-none focus:ring-2 focus:ring-primary-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChartComponent data={data} />
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity / Top Leads */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-900 mb-6">Top High-Value Leads</h3>
          <div className="space-y-4">
            {MOCK_LEADS.slice(0, 4).map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                    {lead.contactName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{lead.company}</p>
                    <p className="text-xs text-slate-500">{lead.contactName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">${lead.value.toLocaleString()}</p>
                  <p className={`text-xs font-medium ${
                    lead.score > 80 ? 'text-emerald-600' : lead.score > 50 ? 'text-amber-600' : 'text-slate-500'
                  }`}>Score: {lead.score}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            View All Leads
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper component for the chart to handle the import properly inside the component tree if needed, 
// though standard rechart usage is fine in the same file.
const AreaChartComponent = ({ data }: { data: any[] }) => {
  return (
    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
      <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
      <Tooltip 
        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
        cursor={{ fill: '#f1f5f9' }}
      />
      <Bar dataKey="leads" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={32} />
    </BarChart>
  );
};