import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import StaffScanner from './pages/StaffScanner.jsx';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'admin', 'scanner'

  useEffect(() => {
    // Basic hash router
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();

      if (hash === '#admin' || path === '/admin') {
        setCurrentView('admin');
      } else if (hash === '#staff' || hash === '#scanner' || path === '/staff') {
        setCurrentView('scanner');
      } else {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view) => {
    setCurrentView(view);
    if (view === 'home') {
      window.location.hash = '';
    } else {
      window.location.hash = view;
    }
    window.scrollTo(0, 0);
  };

  return (
    <div>
      {currentView === 'home' && (
        <HomePage
          onNavigateAdmin={() => navigateTo('admin')}
          onNavigateScanner={() => navigateTo('scanner')}
        />
      )}

      {currentView === 'admin' && (
        <AdminDashboard onBackToHome={() => navigateTo('home')} />
      )}

      {currentView === 'scanner' && (
        <StaffScanner onBackToHome={() => navigateTo('home')} />
      )}
    </div>
  );
}
