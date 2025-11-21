import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { CRMBoard } from './components/CRMBoard';
import { AIChat } from './components/AIChat';
import { LeadScorer } from './components/LeadScorer';
import { PageView } from './types';

const App: React.FC = () => {
  // Simple state-based routing for the SPA
  const [currentPage, setCurrentPage] = useState<PageView>('LANDING');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Simulate persistent login state or handle hash changes if we were using HashRouter
  // For this demo, we just manage state.

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('DASHBOARD');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('LANDING');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'LANDING':
        return <LandingPage onLogin={handleLogin} />;
      case 'DASHBOARD':
        return <Dashboard />;
      case 'CRM':
        return <CRMBoard />;
      case 'AI_SCORER':
        return <LeadScorer />;
      case 'AI_CHAT':
        return <AIChat />;
      default:
        return <LandingPage onLogin={handleLogin} />;
    }
  };

  return (
    <Layout
      currentPage={currentPage}
      isAuthenticated={isAuthenticated}
      onNavigate={setCurrentPage}
      onLogout={handleLogout}
    >
      {renderPage()}
    </Layout>
  );
};

export default App;