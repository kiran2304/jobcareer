import React from 'react';
import { ExternalLink, Bookmark, Eye, MapPin, Briefcase, Clock, Sparkles } from 'lucide-react';
import Button from './Button';
import { getScoreColor } from '../../utils/scoring';

const JobCard = ({ job, onView, onSave, isSaved, matchScore }) => {
  const showScore = matchScore !== undefined && matchScore !== null;
  const scoreColor = showScore ? getScoreColor(matchScore) : null;

  return (
    <div className="job-card flex flex-col justify-between">
      <div className="card-top">
        <div className="flex justify-between items-start mb-2">
          <div className="source-badge">{job.source}</div>
          {showScore ? (
            <div className="match-badge flex items-center gap-1" style={{ backgroundColor: scoreColor }}>
              <Sparkles size={12} fill="white" />
              <span>{matchScore}% Match</span>
            </div>
          ) : (
            <span className="posted-days text-muted flex items-center gap-1">
              <Clock size={12} /> {job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo}d ago`}
            </span>
          )}
        </div>
        <h3 className="serif">{job.title}</h3>
        <p className="company-name">{job.company}</p>

        <div className="job-meta flex flex-wrap gap-2 mt-3">
          <span className="meta-item flex items-center gap-1">
            <MapPin size={14} /> {job.location} ({job.mode})
          </span>
          <span className="meta-item flex items-center gap-1">
            <Briefcase size={14} /> {job.experience}
          </span>
        </div>

        <div className="salary-range mt-3">
          {job.salaryRange}
        </div>
      </div>

      <div className="card-actions flex gap-2 mt-4">
        <Button
          variant="secondary"
          onClick={() => onView(job)}
          className="flex-1 text-sm py-1"
        >
          <Eye size={14} /> View
        </Button>
        <Button
          variant="secondary"
          onClick={() => onSave(job)}
          className={`flex-1 text-sm py-1 ${isSaved ? 'saved' : ''}`}
        >
          <Bookmark size={14} fill={isSaved ? "currentColor" : "none"} /> {isSaved ? 'Saved' : 'Save'}
        </Button>
        <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button className="w-full text-sm py-1">
            <ExternalLink size={14} /> Apply
          </Button>
        </a>
      </div>

      <style jsx>{`
        .job-card {
          background: white;
          padding: var(--space-3);
          border: 1px solid var(--border-color);
          border-radius: var(--radius);
          transition: var(--transition-normal);
          height: 100%;
          position: relative;
        }
        .job-card:hover {
          border-color: var(--text-primary);
        }
        .source-badge {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          background: var(--bg-primary);
          padding: 2px 8px;
          border-radius: 12px;
          color: var(--text-primary);
          opacity: 0.8;
        }
        .match-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: white;
          padding: 2px 8px;
          border-radius: 4px;
        }
        .posted-days {
          font-size: 0.75rem;
        }
        h3 {
          font-size: 1.125rem;
          margin-bottom: 2px;
        }
        .company-name {
          font-size: 0.875rem;
          font-weight: 500;
          opacity: 0.8;
        }
        .job-meta {
          font-size: 0.75rem;
        }
        .meta-item {
          color: var(--text-primary);
          opacity: 0.7;
          background: var(--bg-primary);
          padding: 2px 8px;
          border-radius: 4px;
        }
        .salary-range {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--status-success);
        }
        .saved {
          color: var(--accent-base);
          border-color: var(--accent-base);
        }
        .w-full { width: 100%; }
        .mb-2 { margin-bottom: 8px; }
      `}</style>
    </div>
  );
};

export default JobCard;
