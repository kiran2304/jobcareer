import React from 'react';
import { X, ExternalLink, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import Button from './Button';

const JobModal = ({ job, onClose }) => {
    if (!job) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}><X size={24} /></button>

                <div className="modal-header">
                    <h2 className="serif" style={{ fontSize: '2rem' }}>{job.title}</h2>
                    <p className="company-info">{job.company}</p>

                    <div className="modal-meta flex flex-wrap gap-4 mt-4">
                        <span className="flex items-center gap-1"><MapPin size={18} /> {job.location} ({job.mode})</span>
                        <span className="flex items-center gap-1"><Briefcase size={18} /> {job.experience}</span>
                        <span className="flex items-center gap-1"><GraduationCap size={18} /> {job.source}</span>
                    </div>
                </div>

                <div className="modal-body mt-5">
                    <h4 className="serif">Description</h4>
                    <p className="description-text mt-2">{job.description}</p>

                    <h4 className="serif mt-4">Required Skills</h4>
                    <div className="skills-tags flex flex-wrap gap-2 mt-2">
                        {job.skills.map(skill => (
                            <span key={skill} className="skill-tag">{skill}</span>
                        ))}
                    </div>

                    <div className="salary-info mt-4">
                        <h4 className="serif">Package / Stipend</h4>
                        <p className="salary-text mt-1">{job.salaryRange}</p>
                    </div>
                </div>

                <div className="modal-footer mt-5 flex gap-3">
                    <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button style={{ width: '100%', padding: '16px' }}>
                            <ExternalLink size={18} /> Apply on {job.source}
                        </Button>
                    </a>
                    <Button variant="secondary" onClick={onClose}>Close</Button>
                </div>
            </div>

            <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: var(--space-4);
        }
        .modal-content {
          background: white;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          border-radius: var(--radius);
          padding: var(--space-4);
          position: relative;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          color: var(--text-primary);
          opacity: 0.5;
        }
        .close-btn:hover { opacity: 1; }
        .company-info {
          font-size: 1.125rem;
          font-weight: 500;
          opacity: 0.8;
        }
        .modal-meta {
          font-size: 0.875rem;
        }
        h4 {
          font-size: 1rem;
          color: var(--accent-base);
        }
        .description-text {
          font-size: 0.9375rem;
          line-height: 1.6;
        }
        .skill-tag {
          background: var(--bg-primary);
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 0.8125rem;
          font-weight: 500;
        }
        .mt-1 { margin-top: 4px; }
        .mt-2 { margin-top: 8px; }
        .mt-4 { margin-top: 24px; }
        .mt-5 { margin-top: 40px; }
      `}</style>
        </div>
    );
};

export default JobModal;
