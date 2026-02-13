import React, { useState, useMemo, useEffect } from 'react';
import FilterBar from '../UI/FilterBar';
import JobCard from '../UI/JobCard';
import JobModal from '../UI/JobModal';
import PreferenceBanner from '../UI/PreferenceBanner';
import { jobs } from '../../data/jobs';
import { calculateMatchScore } from '../../utils/scoring';
import { Sparkles } from 'lucide-react';

const Dashboard = () => {
    const [filters, setFilters] = useState({
        query: '',
        location: '',
        mode: '',
        experience: '',
        source: '',
        status: '',
        sort: 'latest',
        onlyMatches: false
    });

    const [selectedJob, setSelectedJob] = useState(null);
    const [savedJobIds, setSavedJobIds] = useState([]);
    const [preferences, setPreferences] = useState(null);
    const [jobStatuses, setJobStatuses] = useState({});
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        setSavedJobIds(saved);

        const prefs = localStorage.getItem('jobTrackerPreferences');
        if (prefs) setPreferences(JSON.parse(prefs));

        const statuses = JSON.parse(localStorage.getItem('jobTrackerStatuses') || '{}');
        setJobStatuses(statuses);
    }, []);

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    const handleStatusChange = (jobId, newStatus) => {
        const updated = { ...jobStatuses, [jobId]: newStatus };
        setJobStatuses(updated);
        localStorage.setItem('jobTrackerStatuses', JSON.stringify(updated));
        showToast(`Status updated: ${newStatus}`);

        // Update history for Digest page
        const job = jobs.find(j => j.id === jobId);
        const history = JSON.parse(localStorage.getItem('jobTrackerStatusHistory') || '[]');
        const newEntry = {
            jobId,
            title: job?.title,
            company: job?.company,
            status: newStatus,
            timestamp: new Date().toISOString()
        };
        // Keep last 10 updates
        const updatedHistory = [newEntry, ...history].slice(0, 10);
        localStorage.setItem('jobTrackerStatusHistory', JSON.stringify(updatedHistory));
    };

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (job) => {
        let updated;
        if (savedJobIds.includes(job.id)) {
            updated = savedJobIds.filter(id => id !== job.id);
        } else {
            updated = [...savedJobIds, job.id];
        }
        setSavedJobIds(updated);
        localStorage.setItem('savedJobs', JSON.stringify(updated));
    };

    const extractSalary = (range) => {
        const matches = range.match(/(\d+)/g);
        if (!matches) return 0;
        if (range.toLowerCase().includes('month')) {
            return parseInt(matches[0]) * 0.12;
        }
        return parseFloat(matches[0]);
    };

    const scoredJobs = useMemo(() => {
        return jobs.map(job => ({
            ...job,
            matchScore: preferences ? calculateMatchScore(job, preferences) : null
        }));
    }, [preferences]);

    const filteredJobs = useMemo(() => {
        return scoredJobs
            .filter(job => {
                const matchesQuery = job.title.toLowerCase().includes(filters.query.toLowerCase()) ||
                    job.company.toLowerCase().includes(filters.query.toLowerCase());
                const matchesLocation = !filters.location || job.location === filters.location;
                const matchesMode = !filters.mode || job.mode === filters.mode;
                const matchesExperience = !filters.experience || job.experience === filters.experience;
                const matchesSource = !filters.source || job.source === filters.source;

                const matchesThreshold = !filters.onlyMatches ||
                    (job.matchScore !== null && job.matchScore >= (preferences?.minMatchScore || 0));

                const currentStatus = jobStatuses[job.id] || 'Not Applied';
                const matchesStatus = !filters.status || currentStatus === filters.status;

                return matchesQuery && matchesLocation && matchesMode && matchesExperience && matchesSource && matchesThreshold && matchesStatus;
            })
            .sort((a, b) => {
                if (filters.sort === 'latest') return a.postedDaysAgo - b.postedDaysAgo;
                if (filters.sort === 'oldest') return b.postedDaysAgo - a.postedDaysAgo;
                if (filters.sort === 'score') return (b.matchScore || 0) - (a.matchScore || 0);
                if (filters.sort === 'salary') return extractSalary(b.salaryRange) - extractSalary(a.salaryRange);
                return 0;
            });
    }, [scoredJobs, filters, preferences, jobStatuses]);

    return (
        <div className="dashboard-page">
            {toast && (
                <div className="status-toast fixed top-4 right-4 z-50">
                    <div className="toast-content flex items-center gap-2">
                        <Sparkles size={16} /> {toast}
                    </div>
                </div>
            )}

            {!preferences && <PreferenceBanner />}

            <div className="dashboard-header flex justify-between items-end mb-4">
                <div>
                    <h1 className="serif">Job Dashboard</h1>
                    <p className="text-muted">
                        {preferences ? "Personalized matches based on your preferences." : "Explore available opportunities across India."}
                    </p>
                </div>
            </div>

            <FilterBar
                filters={filters}
                onFilterChange={handleFilterChange}
                hasPreferences={!!preferences}
            />

            <div className="job-grid mt-4">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            onView={setSelectedJob}
                            onSave={handleSave}
                            isSaved={savedJobIds.includes(job.id)}
                            matchScore={job.matchScore}
                            status={jobStatuses[job.id]}
                            onStatusChange={handleStatusChange}
                        />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <h3 className="serif text-muted">No matches found.</h3>
                        <p className="text-muted">
                            {filters.onlyMatches || filters.status ?
                                "No roles match your combined criteria. Adjust filters or lower threshold." :
                                "Try adjusting your filters to see more results."}
                        </p>
                    </div>
                )}
            </div>

            <JobModal
                job={selectedJob}
                onClose={() => setSelectedJob(null)}
            />

            <style jsx>{`
        .dashboard-page {
          padding: var(--space-4);
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          position: relative;
        }
        .job-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--space-3);
        }
        .status-toast {
          position: fixed;
          top: 24px;
          right: 24px;
          animation: slideIn 0.3s ease-out;
        }
        .toast-content {
          background: var(--text-primary);
          color: white;
          padding: 10px 24px;
          border-radius: 40px;
          font-size: 0.875rem;
          font-weight: 600;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .col-span-full {
          grid-column: 1 / -1;
        }
        .py-20 { padding: 80px 0; }
        .mb-4 { margin-bottom: 24px; }
        .mt-4 { margin-top: 24px; }
        .z-50 { z-index: 50; }
      `}</style>
        </div>
    );
};

export default Dashboard;
