import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const PreferenceBanner = () => {
    return (
        <div className="preference-banner flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="icon-wrapper">
                    <Sparkles size={20} className="text-accent" />
                </div>
                <div>
                    <h4 className="serif">Find your perfect match.</h4>
                    <p className="text-muted" style={{ fontSize: '0.875rem' }}>
                        Set your preferences to activate intelligent matching and score every job.
                    </p>
                </div>
            </div>
            <Link to="/settings" className="flex items-center gap-2 settings-link">
                Set Preferences <ArrowRight size={16} />
            </Link>

            <style jsx>{`
        .preference-banner {
          background: #fff;
          border: 1px solid var(--accent-base);
          padding: var(--space-2) var(--space-3);
          border-radius: var(--radius);
          margin-bottom: var(--space-3);
        }
        .icon-wrapper {
          background: var(--bg-primary);
          padding: 10px;
          border-radius: 50%;
        }
        .settings-link {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--accent-base);
        }
        .settings-link:hover {
          text-decoration: underline;
        }
        @media (max-width: 640px) {
          .preference-banner { flex-direction: column; align-items: flex-start; gap: 16px; }
        }
      `}</style>
        </div>
    );
};

export default PreferenceBanner;
