import React from 'react';
import Card from '../UI/Card';
import { ShieldCheck } from 'lucide-react';

const Proof = () => {
    return (
        <div className="proof-page text-container" style={{ padding: 'var(--space-4) 0' }}>
            <h1 className="serif" style={{ marginBottom: 'var(--space-1)' }}>Verification Hub</h1>
            <p className="text-muted" style={{ marginBottom: 'var(--space-4)' }}>
                Collect and manage artifacts for your job search progress.
            </p>

            <div className="flex flex-col gap-3">
                <Card title="Artifact Collection">
                    <div className="flex flex-col items-center justify-center" style={{ padding: 'var(--space-4)', border: '2px dashed var(--border-color)', borderRadius: 'var(--radius)' }}>
                        <ShieldCheck size={32} strokeWidth={1.5} className="text-muted" style={{ marginBottom: 'var(--space-1)' }} />
                        <p className="text-muted" style={{ fontSize: '0.875rem' }}>
                            Placeholder for artifact upload and verification proof.
                        </p>
                    </div>
                </Card>

                <Card title="Current Checklist Status">
                    <div className="checklist-placeholder">
                        <div className="text-muted" style={{ fontSize: '0.875rem' }}>
                            No proofs submitted yet. Verification logic will be implemented in the next phase.
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Proof;
