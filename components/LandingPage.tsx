import React, { useState } from 'react';
import { ArrowRight, CheckCircle, BarChart2, Zap, Globe, Shield, Users } from 'lucide-react';

interface LandingPageProps {
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, this would post to the backend
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
      alert("Thanks! Hector Caro's team will be in touch shortly.");
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 lg:py-32 bg-gradient-to-b from-white to-primary-50 text-center px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-primary-600 animate-pulse"></span>
            New: AI-Powered Lead Scoring v2.0
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900">
            Accelerate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">B2B Growth</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            The automated lead engine built for high-performance teams. Capture, qualify, and convert enterprise leads with Solutions4U technology.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={onLogin} 
              className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-bold text-lg shadow-lg shadow-primary-500/30 transition-all hover:-translate-y-1 flex items-center gap-2"
            >
              Launch Dashboard <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white border border-slate-200 hover:border-primary-200 text-slate-700 hover:text-primary-700 rounded-lg font-bold text-lg shadow-sm transition-colors">
              View Demo
            </button>
          </div>
          <p className="text-sm text-slate-400 pt-4">No credit card required • Enterprise security • GDPR Compliant</p>
        </div>
      </section>

      {/* Social Proof / Logos */}
      <section className="w-full py-12 border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">Designed for modern enterprises</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholder Logos using text for simplicity, or svgs in real app */}
            <h3 className="text-xl font-bold text-slate-800">ACME Corp</h3>
            <h3 className="text-xl font-bold text-slate-800">TechGiant</h3>
            <h3 className="text-xl font-bold text-slate-800">GlobalSoft</h3>
            <h3 className="text-xl font-bold text-slate-800">InnovateX</h3>
            <h3 className="text-xl font-bold text-slate-800">FutureSystems</h3>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="w-full py-24 bg-slate-50 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Solutions4U Lead Engine?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">We combine proprietary algorithms with modern AI to deliver the most qualified leads directly to your pipeline.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BarChart2, title: "Predictive Scoring", desc: "Our ML models predict conversion probability with 94% accuracy." },
              { icon: Zap, title: "Instant Outreach", desc: "Automate follow-ups via Email and LinkedIn within seconds of capture." },
              { icon: Users, title: "CRM Integration", desc: "Seamless two-way sync with Salesforce, HubSpot, and Pipedrive." },
              { icon: Globe, title: "Global Data Enrichment", desc: "Automatically enrich leads with data from 50+ global sources." },
              { icon: Shield, title: "Enterprise Security", desc: "SOC2 Type II certified, GDPR & CCPA compliant infrastructure." },
              { icon: CheckCircle, title: "Custom Workflows", desc: "Build drag-and-drop automation workflows tailored to your sales cycle." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600 mb-6">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture CTA */}
      <section className="w-full py-24 bg-slate-900 text-white px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to supercharge your pipeline?</h2>
          <p className="text-slate-300 mb-10 text-lg">Transform your sales pipeline with the advanced Lead Engine built by Solutions4U.</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your work email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 backdrop-blur-sm"
            />
            <button 
              type="submit"
              disabled={submitted}
              className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-lg font-bold whitespace-nowrap transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitted ? 'Sent!' : 'Get Started'}
            </button>
          </form>
          <p className="text-xs text-slate-500 mt-4">By signing up, you agree to our Terms of Service.</p>
        </div>
      </section>
    </div>
  );
};
