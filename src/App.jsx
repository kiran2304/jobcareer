import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TopBar from './components/Layout/TopBar';
import ContextHeader from './components/Layout/ContextHeader';
import Shell from './components/Layout/Shell';
import ProofFooter from './components/Layout/ProofFooter';
import Button from './components/UI/Button';
import Card from './components/UI/Card';
import PagePlaceholder from './components/Pages/Placeholder';
import { Copy, CheckCircle2, AlertCircle, Image as ImageIcon } from 'lucide-react';

function LandingPage({ proofItems }) {
  const secondaryPanelContent = (
    <div className="flex flex-col gap-3">
      <div className="step-explanation">
        <h3 className="serif" style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Build Phase Two</h3>
        <p className="text-muted" style={{ fontSize: '0.875rem' }}>
          Implement the core routing architecture and navigation skeleton for the Job Notification Tracker.
        </p>
      </div>

      <div className="prompt-box">
        <label className="text-muted" style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase' }}>Current Prompt</label>
        <div className="prompt-text">
          "Create the route skeleton for Job Notification Tracker within the KodNest Premium Build System."
        </div>
        <Button variant="secondary" style={{ width: '100%', marginTop: '8px' }}>
          <Copy size={14} /> Copy Prompt
        </Button>
      </div>

      <div className="action-buttons flex flex-col gap-1">
        <Button style={{ width: '100%' }}>Build in Lovable</Button>
        <div className="flex gap-1" style={{ width: '100%' }}>
          <Button variant="secondary" style={{ flex: 1 }}><CheckCircle2 size={14} /> It Worked</Button>
          <Button variant="secondary" style={{ flex: 1 }}><AlertCircle size={14} /> Error</Button>
        </div>
        <Button variant="secondary" style={{ width: '100%' }}>
          <ImageIcon size={14} /> Add Screenshot
        </Button>
      </div>

      <style jsx>{`
        .prompt-box {
          background: var(--bg-primary);
          padding: var(--space-2);
          border-radius: var(--radius);
          border: 1px solid var(--border-color);
        }
        .prompt-text {
          font-family: var(--font-sans);
          font-size: 0.875rem;
          margin-top: 4px;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );

  return (
    <>
      <ContextHeader
        title="Job Notification Tracker"
        subtitle="Manage and track your job applications with a calm and intentional workspace."
      />
      <Shell secondaryPanel={secondaryPanelContent}>
        <div className="workspace-content">
          <div className="flex flex-col gap-4">
            <Card title="Navigation Skeleton Ready">
              <p>The routing infrastructure is now implemented. Use the top navigation bar to explore the different sections of the tracker.</p>
              <div className="flex gap-2" style={{ marginTop: '24px' }}>
                <Link to="/dashboard"><Button>Go to Dashboard</Button></Link>
                <Link to="/settings"><Button variant="secondary">View Settings</Button></Link>
              </div>
            </Card>
          </div>
        </div>
      </Shell>
      <ProofFooter items={proofItems} />
    </>
  );
}

function App() {
  const [proofItems] = useState([
    { label: "UI Built", completed: true },
    { label: "Navigation Fixed", completed: true },
    { label: "Routes Defined", completed: true },
    { label: "Mobile Responsive", completed: false },
  ]);

  return (
    <BrowserRouter>
      <div className="app-container">
        <TopBar
          projectName="KodNest Premium"
          currentStep={2}
          totalSteps={6}
          status="In Progress"
        />

        <Routes>
          <Route path="/" element={<LandingPage proofItems={proofItems} />} />
          <Route path="/dashboard" element={<PagePlaceholder title="Dashboard" />} />
          <Route path="/saved" element={<PagePlaceholder title="Saved Jobs" />} />
          <Route path="/digest" element={<PagePlaceholder title="Daily Digest" />} />
          <Route path="/settings" element={<PagePlaceholder title="Settings" />} />
          <Route path="/proof" element={<PagePlaceholder title="Verification & Proof" />} />
        </Routes>

        <style jsx>{`
          .app-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            background: var(--bg-primary);
          }
        `}</style>
      </div>
    </BrowserRouter>
  );
}

export default App;
