import React from 'react';

const Input = ({ label, error, ...props }) => {
  return (
    <div className="input-group flex flex-col gap-1">
      {label && <label className="input-label">{label}</label>}
      <input className={`input-field ${error ? "error" : ""}`} {...props} />
      {error && <span className="error-text">{error}</span>}

      <style jsx>{`
        .input-group {
          margin-bottom: var(--space-2);
          width: 100%;
        }
        .input-label {
          font-size: 0.875rem;
          font-weight: 500;
          opacity: 0.8;
        }
        .input-field {
          padding: 12px;
          border: 1px solid var(--border-color);
          border-radius: var(--radius);
          background: white;
          transition: var(--transition-fast);
        }
        .input-field:focus {
          border-color: var(--text-primary);
          background: #fff;
        }
        .input-field.error {
          border-color: var(--status-warning);
        }
        .error-text {
          font-size: 0.75rem;
          color: var(--status-warning);
        }
      `}</style>
    </div>
  );
};

export default Input;
