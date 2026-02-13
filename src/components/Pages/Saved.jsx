import React from 'react';
import { Bookmark } from 'lucide-react';

const Saved = () => {
    return (
        <div className="saved-jobs flex flex-col items-center justify-center" style={{ minHeight: '50vh', textAlign: 'center' }}>
            <div className="empty-state-icon" style={{ color: 'var(--border-color)', marginBottom: 'var(--space-2)' }}>
                <Bookmark size={64} strokeWidth={1} />
            </div>
            <h2 className="serif" style={{ fontSize: '2rem', marginBottom: 'var(--space-1)' }}>Your collection is empty.</h2>
            <p className="text-muted" style={{ maxWidth: '400px' }}>
                Jobs you save from the dashboard will appear here for intentional follow-up and tracking.
            </p>

            <style jsx>{`
        .saved-jobs {
          padding: var(--space-5) var(--space-4);
        }
      `}</style>
        </div>
    );
};

export default Saved;
