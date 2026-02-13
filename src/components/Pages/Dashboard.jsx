import React from 'react';
import { Briefcase } from 'lucide-react';

const Dashboard = () => {
    return (
        <div className="dashboard-page flex flex-col items-center justify-center" style={{ minHeight: '50vh', textAlign: 'center' }}>
            <div className="empty-state-icon" style={{ color: 'var(--border-color)', marginBottom: 'var(--space-2)' }}>
                <Briefcase size={64} strokeWidth={1} />
            </div>
            <h2 className="serif" style={{ fontSize: '2rem', marginBottom: 'var(--space-1)' }}>No jobs yet.</h2>
            <p className="text-muted" style={{ maxWidth: '400px' }}>
                In the next step, you will load a realistic dataset. Matching algorithms will start populating this dashboard.
            </p>

            <style jsx>{`
        .dashboard-page {
          padding: var(--space-5) var(--space-4);
        }
      `}</style>
        </div>
    );
};

export default Dashboard;
