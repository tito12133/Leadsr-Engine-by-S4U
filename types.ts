export type PageView = 'LANDING' | 'DASHBOARD' | 'CRM' | 'AI_SCORER' | 'AI_CHAT';

export interface Lead {
  id: string;
  company: string;
  contactName: string;
  email: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Closed';
  value: number;
  score: number;
  conversionProbability: number; // New predictive metric
  followUpPriority: 'High' | 'Medium' | 'Low'; // New automated priority
  lastContact: string;
  source: string;
  industry: string;
}

export interface AIAnalysisResult {
  score: number;
  conversionProbability: number;
  followUpPriority: 'High' | 'Medium' | 'Low';
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendation: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}