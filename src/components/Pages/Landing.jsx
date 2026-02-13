import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';

const Landing = () => {
    return (
        <div className="landing-page flex flex-col items-center justify-center text-container" style={{ minHeight: '60vh', textAlign: 'center' }}>
            <h1 className="serif" style={{ fontSize: '4rem', marginBottom: 'var(--space-2)' }}>
                Stop Missing The Right Jobs.
            </h1>
            <p className="text-muted" style={{ fontSize: '1.5rem', marginBottom: 'var(--space-4)', maxWidth: '600px', margin: '0 auto var(--space-4)' }}>
                Precision-matched job discovery delivered daily at 9AM.
            </p>
            <Link to="/settings">
                <Button style={{ padding: '16px 40px', fontSize: '1.125rem' }}>
                    Start Tracking
                </Button>
            </Link>

            <style jsx>{`
        .landing-page {
          padding: var(--space-5) var(--space-4);
        }
        @media (max-width: 768px) {
          h1 { font-size: 2.5rem !important; }
          p { font-size: 1.125rem !important; }
        }
      `}</style>
        </div>
    );
};

export default Landing;
