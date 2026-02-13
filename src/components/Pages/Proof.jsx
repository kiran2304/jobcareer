import React from 'react';
import Card from '../UI/Card';
import { ShieldCheck, FileText, CheckCircle } from 'lucide-react';

const Proof = () => {
    return (
        <div className="proof-page">
            <div className="proof-header mb-4">
                <h1 className="serif">Verification Hub</h1>
                <p className="text-muted">Collect and manage artifacts for your job search progress.</p>
            </div>

            <div className="proof-content flex flex-col gap-4">
                <Card title="Artifact Collection">
                    <div className="drop-zone flex flex-col items-center justify-center">
                        <ShieldCheck size={48} strokeWidth={1} className="text-muted mb-2" />
                        <p className="text-muted" style={{ fontSize: '0.9375rem' }}>
                            Upload your resume, portfolio, or proof of deployment.
                        </p>
                        <div className="flex gap-2 mt-4">
                            <div className="artifact-pill flex items-center gap-1">
                                <FileText size={14} /> Resume.pdf
                            </div>
                            <div className="artifact-pill flex items-center gap-1">
                                <CheckCircle size={14} className="text-success" /> Logic_Verified.png
                            </div>
                        </div>
                    </div>
                </Card>

                <Card title="Required Proofs">
                    <div className="checklist flex flex-col gap-3">
                        <div className="checklist-item flex items-center justify-between">
                            <span>UI Implementation Verified</span>
                            <span className="status-indicator success">Verified</span>
                        </div>
                        <div className="checklist-item flex items-center justify-between">
                            <span>Dataset Integration</span>
                            <span className="status-indicator pending">Pending</span>
                        </div>
                        <div className="checklist-item flex items-center justify-between">
                            <span>Deployment Screenshot</span>
                            <span className="status-indicator pending">Pending</span>
                        </div>
                    </div>
                </Card>
            </div>

            <style jsx>{`
        .proof-page {
          padding: var(--space-4);
          max-width: 800px;
          margin: 0 auto;
          width: 100%;
        }
        .drop-zone {
          padding: var(--space-5);
          border: 2px dashed var(--border-color);
          border-radius: var(--radius);
          background: var(--bg-primary);
        }
        .artifact-pill {
          background: white;
          padding: 6px 12px;
          border: 1px solid var(--border-color);
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        .checklist-item {
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-color);
          font-size: 0.9375rem;
        }
        .status-indicator {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 2px 10px;
          border-radius: 12px;
          text-transform: uppercase;
        }
        .status-indicator.success {
          background: var(--status-success);
          color: white;
        }
        .status-indicator.pending {
          background: var(--bg-primary);
          color: var(--text-primary);
          opacity: 0.6;
        }
        .mb-2 { margin-bottom: 8px; }
        .mb-4 { margin-bottom: 24px; }
        .mt-4 { margin-top: 24px; }
      `}</style>
        </div>
    );
};

export default Proof;
