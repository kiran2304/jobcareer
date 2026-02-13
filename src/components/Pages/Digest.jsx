import React from 'react';
import { MailOpen } from 'lucide-react';

const Digest = () => {
    return (
        <div className="daily-digest flex flex-col items-center justify-center" style={{ minHeight: '50vh', textAlign: 'center' }}>
            <div className="empty-state-icon" style={{ color: 'var(--border-color)', marginBottom: 'var(--space-2)' }}>
                <MailOpen size={64} strokeWidth={1} />
            </div>
            <h2 className="serif" style={{ fontSize: '2rem', marginBottom: 'var(--space-1)' }}>Waiting for 9AM.</h2>
            <p className="text-muted" style={{ maxWidth: '400px' }}>
                Every morning, we curate the most relevant jobs based on your preferences and deliver them here as a calm, readable digest.
            </p>

            <style jsx>{`
        .daily-digest {
          padding: var(--space-5) var(--space-4);
        }
      `}</style>
        </div>
    );
};

export default Digest;
