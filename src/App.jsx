import React, { useState } from 'react';
import TopBar from './components/Layout/TopBar';
import ContextHeader from './components/Layout/ContextHeader';
import Shell from './components/Layout/Shell';
import ProofFooter from './components/Layout/ProofFooter';
import Button from './components/UI/Button';
import Input from './components/UI/Input';
import Card from './components/UI/Card';
import { Copy, Plus, CheckCircle2, AlertCircle, Image as ImageIcon } from 'lucide-react';

function App() {
  const [proofItems, setProofItems] = useState([
    { label: "UI Built", completed: true },
    { label: "Logic Working", completed: false },
    { label: "Test Passed", completed: false },
    { label: "Deployed", completed: false },
  ]);

  const secondaryPanelContent = (
    <div className="flex flex-col gap-3">
      <div className="step-explanation">
        <h3 className="serif" style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Build Phase One</h3>
        <p className="text-muted" style={{ fontSize: '0.875rem' }}>
          Initialize the core design architecture. Ensure all spacing follows the 8px scale and typography is intentional.
        </p>
      </div>

      <div className="prompt-box">
        <label className="text-muted" style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase' }}>Current Prompt</label>
        <div className="prompt-text">
          "Create a premium SaaS design system with a calm, intentional, and coherent aesthetic."
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
    <div className="app-container">
      <TopBar
        projectName="KodNest Premium"
        currentStep={1}
        totalSteps={4}
        status="In Progress"
      />

      <ContextHeader
        title="Foundation Design System"
        subtitle="This system is built for serious B2C product companies. No noise, no flash—just pure intentionality."
      />

      <Shell secondaryPanel={secondaryPanelContent}>
        <div className="workspace-content">
          <div className="flex flex-col gap-4">
            <Card title="Design System Preview">
              <div className="preview-grid">
                <div className="preview-item">
                  <h4 style={{ marginBottom: '16px' }}>Typography</h4>
                  <h1 className="serif">Heading 1 - Serif</h1>
                  <h2 className="serif">Heading 2 - Serif</h2>
                  <p>Body text in Sans-serif. Generous line height for maximum readability and a premium feel.</p>
                </div>

                <div className="preview-item">
                  <h4 style={{ marginBottom: '16px', marginTop: '24px' }}>Components</h4>
                  <div className="flex gap-2">
                    <Button>Primary Action</Button>
                    <Button variant="secondary">Secondary Action</Button>
                  </div>
                  <div style={{ marginTop: '24px' }}>
                    <Input label="Project Name" placeholder="e.g. KodNest Build" />
                  </div>
                </div>
              </div>
            </Card>

            <Card title="System Rules">
              <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
                <li>8px Spacing Scale</li>
                <li>Off-white background (#F7F6F3)</li>
                <li>Deep Red branding (#8B0000)</li>
                <li>Serif Headings / Sans-serif Body</li>
              </ul>
            </Card>
          </div>
        </div>
      </Shell>

      <ProofFooter items={proofItems} />

      <style jsx>{`
        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .preview-grid {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}

export default App;
