import React from 'react';

const Shell = ({ children, secondaryPanel }) => {
    return (
        <main className="shell">
            <div className="primary-workspace">
                {children}
            </div>
            <aside className="secondary-panel">
                {secondaryPanel}
            </aside>

            <style jsx>{`
        .shell {
          display: grid;
          grid-template-columns: 1fr 340px;
          min-height: calc(100vh - 64px - 140px); /* Adjust for header/footer */
          background: var(--bg-primary);
        }
        .primary-workspace {
          padding: var(--space-4);
          border-right: 1px solid var(--border-color);
        }
        .secondary-panel {
          padding: var(--space-4);
          background: white;
          overflow-y: auto;
        }
        @media (max-width: 1024px) {
          .shell {
            grid-template-columns: 1fr;
          }
          .secondary-panel {
            border-top: 1px solid var(--border-color);
            border-right: none;
          }
        }
      `}</style>
        </main>
    );
};

export default Shell;
