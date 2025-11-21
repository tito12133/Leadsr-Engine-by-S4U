import React from 'react';
import { LayoutDashboard, Kanban, BrainCircuit, MessageSquare, LogOut, Menu, X } from 'lucide-react';
import { PageView } from '../types';
import { NAV_ITEMS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: PageView;
  isAuthenticated: boolean;
  onNavigate: (page: PageView) => void;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentPage, 
  isAuthenticated, 
  onNavigate, 
  onLogout 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const NavIcon = ({ iconName, className }: { iconName: string, className?: string }) => {
    switch (iconName) {
      case 'LayoutDashboard': return <LayoutDashboard className={className} />;
      case 'Kanban': return <Kanban className={className} />;
      case 'BrainCircuit': return <BrainCircuit className={className} />;
      case 'MessageSquare': return <MessageSquare className={className} />;
      default: return null;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
             <div className="flex items-center gap-2 font-bold text-xl tracking-tighter text-primary-900">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-black text-xs">
                S4U
              </div>
              <span className="text-slate-400 font-mono text-sm tracking-widest border border-dashed border-slate-300 px-2 py-1 rounded">YOURLOGOHERE</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => onNavigate('LANDING')}
                className="hidden md:block text-sm font-medium text-slate-600 hover:text-primary-600"
              >
                Product
              </button>
              <button 
                className="text-sm font-medium text-slate-600 hover:text-primary-600"
                onClick={() => alert("Solutions4U is currently invite-only. Contact Hector Caro.")}
              >
                Pricing
              </button>
              <button 
                onClick={() => onNavigate('DASHBOARD')} // Mock login
                className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-primary-700 transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
        <footer className="border-t border-slate-200 py-8 bg-slate-50">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>&copy; 2025 Solutions4U. All rights reserved.</p>
            <p className="font-medium text-slate-400">Built by Hector Caro</p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 text-white sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
           <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white font-black text-xs">
              S4U
            </div>
            <span className="text-slate-500 font-mono text-xs border border-dashed border-slate-700 px-1 rounded">YOURLOGOHERE</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as PageView)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === item.id 
                  ? 'bg-primary-600 text-white' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <NavIcon iconName={item.icon} className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-rose-400 hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
          <div className="mt-4 text-center">
             <p className="text-xs text-slate-600">Built by Hector Caro</p>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
             <span className="font-bold">Solutions4U</span>
             <span className="text-xs text-slate-500 border border-dashed border-slate-700 px-1">YOURLOGOHERE</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-slate-800 text-white p-4 absolute top-16 left-0 right-0 z-30 shadow-xl">
            <nav className="space-y-2">
               {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id as PageView);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                    currentPage === item.id ? 'bg-primary-600' : 'hover:bg-slate-700'
                  }`}
                >
                   <NavIcon iconName={item.icon} className="w-5 h-5" />
                   <span>{item.label}</span>
                </button>
              ))}
               <button 
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-rose-400 hover:bg-slate-700"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </nav>
          </div>
        )}

        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};