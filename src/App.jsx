import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from './components/Layout/TopBar';
import Landing from './components/Pages/Landing';
import Dashboard from './components/Pages/Dashboard';
import Saved from './components/Pages/Saved';
import Digest from './components/Pages/Digest';
import Settings from './components/Pages/Settings';
import Proof from './components/Pages/Proof';

import Analyze from './components/Pages/Analyze';
import History from './components/Pages/History';
import Results from './components/Pages/Results';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <TopBar
          projectName="KodNest Premium"
          currentStep={3}
          totalSteps={6}
          status="In Progress"
        />

        <main className="content-area">
          <Routes>
            {/* New Platform Routes */}
            <Route path="/analyze" element={<Analyze />} />
            <Route path="/history" element={<History />} />
            <Route path="/results" element={<Results />} />

            {/* Existing Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/digest" element={<Digest />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/proof" element={<Proof />} />
          </Routes>
        </main>

        <style jsx>{`
          .app-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            background: var(--bg-primary);
          }
          .content-area {
            flex: 1;
            display: flex;
            flex-direction: column;
          }
        `}</style>
      </div>
    </BrowserRouter>
  );
}

export default App;
