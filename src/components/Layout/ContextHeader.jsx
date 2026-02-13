import React from 'react';

const ContextHeader = ({ title, subtitle }) => {
    return (
        <div className="context-header">
            <h1 className="serif">{title}</h1>
            <p className="subtitle text-muted">{subtitle}</p>

            <style jsx>{`
        .context-header {
          padding: var(--space-5) var(--space-4) var(--space-4);
          background: white;
          border-bottom: 1px solid var(--border-color);
        }
        h1 {
          font-size: 2.5rem;
          margin-bottom: var(--space-1);
        }
        .subtitle {
          font-size: 1.125rem;
          max-width: 600px;
        }
      `}</style>
        </div>
    );
};

export default ContextHeader;
