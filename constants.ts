import { Lead } from './types';

export const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    company: 'TechFlow Systems',
    contactName: 'Sarah Jenkins',
    email: 'sarah.j@techflow.com',
    status: 'Qualified',
    value: 45000,
    score: 85,
    conversionProbability: 88,
    followUpPriority: 'High',
    lastContact: '2025-05-12',
    source: 'LinkedIn',
    industry: 'SaaS'
  },
  {
    id: '2',
    company: 'Global Logistics Corp',
    contactName: 'Michael Chen',
    email: 'm.chen@globallog.com',
    status: 'Proposal',
    value: 120000,
    score: 92,
    conversionProbability: 95,
    followUpPriority: 'High',
    lastContact: '2025-05-14',
    source: 'Referral',
    industry: 'Logistics'
  },
  {
    id: '3',
    company: 'Apex Manufacturing',
    contactName: 'David Miller',
    email: 'dmiller@apex.net',
    status: 'New',
    value: 25000,
    score: 45,
    conversionProbability: 30,
    followUpPriority: 'Low',
    lastContact: '2025-05-15',
    source: 'Web Form',
    industry: 'Manufacturing'
  },
  {
    id: '4',
    company: 'Swift Finance',
    contactName: 'Elena Rodriguez',
    email: 'elena@swiftfin.com',
    status: 'Contacted',
    value: 65000,
    score: 78,
    conversionProbability: 72,
    followUpPriority: 'Medium',
    lastContact: '2025-05-10',
    source: 'Cold Email',
    industry: 'FinTech'
  },
  {
    id: '5',
    company: 'Urban Retail Group',
    contactName: 'James Wilson',
    email: 'jwilson@urbanretail.com',
    status: 'Closed',
    value: 15000,
    score: 60,
    conversionProbability: 100,
    followUpPriority: 'Low',
    lastContact: '2025-05-01',
    source: 'Conference',
    industry: 'Retail'
  }
];

export const NAV_ITEMS = [
  { id: 'DASHBOARD', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'CRM', label: 'Pipeline', icon: 'Kanban' },
  { id: 'AI_SCORER', label: 'AI Lead Scorer', icon: 'BrainCircuit' },
  { id: 'AI_CHAT', label: 'Assistant', icon: 'MessageSquare' },
];