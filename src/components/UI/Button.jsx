import React from 'react';

const Button = ({ children, variant = "primary", className = "", ...props }) => {
    return (
        <button className={`btn btn-${variant} ${className}`} {...props}>
            {children}

            <style jsx>{`
        .btn {
          padding: 10px 20px;
          border-radius: var(--radius);
          font-weight: 600;
          font-size: 0.875rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-1);
          border: 1px solid transparent;
        }
        .btn-primary {
          background: var(--accent-base);
          color: white;
        }
        .btn-primary:hover {
          background: var(--accent-hover);
        }
        .btn-secondary {
          background: transparent;
          color: var(--text-primary);
          border-color: var(--border-color);
        }
        .btn-secondary:hover {
          background: var(--bg-primary);
          border-color: var(--text-primary);
        }
      `}</style>
        </button>
    );
};

export default Button;
