import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const TopBar = ({ projectName = "KodNest Premium", currentStep = 1, totalSteps = 4, status = "In Progress" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'shipped': return 'var(--status-success)';
      case 'not started': return 'var(--text-muted)';
      default: return 'var(--status-warning)';
    }
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Saved', path: '/saved' },
    { name: 'Digest', path: '/digest' },
    { name: 'Settings', path: '/settings' },
    { name: 'Proof', path: '/proof' },
  ];

  return (
    <nav className="top-bar flex items-center justify-between">
      <div className="flex items-center gap-4">
        <NavLink to="/" className="project-name serif">
          {projectName}
        </NavLink>

        {/* Desktop Nav */}
        <div className="desktop-links flex gap-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="progress-container flex items-center gap-2">
          <span className="text-muted hide-tablet">Step {currentStep} / {totalSteps}</span>
          <div className="progress-track hide-tablet">
            <div
              className="progress-fill"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="status-badge" style={{ backgroundColor: getStatusColor(status), color: 'white' }}>
          {status}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isMenuOpen && (
        <div className="mobile-overlay flex flex-col gap-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}

      <style jsx>{`
        .top-bar {
          padding: 0 var(--space-4);
          border-bottom: 1px solid var(--border-color);
          background: white;
          height: 64px;
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        .project-name {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .nav-link {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-primary);
          opacity: 0.6;
          padding: 8px 0;
          border-bottom: 2px solid transparent;
          transition: var(--transition-fast);
        }
        .nav-link:hover {
          opacity: 1;
        }
        .nav-link.active {
          opacity: 1;
          border-bottom-color: var(--accent-base);
        }
        .progress-track {
          width: 80px;
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
        .mobile-toggle {
          display: none;
          color: var(--text-primary);
        }
        .mobile-overlay {
          position: absolute;
          top: 64px;
          left: 0;
          width: 100%;
          background: white;
          padding: var(--space-3) var(--space-4);
          border-bottom: 1px solid var(--border-color);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .mobile-nav-link {
          font-size: 1.125rem;
          font-weight: 500;
          padding: 12px 0;
          border-bottom: 1px solid var(--border-color);
        }
        .mobile-nav-link.active {
          color: var(--accent-base);
        }

        @media (max-width: 768px) {
          .desktop-links, .hide-tablet {
            display: none;
          }
          .mobile-toggle {
            display: block;
          }
        }
      `}</style>
    </nav>
  );
};

export default TopBar;
