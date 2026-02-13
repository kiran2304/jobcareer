import React from 'react';
import { Search, ChevronDown, Sparkles } from 'lucide-react';

const FilterBar = ({ filters, onFilterChange, hasPreferences }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    onFilterChange(name, type === 'checkbox' ? checked : value);
  };

  return (
    <div className="filter-bar flex flex-col gap-3 mb-4">
      <div className="flex items-center gap-2 flex-wrap">
        <div className="search-wrapper flex items-center">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            name="query"
            placeholder="Keyword search..."
            value={filters.query}
            onChange={handleChange}
            className="search-input"
          />
        </div>

        <div className="select-wrapper">
          <select name="location" value={filters.location} onChange={handleChange}>
            <option value="">Location</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Pune">Pune</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Chennai">Chennai</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Noida">Noida</option>
            <option value="Gurgaon">Gurgaon</option>
          </select>
          <ChevronDown size={14} className="chevron" />
        </div>

        <div className="select-wrapper">
          <select name="mode" value={filters.mode} onChange={handleChange}>
            <option value="">Mode</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Onsite">Onsite</option>
          </select>
          <ChevronDown size={14} className="chevron" />
        </div>

        <div className="select-wrapper">
          <select name="experience" value={filters.experience} onChange={handleChange}>
            <option value="">Experience</option>
            <option value="Fresher">Fresher</option>
            <option value="0-1">0-1 Year</option>
            <option value="1-3">1-3 Years</option>
            <option value="3-5">3-5 Years</option>
          </select>
          <ChevronDown size={14} className="chevron" />
        </div>

        <div className="select-wrapper">
          <select name="source" value={filters.source} onChange={handleChange}>
            <option value="">Source</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Naukri">Naukri</option>
            <option value="Indeed">Indeed</option>
          </select>
          <ChevronDown size={14} className="chevron" />
        </div>

        <div className="select-wrapper">
          <select name="status" value={filters.status} onChange={handleChange}>
            <option value="">All Status</option>
            <option value="Not Applied">Not Applied</option>
            <option value="Applied">Applied</option>
            <option value="Rejected">Rejected</option>
            <option value="Selected">Selected</option>
          </select>
          <ChevronDown size={14} className="chevron" />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 flex-wrap pt-2 border-top">
        <label className={`match-toggle flex items-center gap-2 ${!hasPreferences ? 'disabled' : ''}`}>
          <input
            type="checkbox"
            name="onlyMatches"
            checked={filters.onlyMatches}
            onChange={handleChange}
            disabled={!hasPreferences}
          />
          <Sparkles size={14} className={filters.onlyMatches ? 'text-accent' : ''} />
          <span>Show only jobs above my threshold</span>
        </label>

        <div className="select-wrapper sort-wrapper">
          <select name="sort" value={filters.sort} onChange={handleChange}>
            <option value="latest">Sort: Latest</option>
            <option value="score">Sort: Match Score</option>
            <option value="salary">Sort: Salary</option>
            <option value="oldest">Sort: Oldest</option>
          </select>
          <ChevronDown size={14} className="chevron" />
        </div>
      </div>

      <style jsx>{`
        .filter-bar {
          padding: var(--space-2) 0;
          border-bottom: 1px solid var(--border-color);
        }
        .border-top {
          border-top: 1px solid rgba(17, 17, 17, 0.05);
        }
        .search-wrapper {
          position: relative;
          background: white;
          border: 1px solid var(--border-color);
          border-radius: var(--radius);
          padding: 8px 12px;
          min-width: 200px;
          flex: 2;
        }
        .search-icon {
          color: var(--text-primary);
          opacity: 0.5;
          margin-right: 8px;
        }
        .search-input {
          border: none;
          background: none;
          width: 100%;
          font-size: 0.875rem;
        }
        .select-wrapper {
          position: relative;
          background: white;
          border: 1px solid var(--border-color);
          border-radius: var(--radius);
          flex: 1;
          min-width: 120px;
        }
        .sort-wrapper {
          border-color: var(--text-primary);
        }
        select {
          appearance: none;
          width: 100%;
          padding: 8px 30px 8px 12px;
          border: none;
          background: none;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-primary);
          cursor: pointer;
        }
        .chevron {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          opacity: 0.5;
        }
        .match-toggle {
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          color: var(--text-primary);
        }
        .match-toggle.disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .match-toggle input {
          width: 16px;
          height: 16px;
        }
        @media (max-width: 768px) {
          .search-wrapper { flex: 1 0 100%; }
          .select-wrapper { flex: 1 0 calc(50% - 8px); }
        }
      `}</style>
    </div>
  );
};

export default FilterBar;
