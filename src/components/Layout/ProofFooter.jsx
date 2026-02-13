import React from 'react';
import { CheckSquare, Square } from 'lucide-react';

const ProofFooter = ({ items = [] }) => {
    return (
        <footer className="proof-footer">
            <div className="footer-content flex items-center justify-between">
                <div className="proof-checklist flex gap-3">
                    {items.map((item, index) => (
                        <div key={index} className="proof-item flex items-center gap-1">
                            {item.completed ? (
                                <CheckSquare size={16} className="text-accent" />
                            ) : (
                                <Square size={16} className="text-muted" />
                            )}
                            <span className={item.completed ? "" : "text-muted"}>{item.label}</span>
                        </div>
                    ))}
                </div>

                <div className="proof-actions">
                    <p className="text-muted" style={{ fontSize: '0.875rem' }}>
                        Requires user proof for completion
                    </p>
                </div>
            </div>

            <style jsx>{`
        .proof-footer {
          position: sticky;
          bottom: 0;
          width: 100%;
          background: white;
          border-top: 1px solid var(--border-color);
          padding: var(--space-2) var(--space-4);
          height: 80px;
          display: flex;
          align-items: center;
          z-index: 100;
        }
        .footer-content {
          width: 100%;
        }
        .proof-item {
          font-size: 0.875rem;
          font-weight: 500;
        }
      `}</style>
        </footer>
    );
};

export default ProofFooter;
