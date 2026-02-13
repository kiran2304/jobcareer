import React from 'react';

const Card = ({ children, title, className = "" }) => {
    return (
        <div className={`card ${className}`}>
            {title && <div className="card-header serif">{title}</div>}
            <div className="card-body">
                {children}
            </div>

            <style jsx>{`
        .card {
          background: white;
          border: 1px solid var(--border-color);
          border-radius: var(--radius);
          overflow: hidden;
          margin-bottom: var(--space-2);
        }
        .card-header {
          padding: var(--space-2) var(--space-3);
          border-bottom: 1px solid var(--border-color);
          font-size: 1.125rem;
          font-weight: 600;
        }
        .card-body {
          padding: var(--space-3);
        }
      `}</style>
        </div>
    );
};

export default Card;
