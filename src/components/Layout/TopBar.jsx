import React from 'react';

const TopBar = ({ projectName = "KodNest Premium", currentStep = 1, totalSteps = 4, status = "In Progress" }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'shipped': return 'var(--status-success)';
      case 'not started': return 'var(--text-muted)';
      default: return 'var(--status-warning)';
    }
  };

  return (
    <div className="top-bar flex items-center justify-between">
      <div className="project-name serif">
        {projectName}
      </div>

      <div className="progress-indicator flex items-center gap-2">
        <span className="text-muted">Step {currentStep} / {totalSteps}</span>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="status-badge" style={{ backgroundColor: getStatusColor(status), color: 'white' }}>
        {status}
      </div>

      <style jsx>{`
        .top-bar {
          padding: var(--space-2) var(--space-4);
          border-bottom: 1px solid var(--border-color);
          background: white;
          height: 64px;
        }
        .project-name {
          font-size: 1.25rem;
          font-weight: 700;
        }
        .progress-track {
          width: 120px;
          height: 4px;
          background: var(--bg-primary);
          border-radius: 2px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: var(--text-primary);
          transition: width var(--transition-normal);
        }
        .status-badge {
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      `}</style>
    </div>
  );
};

export default TopBar;
